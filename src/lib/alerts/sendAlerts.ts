import { prisma } from '../prisma'
import { resend } from '../clients'

export async function sendAlerts() {
  console.log('[Alertes] Vérification des nouvelles annonces...')

  const alerts = await prisma.alert.findMany({
    where: { isActive: true },
    include: {
      user: {
        include: { subscription: { include: { plan: true } } },
      },
    },
  })

  let totalSent = 0

  for (const alert of alerts) {
    const user = alert.user
    const plan = user.subscription?.plan.type ?? 'DECOUVERTE'

    const whereClause: any = {
      isActive: true,
      alertMatches: { none: { alertId: alert.id } },
    }

    if (alert.cities.length > 0) whereClause.city = { in: alert.cities }
    if (alert.priceMin) whereClause.price = { gte: alert.priceMin }
    if (alert.priceMax) whereClause.price = { ...whereClause.price, lte: alert.priceMax }
    if (alert.surfaceMin) whereClause.surface = { gte: alert.surfaceMin }
    if (alert.surfaceMax) whereClause.surface = { ...whereClause.surface, lte: alert.surfaceMax }
    if (alert.roomsMin) whereClause.rooms = { gte: alert.roomsMin }
    if (alert.types.length > 0) whereClause.type = { in: alert.types }
    if (alert.minInvestScore) whereClause.investScore = { gte: alert.minInvestScore }
    if (alert.successionOnly) whereClause.isSucessionKeyword = true
    if (alert.immoRapportOnly) whereClause.isImmoRapport = true

    if (plan === 'DECOUVERTE') {
      whereClause.firstSeenAt = {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
      }
    } else {
      whereClause.firstSeenAt = {
        gte: new Date(Date.now() - 6 * 60 * 60 * 1000),
      }
    }

    const matchingListings = await prisma.listing.findMany({
      where: whereClause,
      orderBy: { investScore: 'desc' },
      take: 10,
    })

    if (matchingListings.length === 0) continue

    if (alert.emailEnabled && user.email) {
      try {
        await resend.emails.send({
          from: 'Valorys Alertes <alertes@valorys.fr>',
          to: user.email,
          subject: `🔔 ${matchingListings.length} nouvelle${matchingListings.length > 1 ? 's' : ''} opportunité${matchingListings.length > 1 ? 's' : ''} — ${alert.name}`,
          html: buildAlertEmailHtml(alert.name, matchingListings),
        })

        for (const listing of matchingListings) {
          await prisma.alertMatch.upsert({
            where: {
              alertId_listingId: { alertId: alert.id, listingId: listing.id },
            },
            create: { alertId: alert.id, listingId: listing.id },
            update: {},
          })
        }

        await prisma.alert.update({
          where: { id: alert.id },
          data: { lastSentAt: new Date() },
        })

        totalSent++
      } catch (err) {
        console.error(`[Alertes] Erreur envoi ${user.email}:`, err)
      }
    }
  }

  console.log(`[Alertes] ${totalSent} alertes envoyées`)
  return totalSent
}

function buildAlertEmailHtml(alertName: string, listings: any[]): string {
  const listingsHtml = listings
    .map(
      l => `
    <div style="border:1px solid #1a1a2e;border-radius:8px;padding:16px;margin-bottom:16px;background:#0d0d14;">
      <h3 style="margin:0 0 4px;font-size:16px;color:#e8c97a;">${l.title}</h3>
      <p style="margin:0;color:#888;font-size:14px;">${l.city} • ${l.surface ?? '?'}m² • ${l.department}</p>
      <div style="margin-top:8px;display:flex;justify-content:space-between;align-items:center;">
        <div style="font-size:20px;font-weight:bold;color:#fff;">${l.price.toLocaleString('fr-FR')}€</div>
        ${l.investScore ? `<div style="background:#10b981;color:white;border-radius:4px;padding:2px 8px;font-size:12px;">Score ${l.investScore}/100</div>` : ''}
      </div>
      ${l.estimatedYieldGross ? `<p style="margin:6px 0 0;font-size:13px;color:#c9a96e;">Rendement estimé : ${l.estimatedYieldGross.toFixed(1)}%</p>` : ''}
      <a href="${process.env.NEXTAUTH_URL}/opportunites/${l.id}" style="display:inline-block;margin-top:12px;background:#c9a96e;color:#000;padding:8px 16px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;">Voir l'opportunité →</a>
    </div>
  `
    )
    .join('')

  return `
    <!DOCTYPE html>
    <html>
    <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#f5f5f5;">
      <div style="text-align:center;margin-bottom:24px;padding:20px;background:#0d0d14;border-radius:12px;">
        <h1 style="color:#e8c97a;font-size:28px;margin:0;">VALORYS</h1>
        <p style="color:#888;margin:4px 0 0;font-size:14px;">Intelligence Immobilière</p>
      </div>
      <h2 style="color:#333;">🔔 Alerte : ${alertName}</h2>
      <p style="color:#666;">Nous avons trouvé ${listings.length} nouvelle${listings.length > 1 ? 's' : ''} opportunité${listings.length > 1 ? 's' : ''} :</p>
      ${listingsHtml}
      <div style="margin-top:24px;padding-top:16px;border-top:1px solid #ddd;text-align:center;color:#999;font-size:12px;">
        <a href="${process.env.NEXTAUTH_URL}/dashboard/alertes" style="color:#c9a96e;">Gérer mes alertes</a>
        <p>Valorys — Intelligence Immobilière France<br>
        <a href="${process.env.NEXTAUTH_URL}/legal/rgpd" style="color:#999;">Politique RGPD</a></p>
      </div>
    </body>
    </html>
  `
}
