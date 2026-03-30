'use client'
import Sidebar from '@/components/Sidebar'
import { useSession } from 'next-auth/react'
import { User, Settings, Crown, Mail, Phone, MapPin } from 'lucide-react'
import { useState } from 'react'

export default function ProfilPage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('profil')

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-ink-deep">
      <Sidebar />

      <main className="flex-1 lg:ml-72 pt-24 pb-20 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-4xl text-zinc-900 dark:text-white mb-2">Mon Profil</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Gérez vos informations et préférences</p>

          {/* Tabs */}
          <div className="flex gap-8 border-b border-white/10 mt-12 mb-8">
            <button
              onClick={() => setActiveTab('profil')}
              className={`pb-4 text-lg font-medium border-b-2 transition-all ${activeTab === 'profil' ? 'border-gold-400 text-gold-400' : 'border-transparent text-zinc-400'}`}
            >
              Profil
            </button>
            <button
              onClick={() => setActiveTab('reglages')}
              className={`pb-4 text-lg font-medium border-b-2 transition-all ${activeTab === 'reglages' ? 'border-gold-400 text-gold-400' : 'border-transparent text-zinc-400'}`}
            >
              Réglages
            </button>
          </div>

          {activeTab === 'profil' && (
            <div className="bg-white dark:bg-zinc-900 border border-white/5 rounded-3xl p-10">
              <div className="flex items-center gap-8">
                <div className="w-24 h-24 bg-zinc-800 rounded-3xl flex items-center justify-center text-5xl">
                  👤
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-medium">{session?.user?.name}</h2>
                  <p className="text-zinc-500">{session?.user?.email}</p>
                  <div className="mt-4 inline-flex items-center gap-2 px-5 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-2xl text-sm">
                    <Crown className="w-4 h-4" />
                    Plan {session?.user?.plan || 'Découverte'}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div>
                  <label className="text-xs text-zinc-500 block mb-2">Téléphone</label>
                  <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800 px-6 py-5 rounded-2xl">
                    <Phone className="w-5 h-5 text-zinc-400" />
                    <span className="text-zinc-400">Non renseigné</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-zinc-500 block mb-2">Ville</label>
                  <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800 px-6 py-5 rounded-2xl">
                    <MapPin className="w-5 h-5 text-zinc-400" />
                    <span className="text-zinc-400">Non renseigné</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reglages' && (
            <div className="bg-white dark:bg-zinc-900 border border-white/5 rounded-3xl p-10">
              <h3 className="text-xl font-medium mb-8">Réglages du compte</h3>
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Notifications email</p>
                    <p className="text-sm text-zinc-500">Recevoir les alertes et nouvelles opportunités</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-gold-400" />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Mode sombre automatique</p>
                    <p className="text-sm text-zinc-500">Activer selon l’heure du jour</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 accent-gold-400" />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
