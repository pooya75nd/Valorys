'use client'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import { Bell, Plus, ArrowRight, Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function AlertesPage() {
  const [alertesActives, setAlertesActives] = useState([
    { 
      id: 1, 
      titre: "Paris - Score élevé", 
      critere: "Score > 85 | Budget < 300 000 € | Rendement > 7%", 
      active: true, 
      dernierEnvoi: "Il y a 2h" 
    },
  ])

  const [historique] = useState([
    { id: 101, titre: "Opportunité Paris 11ème - Score 91", date: "25 mars 2026", score: 91 },
  ])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newAlerte, setNewAlerte] = useState({
    titre: "",
    villes: "",
    budgetMax: "",
    rendementMin: "",
    scoreMin: "80",
    decoteMin: "",
    typeOperation: "mdB", // mdB ou location
  })

  const createAlerte = () => {
    if (!newAlerte.titre) return

    const nouvelleAlerte = {
      id: Date.now(),
      titre: newAlerte.titre,
      critere: `Villes: ${newAlerte.villes || 'Toutes'} | Budget < ${newAlerte.budgetMax || '—'} € | Rendement > ${newAlerte.rendementMin || '—'}% | Score > ${newAlerte.scoreMin}`,
      active: true,
      dernierEnvoi: "À l'instant"
    }

    setAlertesActives([nouvelleAlerte, ...alertesActives])
    setNewAlerte({
      titre: "",
      villes: "",
      budgetMax: "",
      rendementMin: "",
      scoreMin: "80",
      decoteMin: "",
      typeOperation: "mdB",
    })
    setShowCreateForm(false)
  }

  const deleteAlerte = (id: number) => {
    setAlertesActives(alertesActives.filter(a => a.id !== id))
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
              <p className="text-zinc-500 dark:text-zinc-400 mt-2">Créez et gérez vos alertes personnalisées</p>
            </div>
            
            <button 
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 dark:bg-gold-500 dark:hover:bg-amber-300 text-white dark:text-black rounded-2xl transition-all"
            >
              <Plus className="w-5 h-5" />
              Nouvelle alerte
            </button>
          </div>

          {/* Formulaire de création complet */}
          {showCreateForm && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-3xl p-10 mb-12">
              <h3 className="text-xl font-medium mb-8 text-zinc-900 dark:text-white">Créer une nouvelle alerte</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <label className="block text-sm text-zinc-500 dark:text-zinc-400 mb-2">Nom de l'alerte</label>
                  <input
                    type="text"
                    value={newAlerte.titre}
                    onChange={(e) => setNewAlerte({...newAlerte, titre: e.target.value})}
                    placeholder="Ex: Paris - Haut rendement"
                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-amber-600 dark:focus:border-gold-600"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-500 dark:text-zinc-400 mb-2">Villes / Départements</label>
                  <input
                    type="text"
                    value={newAlerte.villes}
                    onChange={(e) => setNewAlerte({...newAlerte, villes: e.target.value})}
                    placeholder="Paris, Lyon, 75, 69..."
                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-amber-600 dark:focus:border-gold-600"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-500 dark:text-zinc-400 mb-2">Budget maximum (€)</label>
                  <input
                    type="number"
                    value={newAlerte.budgetMax}
                    onChange={(e) => setNewAlerte({...newAlerte, budgetMax: e.target.value})}
                    placeholder="300000"
                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-amber-600 dark:focus:border-gold-600"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-500 dark:text-zinc-400 mb-2">Rendement minimum (%)</label>
                  <input
                    type="number"
                    value={newAlerte.rendementMin}
                    onChange={(e) => setNewAlerte({...newAlerte, rendementMin: e.target.value})}
                    placeholder="7"
                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-amber-600 dark:focus:border-gold-600"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-500 dark:text-zinc-400 mb-2">Score minimum</label>
                  <input
                    type="number"
                    value={newAlerte.scoreMin}
                    onChange={(e) => setNewAlerte({...newAlerte, scoreMin: e.target.value})}
                    placeholder="80"
                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-amber-600 dark:focus:border-gold-600"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-500 dark:text-zinc-400 mb-2">Décote minimum (%)</label>
                  <input
                    type="number"
                    value={newAlerte.decoteMin}
                    onChange={(e) => setNewAlerte({...newAlerte, decoteMin: e.target.value})}
                    placeholder="10"
                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-amber-600 dark:focus:border-gold-600"
                  />
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button 
                  onClick={createAlerte}
                  className="flex-1 py-4 bg-amber-600 hover:bg-amber-700 dark:bg-gold-500 dark:hover:bg-amber-300 text-white dark:text-black font-medium rounded-2xl transition-all"
                >
                  Créer l'alerte
                </button>
                <button 
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 py-4 border border-zinc-300 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-2xl transition-all"
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

            <div className="space-y-4">
              {alertesActives.map((alerte) => (
                <div key={alerte.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-3xl p-6 flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-zinc-900 dark:text-white">{alerte.titre}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{alerte.critere}</p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-3">Dernier envoi : {alerte.dernierEnvoi}</p>
                  </div>
                  <button 
                    onClick={() => deleteAlerte(alerte.id)}
                    className="text-zinc-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Historique */}
          <div>
            <h2 className="text-2xl font-medium text-zinc-900 dark:text-white mb-6">Historique récent</h2>
            
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-3xl overflow-hidden">
              {historique.map((item) => (
                <div key={item.id} className="p-6 flex items-center justify-between border-b border-zinc-100 dark:border-white/10 last:border-none">
                  <div className="flex items-center gap-4">
                    <Bell className="w-5 h-5 text-emerald-500" />
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-white">{item.titre}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Score {item.score}</span>
                    <Link href={`/opportunites/${item.id}`} className="text-amber-600 dark:text-gold-400 hover:underline text-sm flex items-center gap-1">
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
