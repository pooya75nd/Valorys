import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const subscription = await prisma.userSubscription.findUnique({
    where: { userId: session.user.id },
    include: { plan: true },
  })

  return NextResponse.json({
    plan: subscription?.plan ?? null,
    stripeStatus: subscription?.stripeStatus ?? null,
    currentPeriodEnd: subscription?.stripeCurrentPeriodEnd ?? null,
    cancelAtPeriodEnd: subscription?.stripeCancelAtPeriodEnd ?? false,
  })
}
