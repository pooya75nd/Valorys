'use client'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const params = useSearchParams()
  const redirect = params.get('redirect') ?? '/dashboard'

  return (
    <div className="min-h-screen bg-ink-deep flex items-center justify-center px-6">
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,169,110,0.06) 0%, transparent 100%)'
      }}/>

      <div className="relative z-10 w-full max-w-sm">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex flex-col items-center gap-2">
            <svg width="52" height="52" viewBox="0 0 96 96" fill="none">
              <defs>
                <linearGradient id="loginGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f0d68a"/>
                  <stop offset="100%" stopColor="#9a7230"/>
                </linearGradient>
              </defs>
              <rect width="96" height="96" rx="22" fill="#0d0d14"/>
              <polygon points="48,8 82,28 82,68 48,88 14,68 14,28" fill="none" stroke="#c9a96e" strokeWidth="1.5" opacity="0.5"/>
              <polyline points="26,30 48,70 70,30" fill="none" stroke="url(#loginGold)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-display text-2xl text-gold-400 tracking-widest">VALORYS</span>
          </Link>
          <p className="text-zinc-500 text-sm mt-3 font-light">Intelligence Immobilière</p>
        </div>

        <div className="bg-zinc-900/60 border border-white/8 rounded-2xl p-8">
          <h1 className="font-display text-2xl text-zinc-100 mb-1">Connexion</h1>
          <p className="text-zinc-500 text-sm font-light mb-8">
            Accédez à votre espace investisseur
          </p>

          <button
            onClick={() => signIn('google', { callbackUrl: redirect })}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white text-zinc-900 rounded-xl font-medium text-sm hover:bg-zinc-100 transition-colors mb-4"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuer avec Google
          </button>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/8"/>
            <span className="text-xs text-zinc-600">ou</span>
            <div className="flex-1 h-px bg-white/8"/>
          </div>

          <form onSubmit={async (e) => {
            e.preventDefault()
            const email = (e.target as any).email.value
            await signIn('email', { email, callbackUrl: redirect })
          }}>
            <input
              type="email"
              name="email"
              required
              placeholder="votre@email.fr"
              className="w-full px-4 py-3 bg-zinc-800 border border-white/8 rounded-xl text-zinc-200 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-gold-700/50 mb-3"
            />
            <button type="submit"
              className="w-full py-3 bg-gold-700/20 border border-gold-700/40 text-gold-400 rounded-xl text-sm font-medium hover:bg-gold-700/30 transition-colors">
              Recevoir un lien de connexion
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-zinc-700 mt-6">
          En vous connectant, vous acceptez nos{' '}
          <Link href="/legal/cgu" className="text-zinc-600 hover:text-gold-600">CGU</Link>
          {' '}et notre{' '}
          <Link href="/legal/rgpd" className="text-zinc-600 hover:text-gold-600">politique RGPD</Link>.
        </p>
      </div>
    </div>
  )
}
