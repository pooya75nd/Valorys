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
      <main className="min-h-screen bg-zinc-50 dark:bg-ink-deep flex items-center justify-center">
        <div className="text-zinc-500 dark:text-zinc-400">Chargement...</div>
      </main>
    )
  }

  if (!session) return null

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-ink-deep">
      <Sidebar />

      <main className="flex-1 lg:ml-72 pt-24 pb-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          
          {/* En-tête */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light">Bonjour,</p>
              <h1 className="font-display text-5xl text-zinc-900 dark:text-zinc-100 tracking-tight">
                {session.user?.name?.split(' ')[0] ?? 'Investisseur'}
              </h1>
            </div>

            <div className="flex items-center gap-4 mt-6 md:mt-0">
              <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                <Clock className="w-4 h-4" />
                <span>Aujourd’hui • 25 mars 2026</span>
              </div>
              <div className="px-5 py-2 bg-amber-100 dark:bg-gold-700/10 border border-amber-200 dark:border-gold-700/30 rounded-2xl text-amber-700 dark:text-gold-400 text-xs font-medium">
                {session.user?.plan ?? 'DECOUVERTE'}
              </div>
            </div>
          </div>

          {/* Titre principal */}
          <div className="mb-10">
            <h2 className="text-3xl font-medium text-zinc-900 dark:text-white">Opportunités détectées par l’IA</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2">Les meilleures affaires identifiées aujourd’hui</p>
          </div>

          {/* Cartes Opportunités */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-3xl overflow-hidden hover:border-amber-600 dark:hover:border-gold-700/40 transition-all duration-300 shadow-sm dark:shadow-none"
              >
                <div className="h-52 bg-zinc-100 dark:bg-zinc-800 relative flex items-center justify-center">
                  <div className="text-7xl opacity-10">🏠</div>
                  
                  <div className="absolute top-5 right-5 bg-emerald-500 text-white text-xs font-semibold px-4 py-1.5 rounded-2xl">
                    91
                  </div>
                </div>

                <div className="p-7">
                  <p className="font-medium text-zinc-900 dark:text-white">Paris 11ème • 62 m² • 3 pièces</p>
                  <p className="text-3xl font-semibold text-zinc-900 dark:text-white mt-2">184 000 €</p>

                  <div className="mt-6 grid grid-cols-2 gap-6 text-sm">
                    <div>
                      <span className="text-zinc-500 dark:text-zinc-400 text-xs block">Rendement net</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">8,7 %</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 dark:text-zinc-400 text-xs block">Marge MdB</span>
                      <span className="text-amber-600 dark:text-gold-400 font-medium">51 000 €</span>
                    </div>
                  </div>

                  <Link 
                    href={`/opportunites/${i}`}
                    className="mt-8 block w-full py-4 text-center border border-amber-600/30 dark:border-gold-700/50 hover:bg-amber-50 dark:hover:bg-gold-700/10 rounded-2xl text-sm font-medium transition-all"
                  >
                    Voir l’analyse complète
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  )
}
