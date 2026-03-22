import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

type Props = { params: Promise<{ id: string }> }

export async function DELETE(
  _req: NextRequest,
  { params }: Props
) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  await prisma.alert.deleteMany({
    where: { id, userId: session.user.id },
  })
  return NextResponse.json({ success: true })
}

export async function PATCH(
  req: NextRequest,
  { params }: Props
) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const body = await req.json()

  const alert = await prisma.alert.updateMany({
    where: { id, userId: session.user.id },
    data: { isActive: body.isActive },
  })
  return NextResponse.json(alert)
}
