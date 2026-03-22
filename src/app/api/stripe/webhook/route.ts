import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    if (process.env.STRIPE_WEBHOOK_SECRET === 'whsec_disabled') {
      return NextResponse.json({ received: true })
    }

    const { stripe } = await import('@/lib/clients')
    const body = await req.text()
    const sig = req.headers.get('stripe-signature')!

    let event: any
    try {
      event = stripe.webhooks.constructEvent(
        body, sig, process.env.STRIPE_WEBHOOK_SECRET!
      )
    } catch (err: any) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const s = event.data.object
        const userId = s.metadata?.userId
        const planType = s.metadata?.planType
        if (!userId || !planType) break

        const plan = await prisma.plan.findUnique({ where: { type: planType } })
        if (!plan) break

        await prisma.userSubscription.upsert({
          where: { userId },
          create: {
            userId, planId: plan.id,
            stripeSubscriptionId: s.subscription,
            stripeStatus: 'active',
            stripeCurrentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          },
          update: {
            planId: plan.id,
            stripeSubscriptionId: s.subscription,
            stripeStatus: 'active',
          },
        })
        break
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object
        const freePlan = await prisma.plan.findUnique({
          where: { type: 'DECOUVERTE' },
        })
        if (freePlan) {
          await prisma.userSubscription.updateMany({
            where: { stripeSubscriptionId: sub.id },
            data: { planId: freePlan.id, stripeStatus: 'canceled' },
          })
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
