'use client'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import { Heart, MapPin, Star, Trash2 } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function FavorisPage() {
  const [favoris, setFavoris] = useState<any[]>([])

  // Chargement des favoris depuis localStorage
  useEffect(() => {
    const savedFavoris = localStorage.getItem('favoris')
    if (savedFavoris) {
      setFavoris(JSON.parse(savedFavoris))
    } else {
      // Données fictives initiales
      const initialFavoris = [
        { 
          id: 1, 
          ville: "Paris 11ème", 
          adresse: "Rue de la Roquette", 
          prix: 184000, 
          surface: "62 m²", 
          score: 91, 
          rendement: 8.7, 
          marge: 51000 
        },
        { 
          id: 2, 
          ville: "Lyon 3ème", 
          adresse: "Rue de la Part-Dieu", 
          prix: 245000, 
          surface: "78 m²", 
          score: 87, 
          rendement: 7.9, 
          marge: 68000 
        }
      ]
      setFavoris(initialFavoris)
      localStorage.setItem('favoris', JSON.stringify(initialFavoris))
    }
  }, [])

  const removeFavori = (id: number) => {
    const updatedFavoris = favoris.filter(item => item.id !== id)
    setFavoris(updatedFavoris)
    localStorage.setItem('favoris', JSON.stringify(updatedFavoris))
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-ink-deep">
      <Sidebar />

      <main className="flex-1 lg:ml-72 pt-24 pb-20 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">
          
          {/* En-tête */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="font-display text-4xl text-zinc-900 dark:text-white tracking-tight">Mes Favoris</h1>
              <p className="text-zinc-500 dark:text-zinc-400 mt-2">Les opportunités que vous avez sauvegardées</p>
            </div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500" />
              {favoris.length} biens sauvegardés
            </div>
          </div>

          {favoris.length > 0 ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {favoris.map((bien) => (
                <div 
                  key={bien.id} 
                  className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-3xl overflow-hidden hover:border-rose-300 dark:hover:border-gold-700/40 transition-all"
                >
                  <div className="h-52 bg-zinc-100 dark:bg-zinc-800 relative flex items-center justify-center">
                    <div className="text-7xl opacity-10">🏠</div>
                    
                    <div className="absolute top-5 right-5 bg-emerald-500 text-white text-xs font-semibold px-4 py-1.5 rounded-2xl">
                      {bien.score}
                    </div>

                    <button
                      onClick={() => removeFavori(bien.id)}
                      className="absolute top-5 left-5 p-2 bg-white/80 dark:bg-black/70 rounded-full hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-all"
                    >
                      <Trash2 className="w-4 h-4 text-rose-500" />
                    </button>
                  </div>

                  <div className="p-7">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-zinc-900 dark:text-white flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-zinc-400" />
                          {bien.ville}
                        </p>
                        <p className="text-2xl font-semibold text-zinc-900 dark:text-white mt-2">{bien.prix.toLocaleString()} €</p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">{bien.surface}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-emerald-600 dark:text-emerald-400 font-medium">{bien.rendement} %</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">rendement</p>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-between items-center text-sm">
                      <div>
                        <span className="text-zinc-500 dark:text-zinc-400">Marge MdB</span>
                        <p className="text-amber-600 dark:text-gold-400 font-medium">{bien.marge.toLocaleString()} €</p>
                      </div>
                    </div>

                    <Link 
                      href={`/opportunites/${bien.id}`}
                      className="mt-8 block w-full py-4 text-center border border-amber-600/30 dark:border-gold-700/50 hover:bg-amber-50 dark:hover:bg-gold-700/10 rounded-2xl text-sm font-medium transition-all"
                    >
                      Voir l’analyse complète
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32">
              <Heart className="w-16 h-16 mx-auto text-zinc-300 dark:text-zinc-600 mb-6" />
              <h3 className="text-xl text-zinc-700 dark:text-zinc-300 mb-3">Aucun favori pour le moment</h3>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                Lorsque vous verrez une opportunité intéressante, cliquez sur le cœur pour l’ajouter à vos favoris.
              </p>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
