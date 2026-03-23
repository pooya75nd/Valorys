export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const { prisma } = await import('@/lib/prisma')
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const favorites = await prisma.favorite.findMany({
      where: { userId: session.user.id },
      include: {
        listing: {
          select: {
            id: true, title: true, city: true, type: true,
            price: true, surface: true, investScore: true,
            photos: true, isActive: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(favorites)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { prisma } = await import('@/lib/prisma')
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { listingId, note } = await req.json()
    const fav = await prisma.favorite.upsert({
      where: { userId_listingId: { userId: session.user.id, listingId } },
      create: { userId: session.user.id, listingId, note },
      update: { note },
    })
    return NextResponse.json(fav)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { prisma } = await import('@/lib/prisma')
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { listingId } = await req.json()
    await prisma.favorite.deleteMany({
      where: { userId: session.user.id, listingId },
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
