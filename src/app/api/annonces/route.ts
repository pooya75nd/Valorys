import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const departments = searchParams.get('departments')?.split(',').filter(Boolean) ?? []
  const cities = searchParams.get('cities')?.split(',').filter(Boolean) ?? []
  const priceMin = searchParams.get('priceMin') ? Number(searchParams.get('priceMin')) : undefined
  const priceMax = searchParams.get('priceMax') ? Number(searchParams.get('priceMax')) : undefined
  const surfaceMin = searchParams.get('surfaceMin') ? Number(searchParams.get('surfaceMin')) : undefined
  const surfaceMax = searchParams.get('surfaceMax') ? Number(searchParams.get('surfaceMax')) : undefined
  const types = searchParams.get('types')?.split(',').filter(Boolean) ?? []
  const minInvestScore = searchParams.get('minInvestScore') ? Number(searchParams.get('minInvestScore')) : undefined
  const minYield = searchParams.get('minYield') ? Number(searchParams.get('minYield')) : undefined
  const successionOnly = searchParams.get('successionOnly') === 'true'
  const immoRapportOnly = searchParams.get('immoRapportOnly') === 'true'
  const sortBy = searchParams.get('sortBy') ?? 'score'
  const page = Math.max(1, Number(searchParams.get('page') ?? 1))
  const pageSize = Math.min(50, Math.max(1, Number(searchParams.get('pageSize') ?? 20)))

  const where: any = { isActive: true }

  if (departments.length > 0) where.department = { in: departments }
  if (cities.length > 0) where.city = { in: cities }
  if (priceMin !== undefined) where.price = { gte: priceMin }
  if (priceMax !== undefined) where.price = { ...where.price, lte: priceMax }
  if (surfaceMin !== undefined) where.surface = { gte: surfaceMin }
  if (surfaceMax !== undefined) where.surface = { ...where.surface, lte: surfaceMax }
  if (types.length > 0) where.type = { in: types }
  if (minInvestScore !== undefined) where.investScore = { gte: minInvestScore }
  if (minYield !== undefined) where.estimatedYieldGross = { gte: minYield }
  if (successionOnly) where.isSucessionKeyword = true
  if (immoRapportOnly) where.isImmoRapport = true

  const orderBy: any = {
    score: { investScore: 'desc' },
    price_asc: { price: 'asc' },
    price_desc: { price: 'desc' },
    date: { firstSeenAt: 'desc' },
    surface: { surface: 'desc' },
    yield: { estimatedYieldGross: 'desc' },
  }[sortBy] ?? { investScore: 'desc' }

  const [listings, total] = await Promise.all([
    prisma.listing.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        title: true,
        city: true,
        department: true,
        postalCode: true,
        type: true,
        price: true,
        surface: true,
        rooms: true,
        floor: true,
        hasParking: true,
        hasBalcony: true,
        dpe: true,
        investScore: true,
        pricePerSqm: true,
        dvfMedianPricePerSqm: true,
        priceVsDvf: true,
        estimatedRent: true,
        estimatedYieldGross: true,
        estimatedMdbMarginPct: true,
        estimatedRenovCost: true,
        isSucessionKeyword: true,
        isJudiciaryKeyword: true,
        isImmoRapport: true,
        isDivisionPotential: true,
        fraudScore: true,
        photos: true,
        aiDescription: true,
        firstSeenAt: true,
        latitude: true,
        longitude: true,
        source: true,
        sourceUrl: true,
      },
    }),
    prisma.listing.count({ where }),
  ])

  return NextResponse.json({
    listings,
    pagination: {
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    },
  })
}
