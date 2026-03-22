import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.pathname.split('/').pop() ?? ''

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
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
