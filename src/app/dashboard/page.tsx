import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Bell, Heart, TrendingUp, Building2, ArrowRight, Star } from 'lucide-react'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')

  const [alertCount, favCount, simCount] = await Promise.all([
    prisma.alert.count({ where: { userId: session.user.id, isActive: true } }),
    prisma.favorite.count({ where: { userId: session.user.id } }),
    prisma.investmentSimulation.count({ where: { userId: session.user.id } }),
  ])

  const plan = session.user.plan
  const planLabels: Record<string, string> = {
    DECOUVERTE: 'Découverte',
    INVESTISSEUR: 'Investisseur',
    MARCHAND: 'Marchand',
    PRO: 'Pro & Cabinet',
  }

  return (
    <main className="min-h-screen bg-ink-deep pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-zinc-500 text-sm font-light mb-1">Bonjour,</p>
            <h1 className="font-display text-4xl text-zinc-100">
              {session.user.name?.split(' ')[0] ?? 'Investisseur'}
            </h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 border border-gold-700/40 rounded-lg bg-gold-700/10">
            <Star className="w-3 h-3 text-gold-400"/>
            <span className="text-xs text-gold-400">{planLabels[plan]}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Bell, label: 'Alertes actives', value: alertCount, href: '/dashboard/alertes', color: 'text-blue-400' },
            { icon: Heart, label: 'Favoris', value: favCount, href: '/dashboard/favoris', color: 'text-rose-400' },
            { icon: TrendingUp, label: 'Simulations', value: simCount, href: '/simulateur', color: 'text-gold-400' },
            { icon: Building2, label: 'Portefeuille', value: 0, href: '/dashboard/portefeuille', color: 'text-emerald-400' },
          ].map(({ icon: Icon, label, value, href, color }) => (
            <Link key={href} href={href}
              className="p-5 bg-zinc-900/50 border border-white/5 rounded-2xl hover:border-gold-700/30 transition-all">
              <Icon className={`w-5 h-5 ${color} mb-3`}/>
              <div className="text-2xl font-semibold text-zinc-100 mb-0.5">{value}</div>
              <div className="text-xs text-zinc-500 font-light">{label}</div>
            </Link>
          ))}
        </div>

        {/* Actions rapides */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl">
            <h2 className="text-zinc-200 font-medium mb-4">Actions rapides</h2>
            <div className="space-y-3">
              {[
                { label: 'Simuler un investissement locatif', href: '/simulateur', icon: TrendingUp },
                { label: 'Créer une alerte', href: '/dashboard/alertes', icon: Bell },
                { label: 'Voir les opportunités', href: '/opportunites', icon: Building2 },
              ].map(({ label, href, icon: Icon }) => (
                <Link key={href} href={href}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group">
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-gold-600"/>
                    <span className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">{label}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-gold-400 transition-colors"/>
                </Link>
              ))}
            </div>
          </div>

          {/* Upgrade CTA si plan Découverte */}
          {plan === 'DECOUVERTE' && (
            <div className="p-6 rounded-2xl border border-gold-700/30 bg-gold-700/5">
              <p className="text-gold-400 font-medium mb-2">Passez à Investisseur</p>
              <p className="text-zinc-500 text-sm font-light mb-4 leading-relaxed">
                6 régimes fiscaux, données DVF complètes, alertes illimitées — 19€/mois
              </p>
              <Link href="/pricing"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-ink-deep text-sm font-medium rounded-xl transition-colors">
                Voir les plans
                <ArrowRight className="w-4 h-4"/>
              </Link>
            </div>
          )}
        </div>

      </div>
    </main>
  )
}
