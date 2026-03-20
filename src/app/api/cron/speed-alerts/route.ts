import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { sendAlerts } = await import('@/lib/alerts/sendAlerts')
    const sent = await sendAlerts()
    return NextResponse.json({ success: true, sent })
  } catch (err: any) {
    console.error('[Cron Alerts] Erreur:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
