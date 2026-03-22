import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  request: Request,
  segmentData: any
) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const id = segmentData.params.id

  await prisma.alert.deleteMany({
    where: { id, userId: session.user.id },
  })
  return NextResponse.json({ success: true })
}

export async function PATCH(
  request: Request,
  segmentData: any
) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const id = segmentData.params.id
  const body = await request.json()

  const alert = await prisma.alert.updateMany({
    where: { id, userId: session.user.id },
    data: { isActive: body.isActive },
  })
  return NextResponse.json(alert)
}
