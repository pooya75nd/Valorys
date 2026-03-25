'use client'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import { ArrowLeft, Star, TrendingUp, Target, Calendar, MapPin, Euro } from 'lucide-react'

export default function OpportuniteDetail({ params }: { params: { id: string } }) {
  const opportunite = {
    id: params.id,
    ville: "Paris 11ème",
    adresse: "Rue de la Roquette, 75011 Paris",
    surface: "62 m²",
    pieces: "3 pièces",
    etage: "3ème étage avec ascenseur",
    prix: 184000,
    prixM2: 2968,
    score: 91,
    decote: 18,
    rendementNet: 8.7,
    margeMdb: 51000,
    potentielValorisation: 31,
    dateDetection: "25 mars 2026",
    description: "Bel appartement traversant lumineux avec balcon. Idéal pour marchand de biens ou investissement locatif. Travaux de rénovation nécessaires mais à fort potentiel de valorisation.",
  }

  return (
    <div className="flex min-h-screen bg-ink-deep">
      <Sidebar />

      <main className="flex-1 lg:ml-72 pt-24 pb-20 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Bouton retour */}
          <Link href="/opportunites" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-10 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Retour aux opportunités
          </Link>

          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Colonne principale */}
            <div className="lg:col-span-8">
              <div className="bg-zinc-900/70 border border-white/5 rounded-3xl overflow-hidden">
                
                {/* Image principale */}
                <div className="h-[420px] bg-zinc-800 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-[120px] opacity-10">🏠</div>
                  
                  <div className="absolute top-8 right-8 bg-emerald-500 text-black font-semibold px-6 py-2.5 rounded-2xl shadow-lg">
                    Score IA : {opportunite.score}
                  </div>

                  <div className="absolute bottom-8 left-8 bg-black/80 px-6 py-3 rounded-2xl flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gold-400" />
                    <span className="text-white">{opportunite.adresse}</span>
                  </div>
                </div>

                <div className="p-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-4xl font-medium text-white">{opportunite.ville}</h1>
                      <p className="text-zinc-400 mt-2">{opportunite.surface} • {opportunite.pieces} • {opportunite.etage}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-5xl font-semibold text-white">{opportunite.prix.toLocaleString()} €</p>
                      <p className="text-sm text-zinc-500">{opportunite.prixM2} €/m²</p>
                    </div>
                  </div>

                  {/* Métriques clés */}
                  <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                      <p className="text-xs text-zinc-500">RENDEMENT NET</p>
                      <p className="text-4xl font-semibold text-emerald-400 mt-2">{opportunite.rendementNet} %</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">MARGE MDB</p>
                      <p className="text-4xl font-semibold text-gold-400 mt-2">{opportunite.margeMdb.toLocaleString()} €</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">DÉCOTE</p>
                      <p className="text-4xl font-semibold text-emerald-400 mt-2">- {opportunite.decote} %</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">VALORISATION</p>
                      <p className="text-4xl font-semibold text-amber-400 mt-2">+ {opportunite.potentielValorisation} %</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-14">
                    <h3 className="text-xl font-medium text-white mb-5">Pourquoi cette opportunité est intéressante</h3>
                    <p className="text-zinc-400 leading-relaxed text-[15px]">
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
                <h3 className="flex items-center gap-3 text-lg font-medium mb-8">
                  <Star className="w-5 h-5 text-gold-400" />
                  Analyse IA
                </h3>
                
                <div className="space-y-6">
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-zinc-400">Décote par rapport au marché</span>
                    <span className="text-emerald-400 font-medium">-18 %</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-zinc-400">Potentiel de valorisation 24 mois</span>
                    <span className="text-white">+31 %</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-zinc-400">Liquidité estimée</span>
                    <span className="text-amber-400">Moyenne +</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-zinc-400">Date de détection</span>
                    <span className="text-white flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {opportunite.dateDetection}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-zinc-900/70 border border-white/5 rounded-3xl p-8">
                <h3 className="text-lg font-medium mb-6">Que voulez-vous faire ?</h3>
                
                <div className="space-y-4">
                  <button className="w-full py-5 bg-gold-500 hover:bg-amber-300 text-black font-medium rounded-2xl transition-all text-lg">
                    Ajouter aux favoris
                  </button>
                  
                  <Link href="/simulateur" className="block w-full py-5 text-center border border-gold-700/50 hover:bg-gold-700/10 rounded-2xl transition-all text-lg">
                    Simuler ce bien
                  </Link>

                  <button className="w-full py-5 border border-white/10 hover:bg-white/5 rounded-2xl transition-all text-zinc-400">
                    Exporter le rapport PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
