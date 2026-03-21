'use client'
import Link from 'next/link'
import { ArrowRight, Zap, TrendingUp, Shield } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-ink-deep">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% 40%, rgba(201,169,110,0.08) 0%, transparent 100%)'
        }}/>
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(201,169,110,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}/>
      </div>

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
            className="flex items-center justify-center gap-2 px-8 py-4 border border-white/10 hover:border-gold-700/50 text-zinc-300 hover:text-gold-400 rounded-xl transition-all text-sm tracking-wide">
            <TrendingUp className="w-4 h-4"/>
            Voir les tarifs
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-600 font-light">
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
  )
}
