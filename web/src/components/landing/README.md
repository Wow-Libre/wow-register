# Landing Page — Component Breakdown

Landing con estética **gaming** (WoW/fantasy): tema oscuro, dorados, tipografía épica (Cinzel), bordes y glows. Next.js App Router, TypeScript, TailwindCSS, Framer Motion y GSAP.

## Stack
- **Next.js** (App Router) + **TypeScript**
- **TailwindCSS** — styling (dark theme, glassmorphism, soft shadows)
- **Framer Motion** — hero intro, staggered text, button micro-interactions
- **GSAP + ScrollTrigger** — scroll-in animations, parallax on hero orbs

## Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout; uses LayoutShell
│   ├── page.tsx            # Home → renders <Landing />
│   └── globals.css         # cursor-landing body class, base styles
├── components/
│   ├── LayoutShell.tsx     # Client: shows app header/footer only when pathname !== '/'
│   └── landing/
│       ├── Landing.tsx     # Composes all sections + CustomCursor; GSAP parallax setup
│       ├── CustomCursor.tsx # Animated cursor (follow + grow on hover)
│       ├── Hero.tsx        # Fullscreen hero, nav, headline, CTAs, scroll hint
│       ├── AnimatedSection.tsx # Reusable scroll-triggered fade + slide (GSAP)
│       ├── Features.tsx    # 4 cards with hover animation
│       ├── About.tsx       # Image + text block
│       ├── CTA.tsx         # Call to action block
│       └── Footer.tsx      # Minimal footer + links
```

## Components

| Component | Role |
|-----------|------|
| **Landing** | Client wrapper. Renders CustomCursor + Hero/Features/About/CTA/Footer. Sets up GSAP context for parallax on `[data-parallax]` orbs in Hero. |
| **CustomCursor** | Fixed circle following mouse (spring). Grows on hover over `a`, `button`, `[data-cursor-hover]`. Adds `cursor-landing` to body; hidden on touch (md:block). |
| **Hero** | Fullscreen section. Animated gradient/mesh + grid + blur orbs. Nav (logo + Explorar + Crear cuenta). Staggered headline (Framer), tagline, two CTAs, scroll hint. Orbs have `data-parallax` for GSAP. |
| **AnimatedSection** | Wraps children; on scroll into view (ScrollTrigger) runs fade + slide up. Used by Features, About, CTA headings/content. |
| **Features** | 3 cards (Personajes, Hermandades, Registro). Each card is an AnimatedSection + Link with hover styles. |
| **About** | Two columns: decorative image block + text (headline, bullets). AnimatedSection for both columns. |
| **CTA** | Centered glass-style card with headline, subtext, primary button. AnimatedSection. |
| **Footer** | Logo, nav links, copyright. |

## Tailwind (extend)
- **Colors**: `wow.*` (dark, card, gold, etc.)
- **Fonts**: `font-landing` (Plus Jakarta Sans), `font-display`, `font-sans`
- **backgroundImage**: `wow-gradient`, `hero-glow`, `gradient-radial`, `mesh`
- **boxShadow**: `wow-gold`, `wow-card`, `glass`, `soft`, `glow`
- **animation/keyframes**: `gradient`, `float`

## Behaviour
- **Smooth scroll**: `html { scroll-behavior: smooth }` (globals.css).
- **Landing only on `/`**: LayoutShell hides app header/footer on home; full viewport for hero.
- **Cursor**: Only on viewports that show cursor (md+); `body.cursor-landing { cursor: none }` with media `(pointer: coarse)` override.
