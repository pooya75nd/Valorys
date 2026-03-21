import Link from 'next/link'
import { ArrowRight, TrendingDown, Building2 } from 'lucide-react'

export function StatsSection({ stats }: {
  stats: { totalListings: number; topDeals: number; departmentCount: number }
}) {
  const items = [
    { label: 'Annonces analysées', value: stats.totalListings.toLocaleString('fr-FR') },
    { label: 'Score ≥ 75/100', value: stats.topDeals.toLocaleString('fr-FR') },
    { label: 'Départements', value: `${stats.departmentCount || 90}+` },
    { label: 'Régimes fiscaux', value: '6' },
  ]
  return (
    <section className="border-y border-white/5 bg-white/[0.02] py-16">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {items.map(({ label, value }) => (
          <div key={label} className="text-center">
            <div className="font-display text-4xl font-semibold gradient-gold mb-1">{value}</div>
            <div className="text-xs text-zinc-500 font-light tracking-wide">{label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function FeaturedDeals({ deals }: { deals: any[] }) {
  if (deals.length === 0) return null
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-xs text-gold-600 tracking-widest uppercase mb-2">Détectées par l'IA</p>
          <h2 className="font-display text-4xl text-zinc-100">Meilleures opportunités</h2>
        </div>
        <Link href="/opportunites" className="hidden md:flex items-center gap-2 text-sm text-gold-500 hover:text-gold-400 transition-colors">
          Voir tout <ArrowRight className="w-4 h-4"/>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal) => (
          <Link key={deal.id} href={`/opportunites/${deal.id}`}
            className="group block bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden card-hover">
            <div className="relative h-48 bg-zinc-800 overflow-hidden">
              {deal.photos?.[0] ? (
                <img src={deal.photos[0]} alt={deal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Building2 className="w-12 h-12 text-zinc-700"/>
                </div>
              )}
              {deal.investScore && (
                <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-sm font-medium border backdrop-blur-sm
                  ${deal.investScore >= 80 ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' :
                    deal.investScore >= 65 ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' :
                    'bg-zinc-800/80 border-zinc-700 text-zinc-400'}`}>
                  {deal.investScore}/100
                </div>
              )}
              {deal.isSucessionKeyword && (
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs rounded">
                  Succession
                </div>
              )}
              {deal.isImmoRapport && (
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs rounded">
                  Immeuble de rapport
                </div>
              )}
            </div>
            <div className="p-5">
              <p className="text-xs text-zinc-500 mb-1">{deal.city} · {deal.department} · {deal.type}</p>
              <h3 className="text-zinc-200 font-medium text-sm leading-snug mb-3 line-clamp-2">{deal.title}</h3>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl font-semibold text-zinc-100">
                    {deal.price.toLocaleString('fr-FR')} €
                  </div>
                  {deal.surface && (
                    <div className="text-xs text-zinc-500">
                      {deal.surface} m²
                      {deal.pricePerSqm && ` · ${Math.round(deal.pricePerSqm).toLocaleString('fr-FR')} €/m²`}
                    </div>
                  )}
                </div>
                {deal.priceVsDvf !== null && deal.priceVsDvf !== undefined && (
                  <div className={`flex items-center gap-1 text-sm font-medium
                    ${deal.priceVsDvf < 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    <TrendingDown className="w-4 h-4"/>
                    {deal.priceVsDvf > 0 ? '+' : ''}{Math.round(deal.priceVsDvf)}% DVF
                  </div>
                )}
              </div>
              {(deal.estimatedYieldGross || deal.estimatedMdbMarginPct) && (
                <div className="mt-3 pt-3 border-t border-white/5 flex gap-4">
                  {deal.estimatedYieldGross && (
                    <div className="text-xs">
                      <span className="text-zinc-500">Rdt brut </span>
                      <span className="text-gold-400 font-medium">{deal.estimatedYieldGross.toFixed(1)}%</span>
                    </div>
                  )}
                  {deal.estimatedMdbMarginPct && (
                    <div className="text-xs">
                      <span className="text-zinc-500">Marge MdB </span>
                      <span className="text-gold-400 font-medium">{Math.round(deal.estimatedMdbMarginPct)}%</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function HowItWorks() {
  const steps = [
    { n: '01', title: 'Scraping multi-sources', desc: 'Valorys scrape SeLoger, LeBonCoin, BienIci et PAP en continu sur toute la France.' },
    { n: '02', title: 'Scoring IA sur 100 pts', desc: 'Chaque bien est analysé : décote DVF, rendement estimé, potentiel MdB, détection successions.' },
    { n: '03', title: 'Calcul fiscal instantané', desc: 'Comparez 6 régimes fiscaux et simulez votre bilan marchand de biens en temps réel.' },
    { n: '04', title: 'Alerte en temps réel', desc: 'Recevez les meilleures opportunités selon vos critères avant tout le monde.' },
  ]
  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs text-gold-600 tracking-widest uppercase mb-2">Comment ça marche</p>
          <h2 className="font-display text-4xl text-zinc-100">De l'annonce à la décision en 4 étapes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map(({ n, title, desc }) => (
            <div key={n} className="flex gap-5 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="font-display text-3xl text-gold-800 font-semibold shrink-0 w-10">{n}</div>
              <div>
                <h3 className="text-zinc-200 font-medium mb-2">{title}</h3>
                <p className="text-zinc-500 text-sm font-light leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 mt-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="font-display text-gold-400 text-lg mb-3">VALORYS</div>
            <p className="text-xs text-zinc-600 font-light leading-relaxed">
              Intelligence immobilière — Analyse · Investissement
            </p>
          </div>
          {[
            { title: 'Produit', links: [['Opportunités', '/opportunites'], ['Simulateur', '/simulateur'], ['Tarifs', '/pricing']] },
            { title: 'Compte', links: [['Connexion', '/login'], ['Dashboard', '/dashboard'], ['Alertes', '/dashboard/alertes']] },
            { title: 'Légal', links: [['Mentions légales', '/legal/mentions'], ['RGPD', '/legal/rgpd'], ['CGU', '/legal/cgu']] },
          ].map(({ title, links }) => (
            <div key={title}>
              <div className="text-xs text-zinc-500 uppercase tracking-widest mb-3">{title}</div>
              <ul className="space-y-2">
                {links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-xs text-zinc-600 hover:text-gold-500 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-xs text-zinc-700">© 2026 Valorys. Tous droits réservés.</p>
          <p className="text-xs text-zinc-700">
            Données DVF : open data DGFiP · Scoring IA : Anthropic Claude
          </p>
        </div>
      </div>
    </footer>
  )
}
