'use client'
export const dynamic = 'force-dynamic'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import { ArrowRight, Clock, Target, TrendingUp, Heart, Award } from 'lucide-react'

const sampleOpportunites = [
  {
    id: 1,
    ville: "Paris 11ème",
    surface: "62 m²",
    prix: 184000,
    score: 91,
    rendement: 8.7,
    marge: 51000
  },
  {
    id: 2,
    ville: "Lyon 3ème",
    surface: "78 m²",
    prix: 245000,
    score: 87,
    rendement: 7.9,
    marge: 68000
  },
  {
    id: 3,
    ville: "Marseille 6ème",
    surface: "55 m²",
    prix: 152000,
    score: 94,
    rendement: 9.2,
    marge: 39000
  },
]

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [favoris, setFavoris] = useState<number[]>([])
  const [simulationsCount, setSimulationsCount] = useState(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFavoris = localStorage.getItem('favoris')
      if (savedFavoris) setFavoris(JSON.parse(savedFavoris))

      const savedSimulations = localStorage.getItem('simulations')
      if (savedSimulations) setSimulationsCount(JSON.parse(savedSimulations).length)
    }
  }, [])

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  if (status === 'loading') {
    return (
      <main className="min-h-screen bg-zinc-50 dark:bg-ink-deep flex items-center justify-center">
        <div className="text-zinc-500 dark:text-zinc-400">Chargement du cockpit...</div>
      </main>
    )
  }

  if (!session) return null

  const plan = session.user?.plan ?? 'DECOUVERTE'

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-ink-deep">
      <Sidebar />

      <main className="flex-1 lg:ml-72 pt-24 pb-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Header d'accueil */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light">Bonjour,</p>
              <h1 className="font-display text-5xl text-zinc-900 dark:text-zinc-100 tracking-tight">
                {session.user?.name?.split(' ')[0] ?? 'Investisseur'}
              </h1>
            </div>
            <div className="flex items-center gap-4 mt-6 md:mt-0 text-sm text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Aujourd’hui • {new Date().toLocaleDateString('fr-FR', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="px-5 py-2 bg-amber-100 dark:bg-gold-700/10 border border-amber-200 dark:border-gold-700/30 rounded-2xl text-amber-700 dark:text-gold-400 text-xs font-medium">
                {plan}
              </div>
            </div>
          </div>

          {/* Statistiques KPI */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white dark:bg-zinc-900 border border-white/5 rounded-3xl p-8">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm">Opportunités détectées</p>
                  <p className="text-4xl font-semibold text-zinc-900 dark:text-white mt-3">124</p>
                </div>
                <Target className="w-9 h-9 text-amber-600 dark:text-gold-400" />
              </div>
              <p className="text-emerald-600 dark:text-emerald-400 text-sm mt-6">+18 cette semaine</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-white/5 rounded-3xl p-8">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm">Mes Favoris</p>
                  <p className="text-4xl font-semibold text-zinc-900 dark:text-white mt-3">{favoris.length}</p>
                </div>
                <Heart className="w-9 h-9 text-rose-500" />
              </div>
              <Link href="/dashboard/favoris" className="text-amber-600 dark:text-gold-400 text-sm mt-6 inline-block hover:underline">
                Voir mes favoris →
              </Link>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-white/5 rounded-3xl p-8">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm">Simulations sauvegardées</p>
                  <p className="text-4xl font-semibold text-zinc-900 dark:text-white mt-3">{simulationsCount}</p>
                </div>
                <TrendingUp className="w-9 h-9 text-emerald-600" />
              </div>
              <Link href="/dashboard/simulations" className="text-amber-600 dark:text-gold-400 text-sm mt-6 inline-block hover:underline">
                Voir mes simulations →
              </Link>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-white/5 rounded-3xl p-8">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm">Score moyen IA</p>
                  <p className="text-4xl font-semibold text-emerald-600 dark:text-emerald-400 mt-3">88.6</p>
                </div>
                <Award className="w-9 h-9 text-amber-600 dark:text-gold-400" />
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-6">Sur les dernières opportunités</p>
            </div>
          </div>

          {/* Opportunité du jour */}
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-medium text-zinc-900 dark:text-white flex items-center gap-3">
                <span>Opportunité du jour</span>
                <span className="text-amber-600 dark:text-gold-400 text-xl">★</span>
              </h2>
              <Link href="/opportunites" className="text-amber-600 dark:text-gold-400 flex items-center gap-2 hover:underline">
                Toutes les opportunités <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-amber-600/30 dark:border-gold-700/40 rounded-3xl p-10 flex flex-col lg:flex-row gap-10 items-center">
              <div className="flex-1">
                <div className="inline-flex bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-5 py-1.5 rounded-full text-sm font-medium mb-4">
                  Score IA • 94
                </div>
                <h3 className="text-3xl font-medium">Paris 11ème — Rue Oberkampf</h3>
                <p className="text-5xl font-semibold text-zinc-900 dark:text-white mt-4">184 000 €</p>
                <p className="text-zinc-500 dark:text-zinc-400 mt-2">62 m² • 3 pièces • Excellent potentiel MdB</p>

                <div className="mt-10 grid grid-cols-3 gap-8">
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Rendement net</p>
                    <p className="text-2xl font-medium text-emerald-600 dark:text-emerald-400">9,2 %</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Marge MdB</p>
                    <p className="text-2xl font-medium text-amber-600 dark:text-gold-400">51 000 €</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Décote</p>
                    <p className="text-2xl font-medium">-18 %</p>
                  </div>
                </div>
              </div>

              <div className="lg:w-96 h-80 bg-zinc-100 dark:bg-zinc-800 rounded-3xl flex items-center justify-center text-[120px] opacity-10">
                🏠
              </div>
            </div>
          </div>

          {/* Opportunités récentes */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-medium text-zinc-900 dark:text-white">Opportunités détectées par l’IA</h2>
              <Link href="/opportunites" className="text-amber-600 dark:text-gold-400 flex items-center gap-2 text-sm hover:underline">
                Voir tout <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {sampleOpportunites.map((opp) => {
                const isFavori = favoris.includes(opp.id)
                return (
                  <div
                    key={opp.id}
                    className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-3xl overflow-hidden hover:border-amber-600 dark:hover:border-gold-700/40 transition-all"
                  >
                    <div className="h-52 bg-zinc-100 dark:bg-zinc-800 relative flex items-center justify-center">
                      <div className="text-7xl opacity-10">🏠</div>
                      <div className="absolute top-5 right-5 bg-emerald-500 text-white text-xs font-semibold px-4 py-1.5 rounded-2xl">
                        {opp.score}
                      </div>
                      <button
                        onClick={() => {
                          let newFavoris = [...favoris]
                          if (isFavori) {
                            newFavoris = newFavoris.filter(id => id !== opp.id)
                          } else {
                            newFavoris.push(opp.id)
                          }
                          setFavoris(newFavoris)
                          localStorage.setItem('favoris', JSON.stringify(newFavoris))
                        }}
                        className="absolute top-5 left-5 p-2.5 bg-white/90 dark:bg-black/70 rounded-full hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-all"
                      >
                        <Heart className={`w-5 h-5 transition-colors ${isFavori ? 'text-rose-500 fill-current' : 'text-zinc-400 dark:text-zinc-500'}`} />
                      </button>
                    </div>

                    <div className="p-7">
                      <p className="font-medium text-zinc-900 dark:text-white">{opp.ville} • {opp.surface}</p>
                      <p className="text-3xl font-semibold text-zinc-900 dark:text-white mt-2">{opp.prix.toLocaleString()} €</p>

                      <div className="mt-6 grid grid-cols-2 gap-6 text-sm">
                        <div>
                          <span className="text-zinc-500 dark:text-zinc-400 text-xs block">Rendement net</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium">{opp.rendement} %</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 dark:text-zinc-400 text-xs block">Marge MdB</span>
                          <span className="text-amber-600 dark:text-gold-400 font-medium">{opp.marge.toLocaleString()} €</span>
                        </div>
                      </div>

                      <Link
                        href={`/opportunites/${opp.id}`}
                        className="mt-8 block w-full py-4 text-center border border-amber-600/30 dark:border-gold-700/50 hover:bg-amber-50 dark:hover:bg-gold-700/10 rounded-2xl text-sm font-medium transition-all"
                      >
                        Voir l’analyse complète
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
