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
    <div className="mx-auto max-w-md">
      <div className="rounded-2xl border border-wow-border bg-wow-card/90 shadow-soft overflow-hidden">
        <div className="border-b border-wow-border bg-wow-dark/50 px-6 py-6 text-center">
          <h1 className="font-display text-2xl font-bold tracking-wide text-white sm:text-3xl">
            Crear cuenta para el servidor
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Regístrate para jugar en nuestro servidor privado. Gratis.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          <div>
            <label htmlFor="username" className="mb-2 block text-sm font-medium text-slate-300">
              Usuario
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
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-300">
              Contraseña
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
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">
              Email <span className="text-slate-500 font-normal">(opcional)</span>
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
              className={`rounded-xl border px-4 py-3 text-sm ${
                result.success
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
                  : 'border-red-500/40 bg-red-500/10 text-red-200'
              }`}
            >
              {result.message}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-b from-wow-gold to-wow-gold-dim py-3.5 font-semibold text-wow-dark shadow-[0_4px_16px_rgba(212,175,55,0.35)] transition-all hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Creando cuenta…' : 'Registrarme y jugar'}
          </button>
        </form>

        <div className="border-t border-wow-border px-6 py-4 text-center">
          <Link
            href="/"
            className="text-sm text-slate-400 transition-colors hover:text-wow-gold"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
