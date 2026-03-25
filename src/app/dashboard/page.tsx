'use client'
export const dynamic = 'force-dynamic'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import { Bell, Heart, TrendingUp, Target, ArrowRight, Star } from 'lucide-react'

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

  return (
    <div className="flex min-h-screen bg-ink-deep">
      <Sidebar />

      {/* Contenu principal */}
      <main className="flex-1 lg:ml-72 pt-24 pb-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          
          {/* En-tête */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-zinc-500 text-sm font-light">Bonjour,</p>
              <h1 className="font-display text-5xl text-zinc-100 tracking-tight">
                {session.user?.name?.split(' ')[0] ?? 'Investisseur'}
              </h1>
            </div>

            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <div className="px-5 py-2 bg-gold-700/10 border border-gold-700/30 rounded-2xl flex items-center gap-2">
                <Star className="w-4 h-4 text-gold-400" />
                <span className="text-gold-400 text-sm font-medium">
                  {session.user?.plan ?? 'DECOUVERTE'}
                </span>
              </div>
            </div>
          </div>

          {/* Statistiques en cartes */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: Bell, label: "Alertes actives", value: "3", color: "text-blue-400", unit: "" },
              { icon: Heart, label: "Favoris", value: "7", color: "text-rose-400", unit: "" },
              { icon: Target, label: "Score moyen", value: "86", color: "text-gold-400", unit: "/100" },
              { icon: TrendingUp, label: "Potentiel MdB", value: "217k", color: "text-emerald-400", unit: "€" },
            ].map(({ icon: Icon, label, value, color, unit }) => (
              <div key={label} className="bg-zinc-900/70 border border-white/5 rounded-3xl p-7 hover:border-gold-700/30 transition-all">
                <Icon className={`w-7 h-7 ${color} mb-5`} />
                <div className="text-4xl font-semibold text-white mb-1">{value}{unit}</div>
                <div className="text-zinc-400 text-sm">{label}</div>
              </div>
            ))}
          </div>

          {/* Meilleures opportunités */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-medium text-zinc-100">Meilleures opportunités aujourd’hui</h2>
              <Link href="/opportunites" className="text-gold-400 hover:text-gold-300 flex items-center gap-2 text-sm">
                Voir toutes les opportunités <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-zinc-900/70 border border-white/5 rounded-3xl p-6 hover:border-gold-700/30 transition-all group">
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="text-zinc-500 text-sm">Paris • 11ème</p>
                      <p className="text-2xl font-medium text-white mt-1">184 000 €</p>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-400 text-xl font-semibold">92</div>
                      <div className="text-xs text-zinc-500">score</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-zinc-400">
                      <span>Rendement net</span>
                      <span className="text-emerald-400 font-medium">8,7 %</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Marge MdB estimée</span>
                      <span className="text-gold-400 font-medium">51 000 €</span>
                    </div>
                  </div>

                  <Link href={`/opportunites/${i}`} 
                    className="mt-6 block w-full text-center py-3.5 border border-gold-700/50 hover:bg-gold-700/10 rounded-2xl text-sm transition-colors">
                    Voir les détails
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Actions rapides */}
          <div className="bg-zinc-900/70 border border-white/5 rounded-3xl p-8">
            <h2 className="text-xl font-medium text-zinc-100 mb-6">Actions rapides</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: "Lancer une simulation", desc: "Estimez rapidement votre rentabilité", href: "/simulateur" },
                { title: "Parcourir toutes les opportunités", desc: "Accédez à la liste complète", href: "/opportunites" },
                { title: "Configurer mes alertes", desc: "Recevez les meilleures affaires en priorité", href: "/dashboard/alertes" },
              ].map((action, i) => (
                <Link key={i} href={action.href}
                  className="p-6 bg-zinc-950 border border-white/5 rounded-2xl hover:border-gold-700/40 transition-all group">
                  <h3 className="font-medium text-zinc-200 mb-2 group-hover:text-gold-400 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-zinc-500 mb-4">{action.desc}</p>
                  <div className="text-gold-400 text-sm flex items-center gap-2">
                    Accéder <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
