'use client'
import Sidebar from '@/components/Sidebar'
import { Bell, Calendar, ArrowRight } from 'lucide-react'
import { useState } from 'react'

export default function AlertesPage() {
  const [alertesActives, setAlertesActives] = useState([
    { id: 1, titre: "Paris - Score > 85", critere: "Rendement > 7% | Budget < 300k €", active: true, dernierEnvoi: "Il y a 2h" },
    { id: 2, titre: "Lyon - Décote > 15%", critere: "Marge MdB > 40k €", active: true, dernierEnvoi: "Hier" },
  ])

  const [historique, setHistorique] = useState([
    { id: 101, titre: "Opportunité Paris 11ème - Score 91", date: "25 mars 2026", score: 91 },
    { id: 102, titre: "Opportunité Lyon 3ème - Score 87", date: "24 mars 2026", score: 87 },
    { id: 103, titre: "Opportunité Marseille - Score 94", date: "23 mars 2026", score: 94 },
  ])

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-ink-deep">
      <Sidebar />

      <main className="flex-1 lg:ml-72 pt-24 pb-20 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">
          
          {/* En-tête */}
          <div className="mb-12">
            <h1 className="font-display text-4xl text-zinc-900 dark:text-white tracking-tight">Mes Alertes</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2">Gérez vos alertes et consultez l’historique</p>
          </div>

          {/* Alertes actives */}
          <div className="mb-16">
            <h2 className="text-2xl font-medium text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
              <Bell className="w-6 h-6 text-amber-600 dark:text-gold-400" />
              Alertes actives
            </h2>

            <div className="space-y-4">
              {alertesActives.map((alerte) => (
                <div key={alerte.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-3xl p-6 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-white">{alerte.titre}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{alerte.critere}</p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">Dernier envoi : {alerte.dernierEnvoi}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-4 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-medium rounded-full">
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Historique des alertes */}
          <div>
            <h2 className="text-2xl font-medium text-zinc-900 dark:text-white mb-6">Historique des alertes</h2>
            
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-3xl overflow-hidden">
              {historique.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`p-6 flex items-center justify-between border-b border-zinc-100 dark:border-white/10 last:border-b-0 ${index !== historique.length - 1 ? 'border-b' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center">
                      <Bell className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-white">{item.titre}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">Score {item.score}</span>
                    </div>
                    <Link href={`/opportunites/${item.id}`} className="text-amber-600 dark:text-gold-400 hover:underline text-sm flex items-center gap-1">
                      Voir <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message temporaire */}
          <div className="mt-16 text-center text-zinc-500 dark:text-zinc-400 text-sm">
            La configuration avancée des alertes (fréquence, critères précis, notification email) arrive bientôt.
          </div>

        </div>
      </main>
    </div>
  )
}
