'use client'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import { ArrowLeft, Star, Calendar, MapPin, Heart } from 'lucide-react'

const opportunites = [
  { id: 1, ville: "Paris 11ème", adresse: "Rue de la Roquette, 75011 Paris", surface: "62 m²", pieces: "3 pièces", etage: "3ème étage avec ascenseur", prix: 184000, prixM2: 2968, score: 91, decote: 18, rendementNet: 8.7, margeMdb: 51000, potentielValorisation: 31, dateDetection: "25 mars 2026", description: "Bel appartement traversant lumineux avec balcon. Idéal pour marchand de biens ou investissement locatif. Travaux de rénovation nécessaires mais à fort potentiel de valorisation." },
  { id: 2, ville: "Lyon 3ème", adresse: "Rue Garibaldi, 69003 Lyon", surface: "78 m²", pieces: "4 pièces", etage: "2ème étage sans ascenseur", prix: 245000, prixM2: 3141, score: 87, decote: 14, rendementNet: 7.9, margeMdb: 68000, potentielValorisation: 24, dateDetection: "24 mars 2026", description: "Grand appartement familial dans quartier recherché. Bonne rentabilité locative avec loyers en hausse constante sur le secteur." },
  { id: 3, ville: "Marseille 6ème", adresse: "Rue Paradis, 13006 Marseille", surface: "55 m²", pieces: "2 pièces", etage: "4ème étage avec ascenseur", prix: 152000, prixM2: 2763, score: 94, decote: 22, rendementNet: 9.2, margeMdb: 39000, potentielValorisation: 35, dateDetection: "23 mars 2026", description: "Opportunité exceptionnelle dans le 6ème arrondissement. Forte décote par rapport au marché, idéal pour revente rapide après travaux." },
  { id: 4, ville: "Bordeaux Centre", adresse: "Rue Sainte-Catherine, 33000 Bordeaux", surface: "71 m²", pieces: "3 pièces", etage: "1er étage", prix: 219000, prixM2: 3084, score: 82, decote: 11, rendementNet: 7.4, margeMdb: 45000, potentielValorisation: 19, dateDetection: "22 mars 2026", description: "Appartement en hypercentre avec forte demande locative. Quartier piéton très prisé des étudiants et jeunes actifs." },
  { id: 5, ville: "Lille Centre", adresse: "Rue de la Monnaie, 59000 Lille", surface: "68 m²", pieces: "3 pièces", etage: "2ème étage avec ascenseur", prix: 178000, prixM2: 2617, score: 89, decote: 16, rendementNet: 8.1, margeMdb: 47000, potentielValorisation: 27, dateDetection: "21 mars 2026", description: "Belle opportunité dans le Vieux-Lille. Secteur en forte tension locative avec rendements attractifs et potentiel de plus-value." },
]

export default function OpportuniteDetail({ params }: { params: { id: string } }) {
  const opp = opportunites.find(o => o.id === Number(params.id))

  if (!opp) {
    return (
      <div className="flex min-h-screen bg-zinc-50 dark:bg-ink-deep">
        <Sidebar />
        <main className="flex-1 lg:ml-72 pt-24 pb-20 px-6 flex items-center justify-center">
          <div className="text-center">
            <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-4">Opportunité introuvable.</p>
            <Link href="/opportunites" className="text-amber-600 dark:text-gold-400 hover:underline">
              Retour aux opportunités
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-ink-deep">
      <Sidebar />

      <main className="flex-1 lg:ml-72 pt-24 pb-20 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">

          <Link href="/opportunites" className="inline-flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white mb-10 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Retour aux opportunités
          </Link>

          <div className="grid lg:grid-cols-12 gap-12">

            {/* Colonne principale */}
            <div className="lg:col-span-8">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-3xl overflow-hidden">

                <div className="h-[420px] bg-zinc-100 dark:bg-zinc-800 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-[120px] opacity-10">🏠</div>

                  <div className="absolute top-8 right-8 bg-emerald-500 text-white font-semibold px-6 py-2.5 rounded-2xl shadow-lg">
                    Score IA : {opp.score}
                  </div>

                  <div className="absolute bottom-8 left-8 bg-white/80 dark:bg-black/70 px-6 py-3 rounded-2xl flex items-center gap-3 text-zinc-900 dark:text-white">
                    <MapPin className="w-5 h-5" />
                    <span>{opp.adresse}</span>
                  </div>
                </div>

                <div className="p-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-4xl font-medium text-zinc-900 dark:text-white">{opp.ville}</h1>
                      <p className="text-zinc-500 dark:text-zinc-400 mt-2">{opp.surface} • {opp.pieces} • {opp.etage}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-5xl font-semibold text-zinc-900 dark:text-white">{opp.prix.toLocaleString()} €</p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">{opp.prixM2} €/m²</p>
                    </div>
                  </div>

                  <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">RENDEMENT NET</p>
                      <p className="text-4xl font-semibold text-emerald-600 dark:text-emerald-400 mt-2">{opp.rendementNet} %</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">MARGE MDB</p>
                      <p className="text-4xl font-semibold text-amber-600 dark:text-gold-400 mt-2">{opp.margeMdb.toLocaleString()} €</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">DÉCOTE</p>
                      <p className="text-4xl font-semibold text-emerald-600 dark:text-emerald-400 mt-2">- {opp.decote} %</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">VALORISATION</p>
                      <p className="text-4xl font-semibold text-amber-600 dark:text-amber-400 mt-2">+ {opp.potentielValorisation} %</p>
                    </div>
                  </div>

                  <div className="mt-14">
                    <h3 className="text-xl font-medium text-zinc-900 dark:text-white mb-5">Pourquoi cette opportunité est intéressante</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[15px]">{opp.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne latérale */}
            <div className="lg:col-span-4 space-y-8">

              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-3xl p-8">
                <h3 className="flex items-center gap-3 text-lg font-medium mb-8 text-zinc-900 dark:text-white">
                  <Star className="w-5 h-5 text-amber-600 dark:text-gold-400" />
                  Analyse IA
                </h3>

                <div className="space-y-6 text-sm">
                  <div className="flex justify-between py-3 border-b border-zinc-100 dark:border-white/10">
                    <span className="text-zinc-500 dark:text-zinc-400">Décote par rapport au marché</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">-{opp.decote} %</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-zinc-100 dark:border-white/10">
                    <span className="text-zinc-500 dark:text-zinc-400">Potentiel valorisation 24 mois</span>
                    <span className="text-zinc-900 dark:text-white">+{opp.potentielValorisation} %</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-zinc-100 dark:border-white/10">
                    <span className="text-zinc-500 dark:text-zinc-400">Liquidité estimée</span>
                    <span className="text-amber-600 dark:text-amber-400">Moyenne +</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-zinc-500 dark:text-zinc-400">Date de détection</span>
                    <span className="text-zinc-900 dark:text-white flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {opp.dateDetection}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-3xl p-8">
                <h3 className="text-lg font-medium mb-6 text-zinc-900 dark:text-white">Que voulez-vous faire ?</h3>

                <div className="space-y-4">
                  <button className="w-full py-5 bg-amber-600 hover:bg-amber-700 dark:bg-gold-500 dark:hover:bg-amber-300 text-white dark:text-black font-medium rounded-2xl transition-all text-lg flex items-center justify-center gap-2">
                    <Heart className="w-5 h-5" /> Ajouter aux favoris
                  </button>

                  <Link href={`/simulateur?prix=${opp.prix}&ville=${opp.ville}`} className="block w-full py-5 text-center border border-amber-600/30 dark:border-gold-700/50 hover:bg-amber-50 dark:hover:bg-gold-700/10 rounded-2xl transition-all text-lg text-zinc-900 dark:text-white">
                    Simuler ce bien
                  </Link>

                  <button className="w-full py-5 border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-2xl transition-all text-zinc-600 dark:text-zinc-400">
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
