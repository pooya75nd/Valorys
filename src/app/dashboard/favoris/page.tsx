'use client'
import Sidebar from '@/components/Sidebar'
import { Heart } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function FavorisPage() {
  const [favoris, setFavoris] = useState<any[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('favoris')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        console.log("Favoris chargés :", parsed)   // ← Pour voir dans la console
        setFavoris(Array.isArray(parsed) ? parsed : [])
      } catch (e) {
        console.error("Erreur chargement favoris", e)
        setFavoris([])
      }
    }
  }, [])

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-ink-deep">
      <Sidebar />

      <main className="flex-1 lg:ml-72 pt-24 pb-20 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex items-center justify-between mb-12">
            <h1 className="font-display text-4xl text-zinc-900 dark:text-white tracking-tight">Mes Favoris</h1>
            <div className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500" />
              {favoris.length} biens
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-10 rounded-3xl border border-zinc-200 dark:border-white/5">
            <pre className="text-xs text-zinc-600 dark:text-zinc-400 overflow-auto">
              {JSON.stringify(favoris, null, 2)}
            </pre>
          </div>

          {favoris.length === 0 && (
            <div className="text-center py-32">
              <Heart className="w-16 h-16 mx-auto text-zinc-300 dark:text-zinc-600 mb-6" />
              <h3 className="text-xl text-zinc-700 dark:text-zinc-300 mb-3">Aucun favori pour le moment</h3>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
