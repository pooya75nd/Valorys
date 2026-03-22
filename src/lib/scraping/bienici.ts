import { createStealthBrowser, createStealthPage, randomDelay } from './utils'
import type { RawListing } from './seloger'

export async function scrapeBienIci(): Promise<RawListing[]> {
  console.log('[BienIci] Démarrage scraping...')
  const browser = await createStealthBrowser()
  const listings: RawListing[] = []

  try {
    const page = await createStealthPage(browser)
    await randomDelay(1000, 2000)

    let offset = 0
    const pageSize = 24

    while (offset < 100) {
      const url = `https://www.bienici.com/realEstateAds.json?filters=%7B%22size%22%3A${pageSize}%2C%22from%22%3A${offset}%2C%22filterType%22%3A%22buy%22%2C%22propertyType%22%3A%5B%22flat%22%2C%22house%22%5D%2C%22zoneIdsByTypes%22%3A%7B%22zoneIds%22%3A%5B%22-7401%22%5D%7D%7D`

      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 })
      await randomDelay(1500, 3000)

      const content = await page.textContent('body')
      if (!content) break

      let data: any
      try {
        data = JSON.parse(content)
      } catch {
        break
      }

      const ads = data?.realEstateAds ?? []
      if (ads.length === 0) break

      for (const ad of ads) {
        try {
          if (!ad.id || !ad.price || !ad.surfaceArea) continue

          const postalCode = ad.postalCode ?? ''
          if (!postalCode.startsWith('92')) continue

          const photos: string[] = (ad.photos ?? [])
            .slice(0, 10)
            .map((p: any) => p.url_photo ?? p.url ?? '')
            .filter(Boolean)

          listings.push({
            externalId: `bienici_${ad.id}`,
            source: 'BIENICI',
            sourceUrl: `https://www.bienici.com/annonce/vente/${ad.id}`,
            title: ad.title ?? `Bien ${ad.surfaceArea}m²`,
            description: ad.description ?? null,
            city: ad.city?.name ?? 'Hauts-de-Seine',
            postalCode: postalCode || '92000',
            type: 'APPARTEMENT',
            price: ad.price,
            charges: ad.charges ?? null,
            chargesIncluded: false,
            surface: ad.surfaceArea,
            rooms: ad.roomsQuantity ?? null,
            bedrooms: ad.bedroomsQuantity ?? null,
            floor: ad.floor ?? null,
            hasElevator: ad.elevator ?? false,
            hasParking: (ad.parkingPlacesQuantity ?? 0) > 0,
            hasBalcony: ad.balcony ?? false,
            hasTerrace: ad.terrace ?? false,
            petsAllowed: false,
            furnished: ad.furnished ?? false,
            dpe: ad.dpeGes?.energyClass ?? null,
            photos,
            publishedAt: ad.publicationDate ? new Date(ad.publicationDate) : null,
          })
        } catch (err) {
          console.warn('[BienIci] Erreur parsing:', err)
        }
      }

      offset += pageSize
      await randomDelay(2000, 4000)
    }

    await page.close()
  } catch (err) {
    console.error('[BienIci] Erreur:', err)
  } finally {
    await browser.close()
  }

  console.log(`[BienIci] ${listings.length} annonces récupérées`)
  return listings
}
