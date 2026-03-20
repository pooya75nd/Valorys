export const PLAN_LIMITS = {
  DECOUVERTE: {
    maxAlerts: 5,
    maxSimulations: 3,
    maxPortfolioItems: 2,
    refreshIntervalHours: 24,
    hasMdbCalculator: false,
    hasFiscalComparison: false,
    hasDvfAccess: false,
    hasAiAdvisor: false,
    hasApiAccess: false,
    hasCsvExport: false,
    hasOffMarketAlerts: false,
    hasPortfolioTracking: false,
    hasWeeklyReport: false,
    hasMultiClient: false,
  },
  INVESTISSEUR: {
    maxAlerts: -1,
    maxSimulations: -1,
    maxPortfolioItems: 20,
    refreshIntervalHours: 6,
    hasMdbCalculator: false,
    hasFiscalComparison: true,
    hasDvfAccess: true,
    hasAiAdvisor: false,
    hasApiAccess: false,
    hasCsvExport: true,
    hasOffMarketAlerts: false,
    hasPortfolioTracking: true,
    hasWeeklyReport: true,
    hasMultiClient: false,
  },
  MARCHAND: {
    maxAlerts: -1,
    maxSimulations: -1,
    maxPortfolioItems: -1,
    refreshIntervalHours: 6,
    hasMdbCalculator: true,
    hasFiscalComparison: true,
    hasDvfAccess: true,
    hasAiAdvisor: false,
    hasApiAccess: false,
    hasCsvExport: true,
    hasOffMarketAlerts: true,
    hasPortfolioTracking: true,
    hasWeeklyReport: true,
    hasMultiClient: false,
  },
  PRO: {
    maxAlerts: -1,
    maxSimulations: -1,
    maxPortfolioItems: -1,
    refreshIntervalHours: 6,
    hasMdbCalculator: true,
    hasFiscalComparison: true,
    hasDvfAccess: true,
    hasAiAdvisor: true,
    hasApiAccess: true,
    hasCsvExport: true,
    hasOffMarketAlerts: true,
    hasPortfolioTracking: true,
    hasWeeklyReport: true,
    hasMultiClient: true,
  },
}

export type PlanType = keyof typeof PLAN_LIMITS

export const formatPrice = (price: number): string =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price)

export const formatSurface = (surface: number): string =>
  `${surface} m²`

export const getScoreLabel = (score: number): string => {
  if (score >= 85) return '🔥 Opportunité exceptionnelle'
  if (score >= 75) return '⭐ Très bonne opportunité'
  if (score >= 60) return '👍 Bonne opportunité'
  if (score >= 45) return '😐 Prix du marché'
  return '📈 Au-dessus du marché'
}

export const getScoreColor = (score: number): string => {
  if (score >= 80) return '#10b981'
  if (score >= 60) return '#f59e0b'
  if (score >= 40) return '#f97316'
  return '#ef4444'
}
