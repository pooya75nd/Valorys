import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const favorites = await prisma.favorite.findMany({
    where: { userId: session.user.id },
    include: {
      listing: {
        select: {
          id: true,
          title: true,
          city: true,
          department: true,
          type: true,
          price: true,
          surface: true,
          investScore: true,
          photos: true,
          isActive: true,
          priceVsDvf: true,
          estimatedYieldGross: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(favorites)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { listingId, note } = await req.json()
  const fav = await prisma.favorite.upsert({
    where: {
      userId_listingId: { userId: session.user.id, listingId },
    },
    create: { userId: session.user.id, listingId, note },
    update: { note },
  })
  return NextResponse.json(fav)
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { listingId } = await req.json()
  await prisma.favorite.deleteMany({
    where: { userId: session.user.id, listingId },
  })
  return NextResponse.json({ success: true })
}
