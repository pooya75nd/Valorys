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
     <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
  
  {/* Fond graphique luxe inspiré du logo */}
  <div className="absolute inset-0 bg-[#0a0a0f]">
    {/* Motif géométrique subtil inspiré du logo */}
    <div className="absolute inset-0 opacity-20"
         style={{
           backgroundImage: `
             radial-gradient(circle at 20% 30%, rgba(201, 169, 110, 0.15) 0%, transparent 50%),
             radial-gradient(circle at 80% 70%, rgba(201, 169, 110, 0.12) 0%, transparent 50%),
             linear-gradient(45deg, transparent 40%, rgba(201, 169, 110, 0.08) 50%, transparent 60%)
           `,
           backgroundSize: '120% 120%'
         }}>
    </div>

    {/* Lignes géométriques fines dorées (inspiré du polygone du logo) */}
    <div className="absolute inset-0 opacity-30"
         style={{
           backgroundImage: `
             linear-gradient(135deg, transparent 40%, #c9a96e 50%, transparent 60%),
             linear-gradient(45deg, transparent 40%, #c9a96e 50%, transparent 60%)
           `,
           backgroundSize: '200% 200%',
           backgroundPosition: '0% 50%'
         }}>
    </div>
  </div>

  {/* Overlay sombre pour meilleure lisibilité */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

  <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
    
    {/* Badge luxe */}
    <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-gold-700/40 bg-black/50 backdrop-blur-md mb-16">
      <span className="text-xs tracking-[4px] font-light text-gold-400 uppercase">
        INTELLIGENCE IMMOBILIÈRE POWERED BY AI
      </span>
    </div>

    {/* Titre très épuré et luxueux */}
    <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-light leading-none tracking-[-1.5px] mb-6 text-white">
      L’opportunité<br />
      <span className="font-semibold bg-gradient-to-r from-gold-300 via-amber-200 to-gold-400 bg-clip-text text-transparent">
        se révèle.
      </span>
    </h1>

    {/* Sous-titre minimal */}
    <p className="text-lg md:text-xl text-zinc-400 font-light tracking-wide max-w-md mx-auto">
      Elle se détecte.
    </p>

    {/* Boutons élégants */}
    <div className="flex flex-col sm:flex-row gap-5 justify-center mt-20">
      <Link 
        href="/login"
        className="group flex items-center justify-center gap-3 bg-gold-500 hover:bg-amber-300 text-black font-medium text-lg px-12 py-6 rounded-2xl transition-all duration-300 shadow-2xl"
      >
        Commencer gratuitement
        <ArrowRight className="group-hover:translate-x-1 transition" />
      </Link>

      <Link 
        href="/pricing"
        className="flex items-center justify-center border border-white/40 hover:border-gold-400 text-white hover:text-gold-300 px-12 py-6 rounded-2xl transition-all text-lg font-light"
      >
        Voir les tarifs
      </Link>
    </div>
  </div>

  {/* Petit élément décoratif inspiré du logo en bas */}
  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-10">
    <svg width="80" height="80" viewBox="0 0 96 96" fill="none">
      <polyline points="26,30 48,70 70,30" fill="none" stroke="#c9a96e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
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
