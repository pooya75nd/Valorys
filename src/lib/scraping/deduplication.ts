import { prisma } from '../prisma'

export async function runDeduplication(): Promise<number> {
  console.log('[Dédup] Démarrage...')

  const recentListings = await prisma.listing.findMany({
    where: {
      isActive: true,
      firstSeenAt: { gte: new Date(Date.now() - 48 * 60 * 60 * 1000) },
    },
    select: {
      id: true, city: true, price: true, surface: true,
      type: true, rooms: true, title: true, source: true,
    },
  })

  let duplicatesFound = 0

  for (let i = 0; i < recentListings.length; i++) {
    const a = recentListings[i]
    for (let j = i + 1; j < recentListings.length; j++) {
      const b = recentListings[j]
      if (a.source === b.source) continue
      if (a.city !== b.city) continue

      const priceDiff = Math.abs(a.price - b.price) / Math.max(a.price, b.price)
      const surfaceDiff = Math.abs((a.surface ?? 0) - (b.surface ?? 0))

      if (priceDiff < 0.05 && surfaceDiff <= 3) {
        duplicatesFound++
      }
    }
  }

  console.log(`[Dédup] ${duplicatesFound} doublons détectés`)
  return duplicatesFound
}
