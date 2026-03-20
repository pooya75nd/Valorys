import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/clients'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: any
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
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
            userId,
            planId: plan.id,
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

      case 'customer.subscription.updated': {
        const sub = event.data.object
        const planType = sub.metadata?.planType
        const plan = planType
          ? await prisma.plan.findUnique({ where: { type: planType } })
          : null

        await prisma.userSubscription.updateMany({
          where: { stripeSubscriptionId: sub.id },
          data: {
            ...(plan ? { planId: plan.id } : {}),
            stripeStatus: sub.status,
            stripeCurrentPeriodEnd: new Date(sub.current_period_end * 1000),
            stripeCancelAtPeriodEnd: sub.cancel_at_period_end,
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

      case 'invoice.payment_failed': {
        const invoice = event.data.object
        await prisma.userSubscription.updateMany({
          where: { stripeSubscriptionId: invoice.subscription },
          data: { stripeStatus: 'past_due' },
        })
        break
      }
    }
  } catch (err) {
    console.error('[Webhook] Erreur:', err)
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
