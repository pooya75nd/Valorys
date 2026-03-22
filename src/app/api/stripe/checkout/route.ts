import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { planType } = await req.json()
    if (!['INVESTISSEUR', 'MARCHAND', 'PRO'].includes(planType)) {
      return NextResponse.json({ error: 'Plan invalide' }, { status: 400 })
    }

    // Stripe désactivé pour l'instant
    if (process.env.STRIPE_SECRET_KEY === 'sk_test_disabled') {
      return NextResponse.json(
        { error: 'Paiements non configurés' },
        { status: 503 }
      )
    }

    const { stripe } = await import('@/lib/clients')
    const plan = await prisma.plan.findUnique({ where: { type: planType } })
    if (!plan?.stripePriceId) {
      return NextResponse.json({ error: 'Plan non configuré' }, { status: 500 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    let customerId = user?.stripeCustomerId
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: session.user.email!,
        name: session.user.name ?? undefined,
        metadata: { userId: session.user.id },
      })
      customerId = customer.id
      await prisma.user.update({
        where: { id: session.user.id },
        data: { stripeCustomerId: customerId },
      })
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: plan.stripePriceId, quantity: 1 }],
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing?canceled=true`,
      locale: 'fr',
      metadata: { userId: session.user.id, planType },
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
