import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl

    const departments = searchParams.get('departments')?.split(',').filter(Boolean) ?? []
    const cities = searchParams.get('cities')?.split(',').filter(Boolean) ?? []
    const priceMin = searchParams.get('priceMin') ? Number(searchParams.get('priceMin')) : undefined
    const priceMax = searchParams.get('priceMax') ? Number(searchParams.get('priceMax')) : undefined
    const surfaceMin = searchParams.get('surfaceMin') ? Number(searchParams.get('surfaceMin')) : undefined
    const types = searchParams.get('types')?.split(',').filter(Boolean) ?? []
    const minInvestScore = searchParams.get('minInvestScore') ? Number(searchParams.get('minInvestScore')) : undefined
    const successionOnly = searchParams.get('successionOnly') === 'true'
    const sortBy = searchParams.get('sortBy') ?? 'score'
    const page = Math.max(1, Number(searchParams.get('page') ?? 1))
    const pageSize = Math.min(50, Math.max(1, Number(searchParams.get('pageSize') ?? 20)))

    const where: any = { isActive: true }

    if (departments.length > 0) where.department = { in: departments }
    if (cities.length > 0) where.city = { in: cities }
    if (priceMin !== undefined) where.price = { gte: priceMin }
    if (priceMax !== undefined) where.price = { ...where.price, lte: priceMax }
    if (surfaceMin !== undefined) where.surface = { gte: surfaceMin }
    if (types.length > 0) where.type = { in: types }
    if (minInvestScore !== undefined) where.investScore = { gte: minInvestScore }
    if (successionOnly) where.isSucessionKeyword = true

    const orderBy: any = {
      score: { investScore: 'desc' },
      price_asc: { price: 'asc' },
      price_desc: { price: 'desc' },
      date: { firstSeenAt: 'desc' },
    }[sortBy] ?? { investScore: 'desc' }

    const [listings, total] = await Promise.all([
      prisma.listing.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true, title: true, city: true, department: true,
          postalCode: true, type: true, price: true, surface: true,
          rooms: true, investScore: true, pricePerSqm: true,
          dvfMedianPricePerSqm: true, priceVsDvf: true,
          estimatedYieldGross: true, estimatedMdbMarginPct: true,
          isSucessionKeyword: true, isImmoRapport: true,
          photos: true, aiDescription: true, firstSeenAt: true,
          source: true, sourceUrl: true,
        },
      }),
      prisma.listing.count({ where }),
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
