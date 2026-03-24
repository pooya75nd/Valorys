'use client'
export const dynamic = 'force-dynamic'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { Bell, Heart, TrendingUp, Building2, ArrowRight, Star, Target } from 'lucide-react'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  if (status === 'loading') {
    return (
      <main className="min-h-screen bg-ink-deep flex items-center justify-center">
        <div className="text-zinc-400">Chargement du tableau de bord...</div>
      </main>
    )
  }

  if (!session) return null

  const plan = session.user?.plan ?? 'DECOUVERTE'
  const planLabels: Record<string, string> = {
    DECOUVERTE: 'Découverte',
    INVESTISSEUR: 'Investisseur',
    MARCHAND: 'Marchand',
    PRO: 'Pro & Cabinet',
  }

  return (
    <main className="min-h-screen bg-ink-deep pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="text-zinc-500 text-sm font-light mb-1">Bonjour,</p>
            <h1 className="font-display text-5xl text-zinc-100 tracking-tight">
              {session.user?.name?.split(' ')[0] ?? 'Investisseur'}
            </h1>
          </div>

          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <div className="flex items-center gap-2 px-4 py-2 border border-gold-700/40 rounded-xl bg-gold-700/10">
              <Star className="w-4 h-4 text-gold-400" />
              <span className="text-sm text-gold-400 font-medium">{planLabels[plan]}</span>
            </div>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
          {[
            { 
              icon: Bell, 
              label: 'Alertes actives', 
              value: '3', 
              unit: 'nouvelles',
              color: 'text-blue-400',
              href: '/dashboard/alertes' 
            },
            { 
              icon: Heart, 
              label: 'Favoris', 
              value: '7', 
              unit: 'biens',
              color: 'text-rose-400',
              href: '/dashboard/favoris' 
            },
            { 
              icon: TrendingUp, 
              label: 'Score moyen', 
              value: '84', 
              unit: '/100',
              color: 'text-gold-400',
              href: '/opportunites' 
            },
            { 
              icon: Target, 
              label: 'Potentiel MdB', 
              value: '184k', 
              unit: '€',
              color: 'text-emerald-400',
              href: '/simulateur' 
            },
          ].map(({ icon: Icon, label, value, unit, color, href }) => (
            <Link key={href} href={href}
              className="group p-6 bg-zinc-900/60 border border-white/5 rounded-3xl hover:border-gold-700/40 transition-all duration-300">
              <Icon className={`w-6 h-6 ${color} mb-4`} />
              <div className="text-4xl font-semibold text-zinc-100 mb-1">{value}</div>
              <div className="text-sm text-zinc-400">{label}</div>
              <div className="text-xs text-zinc-500 mt-1">{unit}</div>
            </Link>
          ))}
        </div>

        {/* Meilleures opportunités du jour */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium text-zinc-100">Meilleures opportunités aujourd’hui</h2>
            <Link href="/opportunites" className="text-sm text-gold-400 hover:text-gold-300 flex items-center gap-2">
              Voir tout <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Cartes placeholder - on les remplira plus tard avec de vraies données */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-zinc-900/60 border border-white/5 rounded-3xl p-6 hover:border-gold-700/30 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-zinc-500">Paris 11ème</p>
                    <p className="text-lg font-medium text-zinc-100">185 000 €</p>
                  </div>
                  <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-full">
                    Score 91
                  </div>
                </div>
                <div className="text-xs text-zinc-400 space-y-1">
                  <p>Rendement net estimé : <span className="text-emerald-400">8,4 %</span></p>
                  <p>Marge MdB estimée : <span className="text-gold-400">42 000 €</span></p>
                </div>
                <Link href={`/opportunites/${i}`} 
                  className="mt-6 block text-center py-3 text-sm border border-gold-700/50 hover:bg-gold-700/10 rounded-2xl transition-colors">
                  Voir les détails
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Actions rapides */}
        <div className="p-8 bg-zinc-900/60 border border-white/5 rounded-3xl">
          <h2 className="text-xl font-medium text-zinc-100 mb-6">Actions rapides</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: 'Lancer une simulation', href: '/simulateur', icon: TrendingUp },
              { label: 'Parcourir les opportunités', href: '/opportunites', icon: Building2 },
              { label: 'Gérer mes alertes', href: '/dashboard/alertes', icon: Bell },
            ].map(({ label, href, icon: Icon }) => (
              <Link key={href} href={href}
                className="flex items-center justify-between p-5 rounded-2xl border border-white/5 hover:border-gold-700/40 group transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-800 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gold-400" />
                  </div>
                  <span className="text-zinc-300 group-hover:text-white transition-colors">{label}</span>
                </div>
                <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-gold-400 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
