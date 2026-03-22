import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  try {
    const { prisma } = await import('@/lib/prisma')
    const page = Math.max(1, Number(req.nextUrl.searchParams.get('page') ?? 1))
    const pageSize = 20

    const [listings, total] = await Promise.all([
      prisma.listing.findMany({
        where: { isActive: true },
        orderBy: { investScore: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true, title: true, city: true, department: true,
          type: true, price: true, surface: true, rooms: true,
          investScore: true, pricePerSqm: true, priceVsDvf: true,
          estimatedYieldGross: true, estimatedMdbMarginPct: true,
          isSucessionKeyword: true, isImmoRapport: true,
          photos: true, firstSeenAt: true, source: true,
        },
      }),
      prisma.listing.count({ where: { isActive: true } }),
    ])

    return NextResponse.json({
      listings,
      pagination: {
        total, page, pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
