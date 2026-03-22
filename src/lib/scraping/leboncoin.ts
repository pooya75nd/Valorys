import { createStealthBrowser, createStealthPage, randomDelay, humanScroll, parsePrice, parseSurface } from './utils'
import type { RawListing } from './seloger'

export async function scrapeLeBonCoin(): Promise<RawListing[]> {
  console.log('[LeBonCoin] Démarrage scraping...')
  const browser = await createStealthBrowser()
  const listings: RawListing[] = []

  try {
    const baseUrl = 'https://www.leboncoin.fr/recherche?category=10&locations=Hauts-de-Seine__92'
    const page = await createStealthPage(browser)

    await randomDelay(1500, 3000)
    await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 30000 })
    await randomDelay(2000, 4000)

    try {
      const cookieBtn = await page.$('[data-testid="Didomi-notice-agree-button"]')
      if (cookieBtn) {
        await cookieBtn.click()
        await randomDelay(500, 1000)
      }
    } catch {}

    await humanScroll(page)

    const cards = await page.$$('[data-test-id="ad"]')

    for (const card of cards) {
      try {
        const linkEl = await card.$('a')
        const url = await linkEl?.getAttribute('href')
        if (!url) continue

        const fullUrl = url.startsWith('http') ? url : `https://www.leboncoin.fr${url}`
        const idMatch = fullUrl.match(/\/(\d+)\.htm/)
        const externalId = idMatch ? `lbc_${idMatch[1]}` : fullUrl

        const titleEl = await card.$('[data-test-id="ad-title"]')
        const title = titleEl ? (await titleEl.textContent())?.trim() ?? '' : ''
        if (!title) continue

        const priceEl = await card.$('[data-test-id="price"]')
        const priceRaw = priceEl ? (await priceEl.textContent()) ?? '' : ''
        const price = parsePrice(priceRaw)
        if (!price || price < 200 || price > 10000) continue

        const locationEl = await card.$('[data-test-id="ad-location"]')
        const locationRaw = locationEl ? (await locationEl.textContent())?.trim() ?? '' : ''

        const surfaceRaw = title + ' ' + (await card.textContent() ?? '')
        const surface = parseSurface(surfaceRaw)
        if (!surface) continue

        const imgEl = await card.$('img[src]')
        const imgSrc = await imgEl?.getAttribute('src')
        const photos = imgSrc ? [imgSrc] : []

        listings.push({
          externalId,
          source: 'LEBONCOIN',
          sourceUrl: fullUrl,
          title,
          description: null,
          city: locationRaw || 'Hauts-de-Seine',
          postalCode: '92000',
          type: 'APPARTEMENT',
          price,
          charges: null,
          chargesIncluded: false,
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
        console.warn('[LeBonCoin] Erreur parsing:', err)
      }
    }

    await page.close()
  } catch (err) {
    console.error('[LeBonCoin] Erreur:', err)
  } finally {
    await browser.close()
  }

  console.log(`[LeBonCoin] ${listings.length} annonces récupérées`)
  return listings
}
