'use client'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import { Bell, Plus, ArrowRight, Trash2, Target } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Alerte {
  id: number
  titre: string
  critere: string
  active: boolean
  dernierEnvoi: string
  opportunitesTrouvees?: number
}

interface HistoriqueItem {
  id: number
  titre: string
  date: string
  score: number
  opportuniteId: number
}

const historique: HistoriqueItem[] = [
  { id: 1, titre: "Opportunité Lyon 3ème - Score 87", date: "24 mars 2026", score: 87, opportuniteId: 2 },
  { id: 2, titre: "Opportunité Marseille 6ème - Score 94", date: "23 mars 2026", score: 94, opportuniteId: 3 },
  { id: 3, titre: "Opportunité Paris 11ème - Score 91", date: "25 mars 2026", score: 91, opportuniteId: 1 },
]

export default function AlertesPage() {
  const [alertesActives, setAlertesActives] = useState<Alerte[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newAlerte, setNewAlerte] = useState({
    titre: "",
    villes: "",
    budgetMax: "",
    rendementMin: "",
    scoreMin: "85",
    decoteMin: "",
  })

  // Charger les alertes depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem('valorys_alertes')
    if (saved) {
      try {
        setAlertesActives(JSON.parse(saved))
      } catch {
        setAlertesActives([])
      }
    }
  }, [])

  // Sauvegarder dans localStorage
  const saveAlertes = (alertes: Alerte[]) => {
    setAlertesActives(alertes)
    localStorage.setItem('valorys_alertes', JSON.stringify(alertes))
  }

  const createAlerte = () => {
    if (!newAlerte.titre.trim()) return

    const nouvelleAlerte: Alerte = {
      id: Date.now(),
      titre: newAlerte.titre.trim(),
      critere: `Villes: ${newAlerte.villes || 'Toutes'} | Budget ≤ ${newAlerte.budgetMax || '—'} € | Rendement ≥ ${newAlerte.rendementMin || '—'}% | Score ≥ ${newAlerte.scoreMin} | Décote ≥ ${newAlerte.decoteMin || '—'}%`,
      active: true,
      dernierEnvoi: "À l'instant",
      opportunitesTrouvees: Math.floor(Math.random() * 9) + 2
    }

    saveAlertes([nouvelleAlerte, ...alertesActives])
    setNewAlerte({ titre: "", villes: "", budgetMax: "", rendementMin: "", scoreMin: "85", decoteMin: "" })
    setShowCreateForm(false)
  }

  const deleteAlerte = (id: number) => {
    saveAlertes(alertesActives.filter(a => a.id !== id))
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-ink-deep">
      <Sidebar />

      <main className="flex-1 lg:ml-72 pt-24 pb-20 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">
          
          {/* En-tête */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="font-display text-4xl text-zinc-900 dark:text-white tracking-tight">Mes Alertes</h1>
              <p className="text-zinc-500 dark:text-zinc-400 mt-2">Surveillez en temps réel les meilleures opportunités selon vos critères</p>
            </div>
            
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 dark:bg-gold-500 dark:hover:bg-amber-300 text-white dark:text-black rounded-2xl transition-all font-medium"
            >
              <Plus className="w-5 h-5" />
              Nouvelle alerte
            </button>
          </div>

          {/* Formulaire de création */}
          {showCreateForm && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-3xl p-10 mb-12">
              <h3 className="text-xl font-medium mb-8 text-zinc-900 dark:text-white">Créer une nouvelle alerte intelligente</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <label className="block text-sm text-zinc-500 dark:text-zinc-400 mb-2">Nom de l'alerte</label>
                  <input
                    type="text"
                    value={newAlerte.titre}
                    onChange={(e) => setNewAlerte({...newAlerte, titre: e.target.value})}
                    placeholder="Ex: Paris - Haut rendement & Décote"
                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-amber-600 dark:focus:border-gold-600 text-zinc-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-500 dark:text-zinc-400 mb-2">Villes ou départements</label>
                  <input
                    type="text"
                    value={newAlerte.villes}
                    onChange={(e) => setNewAlerte({...newAlerte, villes: e.target.value})}
                    placeholder="Paris, Lyon, 75, 69..."
                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-amber-600 dark:focus:border-gold-600 text-zinc-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-500 dark:text-zinc-400 mb-2">Budget maximum (€)</label>
                  <input
                    type="number"
                    value={newAlerte.budgetMax}
                    onChange={(e) => setNewAlerte({...newAlerte, budgetMax: e.target.value})}
                    placeholder="300000"
                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-amber-600 dark:focus:border-gold-600 text-zinc-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-500 dark:text-zinc-400 mb-2">Rendement minimum (%)</label>
                  <input
                    type="number"
                    value={newAlerte.rendementMin}
                    onChange={(e) => setNewAlerte({...newAlerte, rendementMin: e.target.value})}
                    placeholder="7"
                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-amber-600 dark:focus:border-gold-600 text-zinc-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-500 dark:text-zinc-400 mb-2">Score minimum</label>
                  <input
                    type="number"
                    value={newAlerte.scoreMin}
                    onChange={(e) => setNewAlerte({...newAlerte, scoreMin: e.target.value})}
                    placeholder="85"
                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-amber-600 dark:focus:border-gold-600 text-zinc-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-500 dark:text-zinc-400 mb-2">Décote minimum (%)</label>
                  <input
                    type="number"
                    value={newAlerte.decoteMin}
                    onChange={(e) => setNewAlerte({...newAlerte, decoteMin: e.target.value})}
                    placeholder="12"
                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-amber-600 dark:focus:border-gold-600 text-zinc-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="mt-10 flex gap-4">
                <button
                  onClick={createAlerte}
                  className="flex-1 py-4 bg-amber-600 hover:bg-amber-700 dark:bg-gold-500 dark:hover:bg-amber-300 text-white dark:text-black font-medium rounded-2xl transition-all"
                >
                  Activer cette alerte
                </button>
                <button
                  onClick={() => {
                    setShowCreateForm(false)
                    setNewAlerte({ titre: "", villes: "", budgetMax: "", rendementMin: "", scoreMin: "85", decoteMin: "" })
                  }}
                  className="flex-1 py-4 border border-zinc-300 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-2xl transition-all text-zinc-900 dark:text-white"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}

          {/* Alertes actives */}
          <div className="mb-16">
            <h2 className="text-2xl font-medium text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
              <Bell className="w-6 h-6 text-amber-600 dark:text-gold-400" />
              Alertes actives ({alertesActives.length})
            </h2>

            {alertesActives.length === 0 ? (
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-3xl p-16 text-center">
                <Bell className="w-16 h-16 mx-auto text-zinc-300 dark:text-zinc-600 mb-6" />
                <h3 className="text-xl text-zinc-700 dark:text-zinc-300 mb-3">Aucune alerte active</h3>
                <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                  Créez votre première alerte pour recevoir les meilleures opportunités en temps réel.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {alertesActives.map((alerte) => (
                  <div key={alerte.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-3xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <p className="font-medium text-lg text-zinc-900 dark:text-white">{alerte.titre}</p>
                        {alerte.opportunitesTrouvees && (
                          <span className="px-4 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-medium rounded-full">
                            {alerte.opportunitesTrouvees} opportunités trouvées
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{alerte.critere}</p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-4">Dernier envoi : {alerte.dernierEnvoi}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="px-6 py-2.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-medium rounded-2xl">
                        Active
                      </span>
                      <button
                        onClick={() => deleteAlerte(alerte.id)}
                        className="p-3 text-zinc-400 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Historique */}
          <div>
            <h2 className="text-2xl font-medium text-zinc-900 dark:text-white mb-6">Historique récent</h2>
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-3xl overflow-hidden">
              {historique.map((item, index) => (
                <div key={item.id} className={`p-7 flex items-center justify-between border-b border-zinc-100 dark:border-white/10 ${index !== historique.length - 1 ? 'border-b' : ''}`}>
                  <div className="flex items-center gap-4">
                    <Bell className="w-5 h-5 text-emerald-500" />
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-white">{item.titre}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Score {item.score}</span>
                    <Link
                      href={`/opportunites/${item.opportuniteId}`}
                      className="text-amber-600 dark:text-gold-400 hover:underline text-sm flex items-center gap-1"
                    >
                      Voir <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
