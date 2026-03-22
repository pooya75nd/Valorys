import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = new URL(request.url)
  const id = url.pathname.split('/').pop() ?? ''

  await prisma.alert.deleteMany({
    where: { id, userId: session.user.id },
  })
  return NextResponse.json({ success: true })
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = new URL(request.url)
  const id = url.pathname.split('/').pop() ?? ''
  const body = await request.json()

  const alert = await prisma.alert.updateMany({
    where: { id, userId: session.user.id },
    data: { isActive: body.isActive },
  })
  return NextResponse.json(alert)
}
