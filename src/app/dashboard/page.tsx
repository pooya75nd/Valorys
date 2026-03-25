'use client'
export const dynamic = 'force-dynamic'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import { ArrowRight, Clock, Star } from 'lucide-react'

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

            <div className="flex items-center gap-4 mt-6 md:mt-0 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Aujourd’hui • 25 mars 2026</span>
              </div>
              <div className="px-5 py-2 bg-gold-700/10 border border-gold-700/30 rounded-2xl text-gold-400 text-xs font-medium">
                {session.user?.plan ?? 'DECOUVERTE'}
              </div>
            </div>
          </div>

          {/* Titre principal */}
          <div className="mb-10">
            <h2 className="text-3xl font-medium text-white">Opportunités détectées par l’IA</h2>
            <p className="text-zinc-400 mt-2">Les meilleures affaires identifiées aujourd’hui pour vous</p>
          </div>

          {/* Cartes Opportunités améliorées */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="group bg-zinc-900/70 border border-white/5 rounded-3xl overflow-hidden hover:border-gold-700/40 transition-all duration-300"
              >
                {/* Zone visuelle */}
                <div className="h-52 bg-zinc-800 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-10">
                    🏛️
                  </div>
                  
                  {/* Score */}
                  <div className="absolute top-5 right-5 bg-emerald-500 text-black text-xs font-semibold px-4 py-1.5 rounded-2xl shadow">
                    91
                  </div>

                  {/* Décote */}
                  <div className="absolute bottom-5 left-5 bg-black/80 px-4 py-1 rounded-xl text-xs flex items-center gap-1.5">
                    <span className="text-emerald-400 font-medium">-18%</span>
                    <span className="text-zinc-400">décote marché</span>
                  </div>
                </div>

                <div className="p-7">
                  <p className="font-medium text-white">Paris 11ème • 62 m² • 3 pièces</p>
                  <p className="text-3xl font-semibold text-white mt-2">184 000 €</p>

                  <div className="mt-6 grid grid-cols-2 gap-6 text-sm">
                    <div>
                      <span className="text-zinc-500 block text-xs">Rendement net</span>
                      <span className="text-emerald-400 font-medium text-lg">8,7 %</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-xs">Marge MdB</span>
                      <span className="text-gold-400 font-medium text-lg">51 000 €</span>
                    </div>
                  </div>

                  <Link 
                    href={`/opportunites/${i}`}
                    className="mt-8 block w-full py-4 text-center border border-gold-700/50 hover:bg-gold-700/10 rounded-2xl text-sm font-medium transition-all group-hover:border-gold-400"
                  >
                    Voir l’analyse complète →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Message temporaire */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900/50 border border-white/10 rounded-2xl text-sm text-zinc-400">
              Le système complet de scraping et scoring IA est en cours de déploiement
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
