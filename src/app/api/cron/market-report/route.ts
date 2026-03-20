import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { generateAndSendWeeklyReport } = await import('@/lib/ai/marketReport')
    const result = await generateAndSendWeeklyReport()
    return NextResponse.json({ success: true, ...result })
  } catch (err: any) {
    console.error('[Cron Market Report] Erreur:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
