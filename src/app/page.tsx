import Link from 'next/link'
import { ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react'

const features = [
  { icon: Shield, text: 'Données DVF officielles DGFiP' },
  { icon: Zap, text: 'Score IA sur 100 points' },
  { icon: TrendingUp, text: '6 régimes fiscaux comparés' },
]

const steps = [
  {
    n: '01',
    title: 'Scraping multi-sources',
    desc: 'Valorys scrape SeLoger, LeBonCoin, BienIci et PAP en continu.',
  },
  {
    n: '02',
    title: 'Scoring IA sur 100 pts',
    desc: 'Chaque bien est analysé : décote DVF, rendement, potentiel MdB, détection successions.',
  },
  {
    n: '03',
    title: 'Calcul fiscal instantané',
    desc: 'Comparez 6 régimes fiscaux et simulez votre bilan marchand de biens.',
  },
  {
    n: '04',
    title: 'Alerte en temps réel',
    desc: 'Recevez les meilleures opportunités selon vos critères avant tout le monde.',
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-ink-deep text-zinc-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-ink-deep/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo SVG conservé tel quel */}
            <svg width="36" height="36" viewBox="0 0 96 96" fill="none">
              <defs>
                <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f0d68a" />
                  <stop offset="100%" stopColor="#9a7230" />
                </linearGradient>
              </defs>
              <rect width="96" height="96" rx="22" fill="#0d0d14" />
              <polygon
                points="48,8 82,28 82,68 48,88 14,68 14,28"
                fill="none"
                stroke="#c9a96e"
                strokeWidth="1.5"
                opacity="0.5"
              />
              <polyline
                points="26,30 48,70 70,30"
                fill="none"
                stroke="url(#gold)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-display text-xl font-semibold text-gold-400 tracking-wide">
              VALORYS
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/pricing"
              className="text-sm text-zinc-400 hover:text-gold-400 transition-colors duration-200"
            >
              Tarifs
            </Link>
            <Link
              href="/login"
              className="text-sm px-5 py-2.5 bg-gold-700/20 border border-gold-700/40 text-gold-400 rounded-lg hover:bg-gold-700/35 hover:border-gold-500/50 transition-all duration-200"
            >
              Commencer
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 md:pt-0">
        {/* Fond subtil */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 80% 50% at 50% 40%, rgba(201,169,110,0.08) 0%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(201,169,110,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.4) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold-700/30 bg-gold-700/8 mb-10">
            <Zap className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-xs uppercase tracking-widest font-light text-gold-300">
              Scoring IA · Données DVF réelles · France entière
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-[0.92] mb-8">
            <span className="gradient-gold block">L'intelligence</span>
            <span className="text-zinc-100 block">qui trouve</span>
            <span className="gradient-gold block">l'opportunité</span>
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl font-light max-w-3xl mx-auto mb-12 leading-relaxed">
            Valorys analyse chaque bien en vente en France avec les données DVF réelles, calcule votre rendement net et votre marge marchand de biens en quelques secondes.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16">
            <Link
              href="/login"
              className="group flex items-center justify-center gap-3 px-9 py-5 bg-gold-500 hover:bg-gold-400 text-ink-deep font-medium rounded-xl transition-all duration-300 shadow-lg shadow-gold-900/20 text-base"
            >
              Commencer gratuitement
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>

            <Link
              href="/pricing"
              className="flex items-center justify-center gap-3 px-9 py-5 border border-white/10 hover:border-gold-600/60 text-zinc-300 hover:text-gold-300 rounded-xl transition-all duration-300 text-base"
            >
              <TrendingUp className="w-5 h-5" />
              Voir les tarifs
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-zinc-500">
            {features.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-gold-700" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs text-gold-600 tracking-widest uppercase mb-3">Comment ça marche</p>
            <h2 className="font-display text-4xl md:text-5xl text-zinc-100">De l'annonce à la décision en 4 étapes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-9">
            {steps.map(({ n, title, desc }) => (
              <div
                key={n}
                className="flex gap-6 p-7 rounded-2xl bg-white/[0.025] border border-white/6 hover:border-gold-800/40 transition-colors duration-300"
              >
                <div className="font-display text-4xl text-gold-800/70 font-bold shrink-0 w-10 opacity-80">
                  {n}
                </div>
                <div>
                  <h3 className="text-zinc-100 font-medium text-lg mb-3">{title}</h3>
                  <p className="text-zinc-500 text-base leading-relaxed font-light">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 text-center text-sm text-zinc-600">
        <p>© 2026 Valorys — Intelligence Immobilière · France entière</p>
        <p className="mt-2 space-x-4">
          <Link href="/legal/rgpd" className="hover:text-zinc-400 transition-colors">
            RGPD
          </Link>
          <span>·</span>
          <Link href="/legal/mentions" className="hover:text-zinc-400 transition-colors">
            Mentions légales
          </Link>
        </p>
      </footer>
    </main>
  )
}
