'use client'
export const dynamic = 'force-dynamic'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import { Star } from 'lucide-react'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  if (status === 'loading') {
    return (
      <main className="min-h-screen bg-ink-deep flex items-center justify-center">
        <div className="text-zinc-400">Chargement...</div>
      </main>
    )
  }

  if (!session) return null

  return (
    <div className="flex min-h-screen bg-ink-deep">
      <Sidebar />

      {/* Contenu principal avec marge pour la sidebar */}
      <main className="flex-1 lg:ml-72 pt-24 pb-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-zinc-500 text-sm">Bonjour,</p>
              <h1 className="font-display text-5xl text-zinc-100">
                {session.user?.name?.split(' ')[0] ?? 'Investisseur'}
              </h1>
            </div>

            <div className="flex items-center gap-2 px-5 py-2 border border-gold-700/30 rounded-2xl bg-gold-700/10">
              <Star className="w-4 h-4 text-gold-400" />
              <span className="text-gold-400 text-sm font-medium">
                {session.user?.plan ?? 'DECOUVERTE'}
              </span>
            </div>
          </div>

          {/* Ton ancien contenu du dashboard peut être remis ici */}
          <p className="text-zinc-400">Le contenu du dashboard arrive bientôt...</p>
        </div>
      </main>
    </div>
  )
}
