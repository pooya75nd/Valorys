import Link from 'next/link'
import { ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-ink-deep">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-ink-deep/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
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
          <nav className="hidden md:flex items-center gap-8 text-sm font-light">
            <Link href="/pricing" className="text-zinc-400 hover:text-gold-400 transition-colors">Tarifs</Link>
            <Link href="/login" className="text-sm px-4 py-2 bg-gold-700/20 border border-gold-700/40 text-gold-400 rounded-lg hover:bg-gold-700/30 transition-all">
              Commencer
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% 40%, rgba(201,169,110,0.08) 0%, transparent 100%)'
        }}/>
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(201,169,110,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}/>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-700/40 bg-gold-700/10 mb-8">
            <Zap className="w-3 h-3 text-gold-400"/>
            <span className="text-xs text-gold-400 font-light tracking-widest uppercase">
              Scoring IA · Données DVF réelles · France entière
            </span>
          </div>

          <h1 className="font-display text-6xl md:text-8xl font-semibold leading-[0.9] mb-6">
            <span className="gradient-gold">L'intelligence</span>
            <br/>
            <span className="text-zinc-200">qui trouve</span>
            <br/>
            <span className="gradient-gold">l'opportunité</span>
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Valorys analyse chaque bien en vente en France avec les données DVF réelles,
            calcule votre rendement net et votre marge marchand de biens en quelques secondes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/login"
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-ink-deep font-medium rounded-xl transition-all text-sm tracking-wide">
              Commencer gratuitement
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
            </Link>
            <Link href="/pricing"
              className="flex items-center justify-center gap-2 px-8 py-4 border border-white/10 hover:border-gold-700/50 text-zinc-300 hover:text-gold-400 rounded-xl transition-all text-sm">
              <TrendingUp className="w-4 h-4"/>
              Voir les tarifs
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-600">
            {[
              { icon: Shield, text: 'Données DVF officielles DGFiP' },
              { icon: Zap, text: 'Score IA sur 100 points' },
              { icon: TrendingUp, text: '6 régimes fiscaux comparés' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5 text-gold-700"/>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-24 border-t border-white/5 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs text-gold-600 tracking-widest uppercase mb-2">Comment ça marche</p>
          <h2 className="font-display text-4xl text-zinc-100">De l'annonce à la décision en 4 étapes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { n: '01', title: 'Scraping multi-sources', desc: 'Valorys scrape SeLoger, LeBonCoin, BienIci et PAP en continu.' },
            { n: '02', title: 'Scoring IA sur 100 pts', desc: 'Chaque bien est analysé : décote DVF, rendement, potentiel MdB, détection successions.' },
            { n: '03', title: 'Calcul fiscal instantané', desc: 'Comparez 6 régimes fiscaux et simulez votre bilan marchand de biens.' },
            { n: '04', title: 'Alerte en temps réel', desc: 'Recevez les meilleures opportunités selon vos critères avant tout le monde.' },
          ].map(({ n, title, desc }) => (
            <div key={n} className="flex gap-5 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="font-display text-3xl text-gold-800 font-semibold shrink-0 w-10">{n}</div>
              <div>
                <h3 className="text-zinc-200 font-medium mb-2">{title}</h3>
                <p className="text-zinc-500 text-sm font-light leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-xs text-zinc-700">
        <p>© 2026 Valorys — Intelligence Immobilière · France entière</p>
        <p className="mt-1">
          <Link href="/legal/rgpd" className="hover:text-zinc-500">RGPD</Link>
          {' · '}
          <Link href="/legal/mentions" className="hover:text-zinc-500">Mentions légales</Link>
        </p>
      </footer>

    </main>
  )
}
