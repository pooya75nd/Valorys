import { createStealthBrowser, createStealthPage, randomDelay, humanScroll, parsePrice, parseSurface } from './utils'

export interface RawListing {
  externalId: string
  source: 'SELOGER' | 'LEBONCOIN' | 'BIENICI'
  sourceUrl: string
  title: string
  description: string | null
  city: string
  postalCode: string
  type: string
  price: number
  charges: number | null
  chargesIncluded: boolean
  surface: number
  rooms: number | null
  bedrooms: number | null
  floor: number | null
  hasElevator: boolean
  hasParking: boolean
  hasBalcony: boolean
  hasTerrace: boolean
  petsAllowed: boolean
  furnished: boolean
  dpe: string | null
  photos: string[]
  publishedAt: Date | null
}

export async function scrapeSeLoger(): Promise<RawListing[]> {
  console.log('[SeLoger] Démarrage scraping...')
  const browser = await createStealthBrowser()
  const listings: RawListing[] = []

  try {
    const baseUrl = 'https://www.seloger.com/list.htm?types=1&natures=1&cp=92&tri=initial&idtypebien=1,2'
    const page = await createStealthPage(browser)

    await randomDelay(1000, 2000)
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await randomDelay(2000, 4000)
    await humanScroll(page)

    const cards = await page.$$('[data-testid="sl.list-item-link"]')

    for (const card of cards) {
      try {
        const url = await card.getAttribute('href')
        if (!url) continue
        const fullUrl = url.startsWith('http') ? url : `https://www.seloger.com${url}`
        const idMatch = fullUrl.match(/\/(\d+)\.htm/)
        const externalId = idMatch ? idMatch[1] : fullUrl

        const titleEl = await card.$('[data-testid="sl.list-item-title"]')
        const title = titleEl ? (await titleEl.textContent())?.trim() ?? '' : ''

        const priceEl = await card.$('[data-testid="sl.list-item-price"]')
        const priceRaw = priceEl ? (await priceEl.textContent()) ?? '' : ''
        const price = parsePrice(priceRaw)
        if (!price) continue

        const surfaceEl = await card.$('[data-testid="sl.list-item-surface"]')
        const surfaceRaw = surfaceEl ? (await surfaceEl.textContent()) ?? '' : ''
        const surface = parseSurface(surfaceRaw)
        if (!surface) continue

        const cityEl = await card.$('[data-testid="sl.list-item-geolocLabel-main"]')
        const cityRaw = cityEl ? (await cityEl.textContent())?.trim() ?? '' : ''

        const imgEls = await card.$$('img[src]')
        const photos: string[] = []
        for (const img of imgEls) {
          const src = await img.getAttribute('src')
          if (src && src.startsWith('http')) photos.push(src)
        }

        listings.push({
          externalId,
          source: 'SELOGER',
          sourceUrl: fullUrl,
          title,
          description: null,
          city: cityRaw || 'Hauts-de-Seine',
          postalCode: '92000',
          type: 'APPARTEMENT',
          price,
          charges: null,
          chargesIncluded: priceRaw.toLowerCase().includes('cc'),
          surface,
          rooms: null,
          bedrooms: null,
          floor: null,
          hasElevator: false,
          hasParking: false,
          hasBalcony: false,
          hasTerrace: false,
          petsAllowed: false,
          furnished: title.toLowerCase().includes('meublé'),
          dpe: null,
          photos,
          publishedAt: null,
        })
      } catch (err) {
        console.warn('[SeLoger] Erreur parsing:', err)
      }
    }

    await page.close()
  } catch (err) {
    console.error('[SeLoger] Erreur:', err)
  } finally {
    await browser.close()
  }

  console.log(`[SeLoger] ${listings.length} annonces récupérées`)
  return listings
}
