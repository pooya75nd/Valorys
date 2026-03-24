'use client'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, LogOut, LayoutDashboard, Bell, Heart } from 'lucide-react'

export function Header() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const planBadge: Record<string, { label: string; color: string }> = {
    DECOUVERTE: { label: 'Découverte', color: 'text-zinc-400 border-zinc-700' },
    INVESTISSEUR: { label: 'Investisseur', color: 'text-blue-400 border-blue-800' },
    MARCHAND: { label: 'Marchand', color: 'text-gold-500 border-gold-800' },
    PRO: { label: 'Pro', color: 'text-gold-300 border-gold-600' },
  }

  const plan = session?.user?.plan ?? 'DECOUVERTE'
  const badge = planBadge[plan]

  // Cache le lien Tarifs quand on est sur /pricing ou /login et qu'on n'est pas connecté
  const isPublicPage = pathname === '/pricing' || pathname === '/login'
  const showPricingLink = !isPublicPage || !!session

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-ink-deep/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <svg width="36" height="36" viewBox="0 0 96 96" fill="none">
            <defs>
              <linearGradient id="hGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f0d68a"/>
                <stop offset="100%" stopColor="#9a7230"/>
              </linearGradient>
            </defs>
            <rect width="96" height="96" rx="22" fill="#0d0d14"/>
            <polygon points="48,8 82,28 82,68 48,88 14,68 14,28" fill="none" stroke="#c9a96e" strokeWidth="1.5" opacity="0.5"/>
            <polyline points="26,30 48,70 70,30" fill="none" stroke="url(#hGold)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-display text-xl font-semibold text-gold-400 group-hover:text-gold-300 transition-colors tracking-wide">
            VALORYS
          </span>
        </Link>

        {/* Navigation principale (seulement pour les utilisateurs connectés) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-light tracking-wide">
          {session && (
            <>
              <Link href="/opportunites" className="text-zinc-400 hover:text-gold-400 transition-colors">Opportunités</Link>
              <Link href="/simulateur" className="text-zinc-400 hover:text-gold-400 transition-colors">Simulateur</Link>
            </>
          )}
        </nav>

        {/* Partie droite : Tarifs + Connexion + Commencer */}
        <div className="hidden md:flex items-center gap-4">
          {session ? (
            // Utilisateur connecté
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 hover:border-gold-700/50 transition-all"
              >
                {session.user?.image && <img src={session.user.image} alt="" className="w-6 h-6 rounded-full" />}
                <span className="text-sm text-zinc-300 max-w-[120px] truncate">
                  {session.user?.name?.split(' ')[0]}
                </span>
                <span className={`text-xs border rounded px-1.5 py-0.5 font-light ${badge.color}`}>
                  {badge.label}
                </span>
                <ChevronDown className="w-3 h-3 text-zinc-500" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                  <Link href="/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:bg-white/5 hover:text-gold-400 transition-colors">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                  <Link href="/dashboard/alertes" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:bg-white/5 hover:text-gold-400 transition-colors">
                    <Bell className="w-4 h-4" /> Mes alertes
                  </Link>
                  <Link href="/dashboard/favoris" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:bg-white/5 hover:text-gold-400 transition-colors">
                    <Heart className="w-4 h-4" /> Favoris
                  </Link>
                  <div className="border-t border-white/5 mt-1" />
                  <button onClick={() => signOut()} className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-500 hover:bg-white/5 hover:text-red-400 transition-colors w-full text-left">
                    <LogOut className="w-4 h-4" /> Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Utilisateur NON connecté
            <>
              {showPricingLink && (
                <Link href="/pricing" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors px-4 py-2">
                  Tarifs
                </Link>
              )}
              <Link href="/login" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors px-4 py-2">
                Connexion
              </Link>
              <Link 
                href="/login" 
                className="text-sm px-6 py-2.5 bg-gold-700/20 border border-gold-700/40 text-gold-400 rounded-lg hover:bg-gold-700/30 transition-all"
              >
                Commencer gratuitement
              </Link>
            </>
          )}
        </div>

        {/* Bouton menu mobile */}
        <button 
          className="md:hidden text-zinc-400" 
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menu Mobile */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/5 bg-ink-deep px-6 py-6 flex flex-col gap-5 text-sm">
          {session ? (
            <>
              <Link href="/opportunites" onClick={() => setMobileOpen(false)} className="text-zinc-400 hover:text-gold-400">Opportunités</Link>
              <Link href="/simulateur" onClick={() => setMobileOpen(false)} className="text-zinc-400 hover:text-gold-400">Simulateur</Link>
            </>
          ) : (
            showPricingLink && (
              <Link href="/pricing" onClick={() => setMobileOpen(false)} className="text-zinc-400 hover:text-gold-400">
                Tarifs
              </Link>
            )
          )}

          {!session && (
            <Link 
              href="/login" 
              onClick={() => setMobileOpen(false)}
              className="mt-3 text-center py-3 px-6 bg-gold-700/20 border border-gold-700/40 text-gold-400 rounded-lg"
            >
              Commencer gratuitement
            </Link>
          )}
        </div>
      )}
    </header>
  )
}
