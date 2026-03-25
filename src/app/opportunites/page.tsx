'use client'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import { ArrowRight, Filter, Search, Star } from 'lucide-react'

export default function OpportunitesPage() {
  return (
    <div className="flex min-h-screen bg-ink-deep">
      <Sidebar />

      <main className="flex-1 lg:ml-72 pt-24 pb-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          
          {/* En-tête */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h1 className="font-display text-4xl text-white tracking-tight">Opportunités détectées</h1>
              <p className="text-zinc-400 mt-2">Voici toutes les affaires analysées par l’IA aujourd’hui</p>
            </div>

            <div className="flex items-center gap-4 mt-6 md:mt-0">
              <div className="relative w-80">
                <Search className="absolute left-4 top-3 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Rechercher par ville, code postal..."
                  className="w-full bg-zinc-900 border border-white/10 pl-11 py-3 rounded-2xl text-sm focus:outline-none focus:border-gold-700/50"
                />
              </div>

              <button className="flex items-center gap-2 px-5 py-3 bg-zinc-900 border border-white/10 rounded-2xl hover:border-gold-700/50 transition-all">
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filtres</span>
              </button>
            </div>
          </div>

          {/* Compteur + Tri */}
          <div className="flex justify-between items-center mb-8 text-sm text-zinc-400">
            <p>28 opportunités trouvées aujourd’hui</p>
            <div className="flex items-center gap-4">
              <span>Trier par :</span>
              <select className="bg-transparent border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none">
                <option>Score IA (descendant)</option>
                <option>Rendement net</option>
                <option>Marge MdB</option>
                <option>Prix le plus bas</option>
              </select>
            </div>
          </div>

          {/* Liste des opportunités */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-zinc-900/70 border border-white/5 rounded-3xl overflow-hidden hover:border-gold-700/40 transition-all group">
                
                {/* Image placeholder */}
                <div className="h-52 bg-zinc-800 relative">
                  <div className="absolute top-4 right-4 bg-black/70 text-emerald-400 text-xs font-medium px-3 py-1 rounded-full">
                    Score 91
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/70 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 text-gold-400" />
                    <span className="text-gold-400">Décote -18%</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="font-medium text-white">Paris 11ème • 3 pièces</p>
                      <p className="text-2xl font-semibold text-white mt-1">184 000 €</p>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-400 font-medium">8,7 %</p>
                      <p className="text-xs text-zinc-500">rendement net</p>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm mb-6">
                    <div className="text-zinc-400">Marge MdB estimée</div>
                    <div className="text-gold-400 font-medium">51 000 €</div>
                  </div>

                  <Link href={`/opportunites/${i}`} 
                    className="block w-full py-4 text-center border border-gold-700/50 hover:bg-gold-700/10 rounded-2xl text-sm transition-all group-hover:border-gold-400">
                    Voir l’analyse détaillée
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Message temporaire */}
          <div className="mt-16 text-center text-zinc-500 text-sm">
            Le système de scraping et d’analyse IA est en cours de finalisation.<br />
            De nouvelles opportunités seront ajoutées quotidiennement.
          </div>

        </div>
      </main>
    </div>
  )
}
