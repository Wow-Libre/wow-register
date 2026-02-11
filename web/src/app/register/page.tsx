'use client'

import { useState } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api'

export default function RegisterPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setResult(null)
    setLoading(true)
    try {
      const res = await api.register({
        username: username.trim(),
        password,
        email: email.trim() || undefined,
      })
      setResult({ success: res.success, message: res.message })
      if (res.success) {
        setUsername('')
        setPassword('')
        setEmail('')
      }
    } catch (err) {
      setResult({
        success: false,
        message: err instanceof Error ? err.message : 'Error al conectar con el servidor.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="relative overflow-hidden rounded-2xl border border-wow-border bg-wow-card/80 px-6 py-12 text-center sm:py-14">
        <div className="absolute inset-0 bg-hero-glow opacity-60" />
        <div className="relative">
          <h1 className="font-display mb-2 text-2xl font-bold text-wow-gold sm:text-3xl">
            Crear cuenta de juego
          </h1>
          <p className="mx-auto max-w-lg text-slate-400">
            La cuenta se crea en el emulador mediante SOAP (comando <code className="rounded bg-wow-dark px-1 text-wow-gold">account create</code>). Luego podrás iniciar sesión en el cliente del juego.
          </p>
        </div>
      </section>

      <div className="card-wow mx-auto max-w-md p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="mb-1.5 block text-sm text-slate-400">
              Usuario *
            </label>
            <input
              id="username"
              type="text"
              placeholder="Entre 3 y 16 caracteres"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              minLength={3}
              maxLength={16}
              required
              autoComplete="username"
              className="input-wow"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm text-slate-400">
              Contraseña *
            </label>
            <input
              id="password"
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              maxLength={32}
              required
              autoComplete="new-password"
              className="input-wow"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm text-slate-400">
              Email (opcional)
            </label>
            <input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="input-wow"
            />
          </div>

          {result && (
            <div
              className={`rounded-lg border px-4 py-3 text-sm ${
                result.success
                  ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
                  : 'border-red-500/50 bg-red-500/10 text-red-200'
              }`}
            >
              {result.message}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary w-full py-3"
            disabled={loading}
          >
            {loading ? 'Creando cuenta…' : 'Registrarme'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          <Link href="/" className="text-wow-gold hover:text-wow-gold-dim">
            ← Volver al inicio
          </Link>
        </p>
      </div>
    </>
  )
}
