'use client'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import { ArrowRight, Search, Filter, X } from 'lucide-react'
import { useState } from 'react'

export default function OpportunitesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [scoreMin, setScoreMin] = useState(70)
  const [rendementMin, setRendementMin] = useState(6)
  const [budgetMax, setBudgetMax] = useState(300000)

  const opportunites = [
    { id: 1, ville: "Paris 11ème", surface: "62 m²", prix: 184000, score: 91, rendement: 8.7, marge: 51000, decote: 18 },
    { id: 2, ville: "Lyon 3ème", surface: "78 m²", prix: 245000, score: 87, rendement: 7.9, marge: 68000, decote: 14 },
    { id: 3, ville: "Marseille 6ème", surface: "55 m²", prix: 152000, score: 94, rendement: 9.2, marge: 39000, decote: 22 },
    { id: 4, ville: "Bordeaux Centre", surface: "71 m²", prix: 219000, score: 82, rendement: 7.4, marge: 45000, decote: 11 },
    { id: 5, ville: "Lille Centre", surface: "68 m²", prix: 178000, score: 89, rendement: 8.1, marge: 47000, decote: 16 },
  ]

  const filteredOpportunites = opportunites.filter(opp => 
    opp.ville.toLowerCase().includes(searchTerm.toLowerCase()) &&
    opp.score >= scoreMin &&
    opp.rendement >= rendementMin &&
    opp.prix <= budgetMax
  )

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-ink-deep">
      <Sidebar />

      <main className="flex-1 lg:ml-72 pt-24 pb-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          
          {/* En-tête */}
          <div className="mb-10">
            <h1 className="font-display text-4xl text-zinc-900 dark:text-white tracking-tight">Opportunités détectées</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2">Filtrez et explorez les meilleures affaires analysées par l’IA</p>
          </div>

          {/* Barre de recherche + filtres */}
          <div className="bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-white/5 rounded-3xl p-6 mb-10">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 relative">
                <Search className="absolute left-5 top-4 w-5 h-5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Rechercher par ville, arrondissement..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 pl-14 py-4 rounded-2xl focus:outline-none focus:border-amber-600 dark:focus:border-gold-600 text-zinc-900 dark:text-white"
                />
              </div>

              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Score minimum</label>
                  <input 
                    type="range" 
                    min="60" 
                    max="100" 
                    value={scoreMin} 
                    onChange={(e) => setScoreMin(Number(e.target.value))}
                    className="accent-amber-600 dark:accent-gold-400"
                  />
                  <span className="text-xs text-amber-600 dark:text-gold-400 ml-2">{scoreMin}</span>
                </div>

                <div>
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Rendement min (%)</label>
                  <input 
                    type="range" 
                    min="5" 
                    max="12" 
                    step="0.1"
                    value={rendementMin} 
                    onChange={(e) => setRendementMin(Number(e.target.value))}
                    className="accent-amber-600 dark:accent-gold-400"
                  />
                  <span className="text-xs text-amber-600 dark:text-gold-400 ml-2">{rendementMin}%</span>
                </div>

                <div>
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Budget max</label>
                  <select 
                    value={budgetMax} 
                    onChange={(e) => setBudgetMax(Number(e.target.value))}
                    className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-2xl px-5 py-3 text-zinc-900 dark:text-white"
                  >
                    <option value={200000}>200 000 €</option>
                    <option value={300000}>300 000 €</option>
                    <option value={500000}>500 000 €</option>
                    <option value={1000000}>1 000 000 €</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Résultats */}
          <div className="flex justify-between items-center mb-6 text-sm text-zinc-500 dark:text-zinc-400">
            <p>{filteredOpportunites.length} opportunités correspondent à vos critères</p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredOpportunites.map((opp) => (
              <div key={opp.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-3xl overflow-hidden hover:border-amber-600 dark:hover:border-gold-700/40 transition-all">
                <div className="h-52 bg-zinc-100 dark:bg-zinc-800 relative flex items-center justify-center">
                  <div className="text-7xl opacity-10">🏠</div>
                  <div className="absolute top-5 right-5 bg-emerald-500 text-white text-xs font-semibold px-4 py-1.5 rounded-2xl">
                    {opp.score}
                  </div>
                </div>

                <div className="p-7">
                  <p className="font-medium text-zinc-900 dark:text-white">{opp.ville} • {opp.surface}</p>
                  <p className="text-3xl font-semibold text-zinc-900 dark:text-white mt-2">{opp.prix.toLocaleString()} €</p>

                  <div className="mt-6 grid grid-cols-2 gap-y-4 text-sm">
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
            ))}
          </div>

          {filteredOpportunites.length === 0 && (
            <div className="text-center py-20 text-zinc-500 dark:text-zinc-400">
              Aucune opportunité ne correspond à vos filtres actuels.
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
