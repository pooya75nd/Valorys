import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  segmentData: any
) {
  const id = segmentData.params.id

  const listing = await prisma.listing.findUnique({
    where: { id },
    include: {
      priceHistory: { orderBy: { recordedAt: 'asc' } },
    },
  })

  if (!listing) {
    return NextResponse.json({ error: 'Non trouvé' }, { status: 404 })
  }

  return NextResponse.json(listing)
}
