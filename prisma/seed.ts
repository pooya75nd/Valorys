import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding Valorys...')

  const plans = [
    {
      name: 'Découverte', type: 'DECOUVERTE' as const, price: 0,
      stripePriceId: null,
      maxAlerts: 5, maxSimulations: 3, maxPortfolioItems: 2,
      hasMdbCalculator: false, hasFiscalComparison: false, hasDvfAccess: false,
      hasAiAdvisor: false, hasApiAccess: false, hasCsvExport: false,
      hasOffMarketAlerts: false, hasPortfolioTracking: false,
      hasWeeklyReport: false, hasMultiClient: false, alertFrequencyHours: 24,
    },
    {
      name: 'Investisseur', type: 'INVESTISSEUR' as const, price: 19,
      stripePriceId: process.env.STRIPE_INVESTISSEUR_PRICE_ID ?? null,
      maxAlerts: -1, maxSimulations: -1, maxPortfolioItems: 20,
      hasMdbCalculator: false, hasFiscalComparison: true, hasDvfAccess: true,
      hasAiAdvisor: false, hasApiAccess: false, hasCsvExport: true,
      hasOffMarketAlerts: false, hasPortfolioTracking: true,
      hasWeeklyReport: true, hasMultiClient: false, alertFrequencyHours: 6,
    },
    {
      name: 'Marchand', type: 'MARCHAND' as const, price: 49,
      stripePriceId: process.env.STRIPE_MARCHAND_PRICE_ID ?? null,
      maxAlerts: -1, maxSimulations: -1, maxPortfolioItems: -1,
      hasMdbCalculator: true, hasFiscalComparison: true, hasDvfAccess: true,
      hasAiAdvisor: false, hasApiAccess: false, hasCsvExport: true,
      hasOffMarketAlerts: true, hasPortfolioTracking: true,
      hasWeeklyReport: true, hasMultiClient: false, alertFrequencyHours: 6,
    },
    {
      name: 'Pro & Cabinet', type: 'PRO' as const, price: 149,
      stripePriceId: process.env.STRIPE_PRO_PRICE_ID ?? null,
      maxAlerts: -1, maxSimulations: -1, maxPortfolioItems: -1,
      hasMdbCalculator: true, hasFiscalComparison: true, hasDvfAccess: true,
      hasAiAdvisor: true, hasApiAccess: true, hasCsvExport: true,
      hasOffMarketAlerts: true, hasPortfolioTracking: true,
      hasWeeklyReport: true, hasMultiClient: true, alertFrequencyHours: 6,
    },
  ]

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { type: plan.type },
      create: plan,
      update: { price: plan.price, stripePriceId: plan.stripePriceId },
    })
    console.log(`  ✓ Plan ${plan.name}`)
  }

  console.log('✅ Seed terminé')
}

main().catch(console.error).finally(() => prisma.$disconnect())
