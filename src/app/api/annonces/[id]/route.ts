import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const listing = await prisma.listing.findUnique({
    where: { id: params.id },
    include: {
      priceHistory: { orderBy: { recordedAt: 'asc' } },
    },
  })
  if (!listing) {
    return NextResponse.json({ error: 'Non trouvé' }, { status: 404 })
  }
  return NextResponse.json(listing)
}
