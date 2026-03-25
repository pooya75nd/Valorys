'use client'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import { ArrowLeft, Star, TrendingUp, Target, Calendar } from 'lucide-react'

export default function OpportuniteDetail({ params }: { params: { id: string } }) {
  // Données fictives pour l'exemple (on les remplacera plus tard par de vraies données)
  const opportunite = {
    id: params.id,
    ville: "Paris 11ème",
    adresse: "Rue de la Roquette",
    surface: "62 m²",
    pieces: "3 pièces",
    prix: 184000,
    prixM2: 2968,
    score: 91,
    decote: 18,
    rendementNet: 8.7,
    margeMdb: 51000,
    dateDetection: "25 mars 2026",
    description: "Appartement traversant au 3ème étage avec balcon. Idéal pour marchand de biens ou location longue durée. Fort potentiel de valorisation après travaux.",
  }

  return (
    <div className="flex min-h-screen bg-ink-deep">
      <Sidebar />

      <main className="flex-1 lg:ml-72 pt-24 pb-20 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          
          {/* Bouton retour */}
          <Link href="/opportunites" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Retour aux opportunités
          </Link>

          <div className="grid lg:grid-cols-12 gap-10">
            
            {/* Colonne principale */}
            <div className="lg:col-span-8">
              <div className="bg-zinc-900/70 border border-white/5 rounded-3xl overflow-hidden">
                {/* Image principale */}
                <div className="h-96 bg-zinc-800 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-10">
                    🏠
                  </div>
                  <div className="absolute top-8 right-8 bg-emerald-500 text-black font-semibold px-6 py-2 rounded-2xl">
                    Score IA : {opportunite.score}
                  </div>
                </div>

                <div className="p-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-4xl font-medium text-white">{opportunite.ville}</h1>
                      <p className="text-zinc-400 mt-1">{opportunite.adresse} • {opportunite.surface} • {opportunite.pieces}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-5xl font-semibold text-white">{opportunite.prix.toLocaleString()} €</p>
                      <p className="text-sm text-zinc-500">{opportunite.prixM2} €/m²</p>
                    </div>
                  </div>

                  <div className="mt-10 grid grid-cols-3 gap-8">
                    <div>
                      <p className="text-xs text-zinc-500">RENDEMENT NET</p>
                      <p className="text-3xl font-semibold text-emerald-400 mt-1">{opportunite.rendementNet} %</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">MARGE MDB</p>
                      <p className="text-3xl font-semibold text-gold-400 mt-1">{opportunite.margeMdb.toLocaleString()} €</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">DÉCOTE MARCHÉ</p>
                      <p className="text-3xl font-semibold text-emerald-400 mt-1">- {opportunite.decote} %</p>
                    </div>
                  </div>

                  <div className="mt-12">
                    <h3 className="text-lg font-medium text-white mb-4">Pourquoi cette opportunité est intéressante ?</h3>
                    <p className="text-zinc-400 leading-relaxed">
                      {opportunite.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne latérale */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Carte Score détaillé */}
              <div className="bg-zinc-900/70 border border-white/5 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Star className="w-6 h-6 text-gold-400" />
                  <h3 className="text-xl font-medium">Analyse IA</h3>
                </div>
                <div className="space-y-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Décote par rapport au marché</span>
                    <span className="text-emerald-400 font-medium">-18 %</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Potentiel de valorisation</span>
                    <span className="text-white">+31 % en 24 mois</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Liquidité estimée</span>
                    <span className="text-amber-400">Moyenne</span>
                  </div>
                </div>
              </div>

              {/* Carte Actions */}
              <div className="bg-zinc-900/70 border border-white/5 rounded-3xl p-8">
                <h3 className="text-lg font-medium mb-6">Actions rapides</h3>
                <div className="space-y-4">
                  <button className="w-full py-4 bg-gold-500 hover:bg-amber-300 text-black font-medium rounded-2xl transition-all">
                    Ajouter aux favoris
                  </button>
                  <button className="w-full py-4 border border-gold-700/50 hover:bg-gold-700/10 rounded-2xl transition-all">
                    Lancer la simulation complète
                  </button>
                  <button className="w-full py-4 border border-white/10 hover:bg-white/5 rounded-2xl transition-all text-zinc-400">
                    Exporter l’analyse
                  </button>
                </div>
              </div>

              {/* Info détection */}
              <div className="flex items-center gap-3 text-xs text-zinc-500">
                <Calendar className="w-4 h-4" />
                Détectée le {opportunite.dateDetection}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
