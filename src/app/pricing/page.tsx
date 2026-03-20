'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    id: 'DECOUVERTE',
    name: 'Découverte',
    price: 0,
    period: '',
    description: 'Pour découvrir la plateforme',
    color: 'border-zinc-700',
    textColor: 'text-zinc-300',
    features: [
      '5 alertes sauvegardées',
      'Scoring IA basique',
      '3 simulations par jour',
      'Données DVF partielles',
      'Mises à jour toutes les 24h',
    ],
    missing: ['6 régimes fiscaux', 'Bilan marchand de biens', 'DVF complet'],
    cta: 'Commencer gratuitement',
    priceId: null,
  },
  {
    id: 'INVESTISSEUR',
    name: 'Investisseur',
    price: 19,
    period: '/mois',
    description: 'Pour les investisseurs patrimoniaux',
    color: 'border-blue-700',
    textColor: 'text-blue-300',
    features: [
      'Alertes illimitées',
      'Scoring IA complet (100 pts)',
      '6 régimes fiscaux comparés',
      'LMNP / SCI IS / Nue propriété',
      'DVF complet (5 ans)',
      'Mises à jour toutes les 6h',
      'Export PDF des simulations',
      'Journal marché hebdomadaire',
    ],
    missing: ['Bilan marchand de biens', 'Agent IA conseiller'],
    cta: "S'abonner",
    priceId: process.env.NEXT_PUBLIC_STRIPE_INVESTISSEUR_PRICE_ID,
  },
  {
    id: 'MARCHAND',
    name: 'Marchand',
    price: 49,
    period: '/mois',
    description: 'Pour les marchands de biens',
    color: 'border-gold-600',
    textColor: 'text-gold-400',
    badge: '⭐ Le plus populaire',
    features: [
      'Tout Investisseur inclus',
      'Bilan marchand de biens complet',
      'TVA sur marge (Art. 268 CGI)',
      'Droits réduits (0,7%)',
      'Scénarios pessimiste / optimiste',
      'Seuil de rentabilité automatique',
      'Alertes successions & saisies',
      'Export Excel des bilans',
    ],
    missing: ['Agent IA conseiller', 'API privée'],
    cta: "S'abonner",
    priceId: process.env.NEXT_PUBLIC_STRIPE_MARCHAND_PRICE_ID,
    highlight: true,
  },
  {
    id: 'PRO',
    name: 'Pro & Cabinet',
    price: 149,
    period: '/mois',
    description: 'Pour les pros et cabinets CGP',
    color: 'border-gold-400',
    textColor: 'text-gold-300',
    features: [
      'Tout Marchand inclus',
      'Agent IA conseiller',
      'API REST documentée',
      'Gestion multi-clients',
      'Alertes SMS',
      'Support prioritaire',
      'Accès beta',
    ],
    missing: [],
    cta: "S'abonner",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
  },
]

export default function PricingPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const handleSubscribe = async (planId: string, priceId: string | null | undefined) => {
    if (planId === 'DECOUVERTE') { router.push('/login'); return }
    if (!session) { router.push('/login?redirect=/pricing'); return }
    if (!priceId) return
    setLoading(planId)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planType: planId }),
      })
      const { url } = await res.json()
      if (url) window.location.href = url
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(null)
    }
  }

  return (
    <main className="min-h-screen bg-ink-deep pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <p className="text-xs text-gold-600 tracking-widest uppercase mb-3">Tarifs</p>
          <h1 className="font-display text-5xl md:text-6xl text-zinc-100 mb-4">
            Choisissez votre niveau
          </h1>
          <p className="text-zinc-400 font-light max-w-xl mx-auto">
            Sans engagement. Changez de plan à tout moment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div key={plan.id}
              className={`relative flex flex-col rounded-2xl border p-6 ${plan.color}
                ${'highlight' in plan && plan.highlight ? 'bg-gold-700/10 shadow-2xl scale-[1.02]' : 'bg-white/[0.02]'}`}>

              {'badge' in plan && plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gold-600 text-ink-deep text-xs font-medium rounded-full whitespace-nowrap">
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">{plan.name}</p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`text-4xl font-semibold ${plan.textColor}`}>
                    {plan.price === 0 ? 'Gratuit' : `${plan.price}€`}
                  </span>
                  {plan.period && <span className="text-zinc-500 text-sm">{plan.period}</span>}
                </div>
                <p className="text-xs text-zinc-500 font-light">{plan.description}</p>
              </div>

              <button
                onClick={() => handleSubscribe(plan.id, plan.priceId)}
                disabled={loading === plan.id || session?.user?.plan === plan.id}
                className={`w-full py-2.5 rounded-xl text-sm font-medium mb-6 transition-all
                  ${session?.user?.plan === plan.id
                    ? 'bg-white/5 text-zinc-500 cursor-default'
                    : 'highlight' in plan && plan.highlight
                      ? 'bg-gold-500 hover:bg-gold-400 text-ink-deep'
                      : 'border border-white/10 hover:border-gold-700/50 text-zinc-300 hover:text-gold-400'
                  } disabled:opacity-50`}>
                {loading === plan.id ? 'Chargement...' :
                 session?.user?.plan === plan.id ? '✓ Plan actuel' : plan.cta}
              </button>

              <ul className="space-y-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-zinc-400">
                    <Check className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5"/>
                    {f}
                  </li>
                ))}
                {plan.missing.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-zinc-700 line-through">
                    <span className="w-3.5 h-3.5 shrink-0"/>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-zinc-700 mt-10">
          Tous les prix sont HT · Paiement sécurisé par Stripe ·{' '}
          <Link href="/legal/rgpd" className="hover:text-zinc-500">RGPD</Link>
        </p>

      </div>
    </main>
  )
}
