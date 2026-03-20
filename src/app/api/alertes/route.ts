import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const alerts = await prisma.alert.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(alerts)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const plan = session.user.plan
  const body = await req.json()

  if (plan === 'DECOUVERTE') {
    const count = await prisma.alert.count({
      where: { userId: session.user.id },
    })
    if (count >= 5) {
      return NextResponse.json(
        { error: 'Limite de 5 alertes atteinte. Passez au plan Investisseur.' },
        { status: 403 }
      )
    }
  }

  if (body.smsEnabled && plan !== 'PRO') {
    return NextResponse.json(
      { error: 'Les alertes SMS sont réservées au plan Pro.' },
      { status: 403 }
    )
  }

  const alert = await prisma.alert.create({
    data: {
      userId: session.user.id,
      name: body.name,
      mode: body.mode ?? 'BOTH',
      departments: body.departments ?? [],
      cities: body.cities ?? [],
      postalCodes: body.postalCodes ?? [],
      types: body.types ?? [],
      priceMin: body.priceMin ?? null,
      priceMax: body.priceMax ?? null,
      surfaceMin: body.surfaceMin ?? null,
      surfaceMax: body.surfaceMax ?? null,
      roomsMin: body.roomsMin ?? null,
      minYieldGross: body.minYieldGross ?? null,
      minInvestScore: body.minInvestScore ?? null,
      minMdbMarginPct: body.minMdbMarginPct ?? null,
      successionOnly: body.successionOnly ?? false,
      immoRapportOnly: body.immoRapportOnly ?? false,
      emailEnabled: body.emailEnabled ?? true,
      smsEnabled: body.smsEnabled ?? false,
    },
  })
  return NextResponse.json(alert)
}
