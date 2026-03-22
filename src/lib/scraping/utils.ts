import { Browser, Page, chromium } from 'playwright'

export const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0',
]

export const getRandomUserAgent = () =>
  USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)]

export const randomDelay = (min = 800, max = 3000): Promise<void> =>
  new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * (max - min) + min))
  )

export async function createStealthBrowser(): Promise<Browser> {
  return chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--disable-dev-shm-usage',
      '--no-first-run',
      '--disable-gpu',
    ],
  })
}

export async function createStealthPage(browser: Browser): Promise<Page> {
  const context = await browser.newContext({
    userAgent: getRandomUserAgent(),
    viewport: { width: 1366, height: 768 },
    locale: 'fr-FR',
    timezoneId: 'Europe/Paris',
  })

  const page = await context.newPage()

  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined })
    Object.defineProperty(navigator, 'languages', {
      get: () => ['fr-FR', 'fr', 'en-US', 'en'],
    })
    // @ts-ignore
    window.chrome = { runtime: {} }
  })

  return page
}

export async function humanScroll(page: Page) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0
      const distance = Math.floor(Math.random() * 200 + 100)
      const timer = setInterval(() => {
        window.scrollBy(0, distance)
        totalHeight += distance
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer)
          resolve()
        }
      }, Math.floor(Math.random() * 200 + 100))
    })
  })
}

export function parsePrice(raw: string): number | null {
  const cleaned = raw.replace(/[^\d,\.]/g, '').replace(',', '.')
  const value = parseFloat(cleaned)
  return isNaN(value) ? null : value
}

export function parseSurface(raw: string): number | null {
  const match = raw.match(/(\d+[\.,]?\d*)\s*m²?/i)
  if (!match) return null
  return parseFloat(match[1].replace(',', '.'))
}

export function parseDpe(raw: string): string | null {
  const letter = raw.trim().toUpperCase().charAt(0)
  if (['A', 'B', 'C', 'D', 'E', 'F', 'G'].includes(letter)) return letter
  return null
}
