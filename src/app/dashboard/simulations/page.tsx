'use client'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import { ArrowRight, Calendar, Trash2 } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function SimulationsPage() {
  const [simulations, setSimulations] = useState<any[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('simulations')
    if (saved) {
      try {
        setSimulations(JSON.parse(saved))
      } catch (e) {
        setSimulations([])
      }
    }
  }, [])

  const deleteSimulation = (id: number) => {
    const updated = simulations.filter(s => s.id !== id)
    setSimulations(updated)
    localStorage.setItem('simulations', JSON.stringify(updated))
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-ink-deep">
      <Sidebar />

      <main className="flex-1 lg:ml-72 pt-24 pb-20 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="font-display text-4xl text-zinc-900 dark:text-white tracking-tight">Mes Simulations</h1>
              <p className="text-zinc-500 dark:text-zinc-400 mt-2">Retrouvez toutes vos simulations sauvegardées</p>
            </div>
          </div>

          {simulations.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {simulations.map((sim) => (
                <div key={sim.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-3xl p-8 hover:border-amber-600 dark:hover:border-gold-700/40 transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-white">{sim.titre || 'Simulation sans nom'}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {sim.date}
                      </p>
                    </div>
                    <button 
                      onClick={() => deleteSimulation(sim.id)}
                      className="text-zinc-400 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-6 text-sm">
                    <div>
                      <span className="text-zinc-500 dark:text-zinc-400">Prix d'achat</span>
                      <p className="font-medium text-zinc-900 dark:text-white">{sim.prixAchat.toLocaleString()} €</p>
                    </div>
                    <div>
                      <span className="text-zinc-500 dark:text-zinc-400">Rendement net</span>
                      <p className="text-emerald-600 dark:text-emerald-400 font-medium">{sim.rendementNet} %</p>
                    </div>
                    <div>
                      <span className="text-zinc-500 dark:text-zinc-400">Marge MdB</span>
                      <p className="text-amber-600 dark:text-gold-400 font-medium">{sim.margeMdb.toLocaleString()} €</p>
                    </div>
                  </div>

                  <Link 
                    href="/simulateur"
                    className="mt-8 block w-full py-4 text-center border border-amber-600/30 dark:border-gold-700/50 hover:bg-amber-50 dark:hover:bg-gold-700/10 rounded-2xl text-sm font-medium transition-all"
                  >
                    Recharger cette simulation
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32">
              <Calculator className="w-16 h-16 mx-auto text-zinc-300 dark:text-zinc-600 mb-6" />
              <h3 className="text-xl text-zinc-700 dark:text-zinc-300 mb-3">Aucune simulation sauvegardée</h3>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                Vos simulations apparaîtront ici une fois que vous les aurez sauvegardées depuis le simulateur.
              </p>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
