import { prisma } from '../prisma'
import { resend } from '../clients'

export async function generateAndSendWeeklyReport() {
  console.log('[MarketReport] Génération du rapport hebdomadaire...')

  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

  const [weeklyListings, topDeals] = await Promise.all([
    prisma.listing.count({
      where: { firstSeenAt: { gte: oneWeekAgo }, isActive: true },
    }),
    prisma.listing.findMany({
      where: {
        firstSeenAt: { gte: oneWeekAgo },
        investScore: { gte: 75 },
        isActive: true,
      },
      orderBy: { investScore: 'desc' },
      take: 5,
      select: {
        id: true, title: true, city: true, price: true,
        surface: true, investScore: true,
      },
    }),
  ])

  const topDealsHtml = topDeals.map(d => `
    <div style="border:1px solid #1a1a2e;border-radius:8px;padding:16px;margin-bottom:12px;">
      <h3 style="color:#e8c97a;margin:0 0 4px;">${d.title}</h3>
      <p style="color:#888;margin:0;">${d.city} · ${d.surface ?? '?'}m² · ${d.price.toLocaleString('fr-FR')}€</p>
      <span style="background:#10b981;color:white;padding:2px 8px;border-radius:4px;font-size:12px;">Score ${d.investScore}/100</span>
    </div>
  `).join('')

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <body style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#f5f5f5;">
      <div style="background:#0d0d14;padding:24px;border-radius:12px;text-align:center;margin-bottom:24px;">
        <h1 style="color:#e8c97a;margin:0;">VALORYS</h1>
        <p style="color:#888;margin:4px 0 0;">Journal du Marché — Semaine du ${new Date().toLocaleDateString('fr-FR')}</p>
      </div>
      <div style="background:white;padding:24px;border-radius:12px;margin-bottom:16px;">
        <h2 style="color:#333;">📊 Cette semaine</h2>
        <p><strong>${weeklyListings}</strong> nouvelles annonces analysées</p>
        <p><strong>${topDeals.length}</strong> opportunités avec score ≥ 75/100</p>
      </div>
      ${topDeals.length > 0 ? `
        <div style="background:white;padding:24px;border-radius:12px;">
          <h2 style="color:#333;">🏆 Meilleures opportunités</h2>
          ${topDealsHtml}
        </div>
      ` : ''}
      <p style="text-align:center;color:#999;font-size:12px;margin-top:24px;">
        <a href="${process.env.NEXTAUTH_URL}/dashboard/alertes" style="color:#c9a96e;">Gérer mes alertes</a>
      </p>
    </body>
    </html>
  `

  // Envoyer aux abonnés Investisseur, Marchand et Pro
  const users = await prisma.user.findMany({
    where: {
      subscription: {
        plan: { type: { in: ['INVESTISSEUR', 'MARCHAND', 'PRO'] } },
      },
    },
    select: { email: true },
  })

  let sentCount = 0
  for (const user of users) {
    if (!user.email) continue
    try {
      await resend.emails.send({
        from: 'Valorys <journal@valorys.fr>',
        to: user.email,
        subject: `📊 Journal Valorys — ${weeklyListings} annonces analysées cette semaine`,
        html: htmlContent,
      })
      sentCount++
      await new Promise(r => setTimeout(r, 100))
    } catch (err) {
      console.error(`[MarketReport] Erreur envoi ${user.email}:`, err)
    }
  }

  console.log(`[MarketReport] Envoyé à ${sentCount} abonnés`)
  return { weeklyListings, topDeals: topDeals.length, sentTo: sentCount }
}
