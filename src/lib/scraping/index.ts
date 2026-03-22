import { prisma } from '../prisma'
import { sendAlerts } from '../alerts/sendAlerts'

interface ScrapingResult {
  source: string
  found: number
  added: number
  updated: number
  errors: number
}

export async function runFullScraping(): Promise<ScrapingResult[]> {
  console.log('🔍 [Scraping] Démarrage cycle complet —', new Date().toISOString())
  const results: ScrapingResult[] = []

  // IA désactivée — activer quand clé Anthropic disponible
  const aiData = {
    investScore: null,
    investScoreDetails: null,
    aiDescription: null,
    pricePerSqm: null,
    dvfMedianPricePerSqm: null,
    dvfTransactionCount: 0,
    priceVsDvf: null,
    estimatedRent: null,
    estimatedYieldGross: null,
    estimatedResalePrice: null,
    estimatedRenovCost: 0,
    estimatedMdbMarginPct: null,
    isSucessionKeyword: false,
    isJudiciaryKeyword: false,
    isDivisionPotential: false,
    isImmoRapport: false,
    fraudScore: 0,
    fraudFlags: [] as string[],
  }

  try {
    const { scrapeSeLoger } = await import('./seloger')
    const { scrapeLeBonCoin } = await import('./leboncoin')
    const { scrapeBienIci } = await import('./bienici')

    const scrapers = [
      { name: 'SELOGER', fn: scrapeSeLoger },
      { name: 'LEBONCOIN', fn: scrapeLeBonCoin },
      { name: 'BIENICI', fn: scrapeBienIci },
    ]

    for (const scraper of scrapers) {
      const result: ScrapingResult = {
        source: scraper.name,
        found: 0,
        added: 0,
        updated: 0,
        errors: 0,
      }

      const logEntry = await prisma.scrapingLog.create({
        data: {
          source: scraper.name as any,
          status: 'running',
          startedAt: new Date(),
        },
      })

      try {
        const rawListings = await scraper.fn()
        result.found = rawListings.length

        for (const raw of rawListings) {
          try {
            const existing = await prisma.listing.findUnique({
              where: {
                externalId_source: {
                  externalId: raw.externalId,
                  source: raw.source as any,
                },
              },
            })

            if (existing) {
              await prisma.listing.update({
                where: { id: existing.id },
                data: {
                  price: raw.price,
                  isActive: true,
                  lastSeenAt: new Date(),
                  photos: raw.photos,
                },
              })
              result.updated++
            } else {
              const listing = await prisma.listing.create({
                data: {
                  externalId: raw.externalId,
                  source: raw.source as any,
                  sourceUrl: raw.sourceUrl,
                  title: raw.title,
                  description: raw.description,
                  city: raw.city,
                  postalCode: raw.postalCode,
                  department: raw.postalCode.substring(0, 2),
                  type: raw.type as any,
                  price: raw.price,
                  surface: raw.surface,
                  rooms: raw.rooms,
                  photos: raw.photos,
                  isActive: true,
                },
              })

              await prisma.priceHistory.create({
                data: {
                  listingId: listing.id,
                  price: raw.price,
                },
              })

              result.added++
            }
          } catch (err) {
            result.errors++
          }
        }

        await prisma.scrapingLog.update({
          where: { id: logEntry.id },
          data: {
            status: 'success',
            listingsFound: result.found,
            listingsNew: result.added,
            listingsUpdated: result.updated,
            completedAt: new Date(),
          },
        })
      } catch (err: any) {
        result.errors++
        await prisma.scrapingLog.update({
          where: { id: logEntry.id },
          data: {
            status: 'error',
            errorMessage: err.message,
            completedAt: new Date(),
          },
        })
      }

      results.push(result)
    }

    // Marquer inactives les annonces non vues depuis 48h
    await prisma.listing.updateMany({
      where: {
        isActive: true,
        lastSeenAt: {
          lt: new Date(Date.now() - 48 * 60 * 60 * 1000),
        },
      },
      data: { isActive: false },
    })

    await sendAlerts()
  } catch (err) {
    console.error('[Scraping] Erreur globale:', err)
  }

  console.log('✅ [Scraping] Cycle terminé:', results)
  return results
}
