'use client'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import { ArrowLeft, Calculator, TrendingUp } from 'lucide-react'
import { useState } from 'react'

export default function SimulateurPage() {
  const [prixAchat, setPrixAchat] = useState<number | ''>('')
  const [loyerMensuel, setLoyerMensuel] = useState<number | ''>('')
  const [travaux, setTravaux] = useState<number | ''>('')
  const [fraisNotaire, setFraisNotaire] = useState<number | ''>('')
  const [chargesAnnuel, setChargesAnnuel] = useState<number | ''>('')

  const loyerAnnuel = typeof loyerMensuel === 'number' ? loyerMensuel * 12 : 0
  const rendementBrut = typeof prixAchat === 'number' && prixAchat > 0 
    ? (loyerAnnuel / prixAchat) * 100 
    : 0

  const coutTotalAcquisition = (typeof prixAchat === 'number' ? prixAchat : 0) + (typeof fraisNotaire === 'number' ? fraisNotaire : 0)
  const coutTotalProjet = coutTotalAcquisition + (typeof travaux === 'number' ? travaux : 0)
  const revenuNetAnnuel = loyerAnnuel - (typeof chargesAnnuel === 'number' ? chargesAnnuel : 0)
  const rendementNet = coutTotalAcquisition > 0 ? (revenuNetAnnuel / coutTotalAcquisition) * 100 : 0
  const margeMdbEstimee = Math.max(0, Math.round((typeof prixAchat === 'number' ? prixAchat * 0.83 : 0) - coutTotalProjet))

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-ink-deep">
      <Sidebar />

      <main className="flex-1 lg:ml-72 pt-24 pb-20 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          
          {/* En-tête */}
          <div className="flex items-center gap-4 mb-12">
            <Link href="/dashboard" className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="font-display text-4xl text-zinc-900 dark:text-white tracking-tight">Simulateur de rentabilité</h1>
              <p className="text-zinc-500 dark:text-zinc-400 mt-1">Calculez précisément votre projet en quelques secondes</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Formulaire */}
            <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-3xl p-10">
              <div className="flex items-center gap-3 mb-10">
                <Calculator className="w-6 h-6 text-amber-600 dark:text-gold-400" />
                <h2 className="text-2xl font-medium text-zinc-900 dark:text-white">Détails du projet</h2>
              </div>

              <div className="space-y-10">
                <div>
                  <label className="block text-sm text-zinc-500 dark:text-zinc-400 mb-3">Prix d'achat du bien (€)</label>
                  <input
                    type="number"
                    value={prixAchat}
                    onChange={(e) => setPrixAchat(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="Ex: 185000"
                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-5 text-3xl font-medium focus:outline-none focus:border-amber-600 dark:focus:border-gold-600 text-zinc-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm text-zinc-500 dark:text-zinc-400 mb-3">Loyer mensuel estimé (€)</label>
                    <input
                      type="number"
                      value={loyerMensuel}
                      onChange={(e) => setLoyerMensuel(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="Ex: 980"
                      className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-5 text-3xl font-medium focus:outline-none focus:border-amber-600 dark:focus:border-gold-600 text-zinc-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-500 dark:text-zinc-400 mb-3">Montant des travaux (€)</label>
                    <input
                      type="number"
                      value={travaux}
                      onChange={(e) => setTravaux(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="Ex: 28000"
                      className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-5 text-3xl font-medium focus:outline-none focus:border-amber-600 dark:focus:border-gold-600 text-zinc-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm text-zinc-500 dark:text-zinc-400 mb-3">Frais de notaire (€)</label>
                    <input
                      type="number"
                      value={fraisNotaire}
                      onChange={(e) => setFraisNotaire(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="Ex: 14200"
                      className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-5 text-3xl font-medium focus:outline-none focus:border-amber-600 dark:focus:border-gold-600 text-zinc-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-500 dark:text-zinc-400 mb-3">Charges annuelles (€)</label>
                    <input
                      type="number"
                      value={chargesAnnuel}
                      onChange={(e) => setChargesAnnuel(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="Ex: 3200"
                      className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-5 text-3xl font-medium focus:outline-none focus:border-amber-600 dark:focus:border-gold-600 text-zinc-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Résultats */}
            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-gold-700/30 rounded-3xl p-10 sticky top-28">
                <div className="flex items-center gap-3 mb-10">
                  <TrendingUp className="w-6 h-6 text-amber-600 dark:text-gold-400" />
                  <h3 className="text-amber-600 dark:text-gold-400 tracking-widest text-sm">RÉSULTATS DÉTAILLÉS</h3>
                </div>

                <div className="space-y-10">
                  <div>
                    <p className="text-zinc-500 dark:text-zinc-400">Rendement brut annuel</p>
                    <p className="text-6xl font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                      {rendementBrut.toFixed(1)}%
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-10">
                    <div>
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm">Rendement net estimé</p>
                      <p className="text-4xl font-semibold text-zinc-900 dark:text-white mt-1">{rendementNet.toFixed(1)} %</p>
                    </div>
                    <div>
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm">Marge MdB estimée</p>
                      <p className="text-4xl font-semibold text-amber-600 dark:text-gold-400 mt-1">
                        {margeMdbEstimee.toLocaleString()} €
                      </p>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-zinc-200 dark:border-white/10 space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-500 dark:text-zinc-400">Coût total du projet</span>
                      <span className="text-zinc-900 dark:text-white font-medium">{coutTotalProjet.toLocaleString()} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 dark:text-zinc-400">Revenu net annuel</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">{revenuNetAnnuel.toLocaleString()} €</span>
                    </div>
                  </div>
                </div>

                <button className="mt-12 w-full py-5 bg-amber-600 hover:bg-amber-700 dark:bg-gold-500 dark:hover:bg-amber-300 text-white dark:text-black font-medium rounded-2xl transition-all text-lg">
                  Sauvegarder cette simulation
                </button>

                <p className="text-center text-xs text-zinc-500 dark:text-zinc-400 mt-8">
                  Simulation indicative • L’analyse fiscale complète arrive bientôt
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
