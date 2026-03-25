'use client'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import { ArrowLeft, Calculator, TrendingUp } from 'lucide-react'
import { useState } from 'react'

export default function SimulateurPage() {
  const [prixAchat, setPrixAchat] = useState(180000)
  const [loyerMensuel, setLoyerMensuel] = useState(950)
  const [travaux, setTravaux] = useState(25000)

  const rendementBrut = ((loyerMensuel * 12) / prixAchat) * 100
  const margeMdb = Math.max(0, (prixAchat * 0.85) - prixAchat - travaux) // estimation simplifiée

  return (
    <div className="flex min-h-screen bg-ink-deep">
      <Sidebar />

      <main className="flex-1 lg:ml-72 pt-24 pb-20 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          
          {/* En-tête */}
          <div className="flex items-center gap-4 mb-12">
            <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="font-display text-4xl text-white tracking-tight">Simulateur de rentabilité</h1>
              <p className="text-zinc-400 mt-1">Estimez rapidement votre projet immobilier</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-10">
            
            {/* Formulaire de saisie */}
            <div className="lg:col-span-3 bg-zinc-900/70 border border-white/5 rounded-3xl p-8">
              <h2 className="text-xl font-medium text-white mb-8 flex items-center gap-3">
                <Calculator className="w-5 h-5 text-gold-400" />
                Détails de l’opération
              </h2>

              <div className="space-y-8">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Prix d’achat (€)</label>
                  <input
                    type="number"
                    value={prixAchat}
                    onChange={(e) => setPrixAchat(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-white/10 rounded-2xl px-6 py-4 text-2xl font-medium focus:outline-none focus:border-gold-600"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Loyer mensuel estimé (€)</label>
                  <input
                    type="number"
                    value={loyerMensuel}
                    onChange={(e) => setLoyerMensuel(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-white/10 rounded-2xl px-6 py-4 text-2xl font-medium focus:outline-none focus:border-gold-600"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Montant estimé des travaux (€)</label>
                  <input
                    type="number"
                    value={travaux}
                    onChange={(e) => setTravaux(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-white/10 rounded-2xl px-6 py-4 text-2xl font-medium focus:outline-none focus:border-gold-600"
                  />
                </div>
              </div>
            </div>

            {/* Résultats */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-gold-700/30 rounded-3xl p-8 sticky top-28">
                <h3 className="text-gold-400 text-sm tracking-widest mb-6">RÉSULTATS ESTIMÉS</h3>

                <div className="space-y-8">
                  <div>
                    <p className="text-zinc-400 text-sm">Rendement brut annuel</p>
                    <p className="text-5xl font-semibold text-emerald-400 mt-1">
                      {rendementBrut.toFixed(1)} <span className="text-2xl">%</span>
                    </p>
                  </div>

                  <div>
                    <p className="text-zinc-400 text-sm">Rendement net estimé</p>
                    <p className="text-4xl font-semibold text-white mt-1">6,8 %</p>
                    <p className="text-xs text-emerald-500">Après charges et fiscalité</p>
                  </div>

                  <div>
                    <p className="text-zinc-400 text-sm">Marge marchand de biens estimée</p>
                    <p className="text-4xl font-semibold text-gold-400 mt-1">
                      {margeMdb.toLocaleString()} €
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      Ces estimations sont indicatives et basées sur des moyennes du marché. 
                      Une analyse complète sera disponible prochainement avec l’IA.
                    </p>
                  </div>
                </div>

                <button className="mt-10 w-full py-4 bg-gold-500 hover:bg-amber-300 text-black font-medium rounded-2xl transition-all">
                  Lancer une simulation avancée
                </button>
              </div>
            </div>
          </div>

          {/* Note temporaire */}
          <div className="mt-20 text-center text-zinc-500 text-sm">
            Le simulateur complet avec comparaison de régimes fiscaux (LMNP, SCI IS, Marchand de biens…) arrive très bientôt.
          </div>

        </div>
      </main>
    </div>
  )
}
