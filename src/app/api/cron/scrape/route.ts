import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Import dynamique pour éviter les erreurs de build
    const { runFullScraping } = await import('@/lib/scraping/index')
    const results = await runFullScraping()
    return NextResponse.json({ success: true, results })
  } catch (err: any) {
    console.error('[Cron Scrape] Erreur:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
