'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { 
  LayoutDashboard, 
  Target, 
  TrendingUp, 
  Bell, 
  Heart, 
  FileText,
  User, 
  LogOut 
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/opportunites', label: 'Opportunités', icon: Target },
  { href: '/simulateur', label: 'Simulateur', icon: TrendingUp },
  { href: '/dashboard/simulations', label: 'Mes Simulations', icon: FileText },
  { href: '/dashboard/alertes', label: 'Mes alertes', icon: Bell },
  { href: '/dashboard/favoris', label: 'Favoris', icon: Heart },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <div className="hidden lg:flex fixed left-0 top-0 bottom-0 w-72 flex-col z-40
      bg-white border-r border-zinc-200
      dark:bg-zinc-950 dark:border-white/10">

      {/* Logo */}
      <div className="px-8 py-8 border-b border-zinc-200 dark:border-white/10">
        <Link href="/" className="flex items-center gap-3">
          <svg width="32" height="32" viewBox="0 0 96 96" fill="none">
            <defs>
              <linearGradient id="sidebarGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f0d68a"/>
                <stop offset="100%" stopColor="#9a7230"/>
              </linearGradient>
            </defs>
            <rect width="96" height="96" rx="22" fill="#0d0d14"/>
            <polyline points="26,30 48,70 70,30" fill="none" stroke="url(#sidebarGold)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-display text-2xl font-semibold text-gold-400 tracking-wide">
            VALORYS
          </span>
        </Link>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 tracking-widest">
          INTELLIGENCE IMMOBILIÈRE
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 py-10">
        <div className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3.5 px-6 py-4 rounded-2xl text-sm transition-all ${
                  isActive
                    ? 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-gold-600/10 dark:text-gold-400 dark:border-gold-600/30'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-5 h-5 ${
                  isActive 
                    ? 'text-amber-600 dark:text-gold-400' 
                    : 'text-zinc-400 dark:text-zinc-500'
                }`} />
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Profil & Déconnexion */}
      <div className="p-6 border-t border-zinc-200 dark:border-white/10 mt-auto">
        {session && (
          <div className="flex items-center gap-3 px-4 py-4 mb-4 
            bg-zinc-100 rounded-2xl
            dark:bg-zinc-900/50">
            <div className="w-9 h-9 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center">
              {session.user?.image ? (
                <img src={session.user.image} alt="" className="w-9 h-9 rounded-full"/>
              ) : (
                <User className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-zinc-800 dark:text-zinc-200 truncate font-medium">
                {session.user?.name}
              </p>
              <p className="text-xs text-zinc-500 truncate">{session.user?.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-full flex items-center justify-center gap-3 px-6 py-3.5 text-sm 
            text-zinc-500 hover:text-red-500 hover:bg-red-50
            dark:text-zinc-400 dark:hover:text-red-400 dark:hover:bg-white/5
            rounded-2xl transition-all"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </div>
    </div>
  )
}
