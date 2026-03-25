'use client'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import { ArrowLeft, Calculator, TrendingUp, DollarSign } from 'lucide-react'
import { useState } from 'react'

export default function SimulateurPage() {
  const [prixAchat, setPrixAchat] = useState(185000)
  const [loyerMensuel, setLoyerMensuel] = useState(980)
  const [travaux, setTravaux] = useState(28000)
  const [fraisNotaire, setFraisNotaire] = useState(14000)

  const loyerAnnuel = loyerMensuel * 12
  const rendementBrut = prixAchat > 0 ? (loyerAnnuel / prixAchat) * 100 : 0
  const coutTotal = prixAchat + travaux + fraisNotaire
  const margeMdbEstimee = Math.max(0, Math.round((prixAchat * 0.82) - coutTotal)) // estimation conservative

  return (
    <div className="flex min-h-screen bg-ink-deep">
      <Sidebar />

      <main className="flex-1 lg:ml-72 pt-24 pb-20 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          
          {/* En-tête */}
          <div className="flex items-center gap-4 mb-12">
            <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="font-display text-4xl text-white tracking-tight">Simulateur de rentabilité</h1>
              <p className="text-zinc-400 mt-1">Estimez rapidement la performance de votre projet</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-10">
            
            {/* Formulaire */}
            <div className="lg:col-span-7 bg-zinc-900/70 border border-white/5 rounded-3xl p-10">
              <div className="flex items-center gap-3 mb-10">
                <Calculator className="w-6 h-6 text-gold-400" />
                <h2 className="text-2xl font-medium text-white">Paramètres du projet</h2>
              </div>

              <div className="space-y-10">
                <div>
                  <label className="block text-sm text-zinc-400 mb-3">Prix d'achat du bien</label>
                  <div className="relative">
                    <span className="absolute left-6 top-4 text-zinc-500">€</span>
                    <input
                      type="number"
                      value={prixAchat}
                      onChange={(e) => setPrixAchat(Number(e.target.value))}
                      className="w-full bg-zinc-950 border border-white/10 rounded-2xl px-12 py-5 text-3xl font-medium focus:outline-none focus:border-gold-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-3">Loyer mensuel estimé</label>
                    <div className="relative">
                      <span className="absolute left-6 top-4 text-zinc-500">€</span>
                      <input
                        type="number"
                        value={loyerMensuel}
                        onChange={(e) => setLoyerMensuel(Number(e.target.value))}
                        className="w-full bg-zinc-950 border border-white/10 rounded-2xl px-12 py-5 text-3xl font-medium focus:outline-none focus:border-gold-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-3">Montant des travaux</label>
                    <div className="relative">
                      <span className="absolute left-6 top-4 text-zinc-500">€</span>
                      <input
                        type="number"
                        value={travaux}
                        onChange={(e) => setTravaux(Number(e.target.value))}
                        className="w-full bg-zinc-950 border border-white/10 rounded-2xl px-12 py-5 text-3xl font-medium focus:outline-none focus:border-gold-600"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-3">Frais de notaire estimés</label>
                  <div className="relative">
                    <span className="absolute left-6 top-4 text-zinc-500">€</span>
                    <input
                      type="number"
                      value={fraisNotaire}
                      onChange={(e) => setFraisNotaire(Number(e.target.value))}
                      className="w-full bg-zinc-950 border border-white/10 rounded-2xl px-12 py-5 text-3xl font-medium focus:outline-none focus:border-gold-600"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Résultats */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-gold-700/30 rounded-3xl p-10 sticky top-28">
                <div className="flex items-center gap-3 mb-8">
                  <TrendingUp className="w-6 h-6 text-gold-400" />
                  <h3 className="text-gold-400 tracking-widest text-sm">RÉSULTATS ESTIMÉS</h3>
                </div>

                <div className="space-y-10">
                  <div>
                    <p className="text-zinc-400">Rendement brut annuel</p>
                    <p className="text-6xl font-semibold text-emerald-400 mt-2">
                      {rendementBrut.toFixed(1)}%
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-zinc-400 text-sm">Rendement net estimé</p>
                      <p className="text-4xl font-semibold text-white mt-1">7,1 %</p>
                    </div>
                    <div>
                      <p className="text-zinc-400 text-sm">Marge MdB estimée</p>
                      <p className="text-4xl font-semibold text-gold-400 mt-1">
                        {margeMdbEstimee.toLocaleString()} €
                      </p>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/10">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-zinc-400">Coût total estimé</span>
                      <span className="text-white">{coutTotal.toLocaleString()} €</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Prix au m²</span>
                      <span className="text-white">{Math.round(prixAchat / 62)} €/m²</span>
                    </div>
                  </div>
                </div>

                <button className="mt-12 w-full py-5 bg-gold-500 hover:bg-amber-300 text-black font-medium rounded-2xl transition-all text-lg">
                  Enregistrer cette simulation
                </button>

                <p className="text-center text-xs text-zinc-500 mt-6">
                  Ces estimations sont indicatives. Une analyse complète sera disponible prochainement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
