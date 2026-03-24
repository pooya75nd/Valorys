import Link from 'next/link'
import { ArrowRight, Zap, Shield, TrendingUp } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-ink-deep text-zinc-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-ink-deep/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Ton logo SVG original */}
            <svg width="36" height="36" viewBox="0 0 96 96" fill="none">
              <defs>
                <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f0d68a"/>
                  <stop offset="100%" stopColor="#9a7230"/>
                </linearGradient>
              </defs>
              <rect width="96" height="96" rx="22" fill="#0d0d14"/>
              <polygon points="48,8 82,28 82,68 48,88 14,68 14,28" fill="none" stroke="#c9a96e" strokeWidth="1.5" opacity="0.5"/>
              <polyline points="26,30 48,70 70,30" fill="none" stroke="url(#gold)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-display text-xl font-semibold text-gold-400 tracking-wide">
              VALORYS
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link href="/pricing" className="text-zinc-400 hover:text-gold-400 transition-colors">
              Tarifs
            </Link>
            <Link 
              href="/login"
              className="px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-ink-deep font-medium rounded-xl transition-all"
            >
              Connexion
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% 40%, rgba(201,169,110,0.08) 0%, transparent 100%)'
        }}/>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-700/40 bg-gold-700/10 mb-8">
            <Zap className="w-4 h-4 text-gold-400" />
            <span className="text-xs text-gold-400 font-light tracking-widest uppercase">
              POWERED BY AI
            </span>
          </div>

          <h1 className="font-display text-6xl md:text-8xl font-semibold leading-none mb-8">
            L'intelligence qui trouve<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-amber-300 to-gold-400">
              l'opportunité
            </span>
          </h1>

          <p className="text-zinc-400 text-xl max-w-2xl mx-auto mb-12">
            Valorys analyse en temps réel les meilleures opportunités avec scoring IA
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="group flex items-center justify-center gap-3 bg-gold-500 hover:bg-gold-400 text-ink-deep font-semibold text-lg px-10 py-6 rounded-2xl transition-all"
            >
              Commencer gratuitement
              <ArrowRight className="group-hover:translate-x-1 transition" />
            </Link>

            <Link
              href="/pricing"
              className="flex items-center justify-center gap-3 border border-white/20 hover:border-gold-400 text-zinc-300 hover:text-gold-300 px-10 py-6 rounded-2xl transition-all text-lg"
            >
              Voir les tarifs
            </Link>
          </div>
        </div>
      </section>

      {/* Section confiance */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-x-12 gap-y-8 text-sm text-zinc-500">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-gold-600" />
            Données DVF officielles DGFiP
          </div>
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-gold-600" />
            Scoring IA en temps réel
          </div>
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-gold-600" />
            Rendement net & marge MdB
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 text-center text-zinc-600 text-sm">
        <p>© 2026 Valorys — Intelligence Immobilière</p>
      </footer>
    </main>
  )
}
