// Analyse avancée — activée quand clé Anthropic disponible

export interface PhotoAnalysis {
  qualityScore: number
  luminosity: string
  condition: string
  summary: string
}

export interface FraudAnalysis {
  fraudScore: number
  flags: string[]
  isSuspicious: boolean
  explanation: string
}

export interface DealDecayAnalysis {
  probabilityGoneIn24h: number
  probabilityGoneIn48h: number
  urgencyTag: string
}

export function computeDealDecay(
  dealScore: number,
  firstSeenAt: Date,
  city: string
): DealDecayAnalysis {
  const ageHours = (Date.now() - firstSeenAt.getTime()) / (1000 * 60 * 60)
  let base24h = dealScore >= 80 ? 70 : dealScore >= 65 ? 45 : dealScore >= 50 ? 25 : 10

  if (ageHours > 48) base24h = Math.max(5, base24h - 30)
  else if (ageHours > 24) base24h = Math.max(5, base24h - 15)
  else if (ageHours < 6) base24h = Math.min(95, base24h + 10)

  const prob24h = Math.min(95, Math.max(2, base24h))
  const prob48h = Math.min(98, prob24h + 15)

  const urgencyTag =
    ageHours > 72 ? 'En ligne depuis longtemps' :
    prob24h >= 70 ? 'Prend vite !' :
    prob24h >= 45 ? 'Compétitif' : 'Disponible'

  return { probabilityGoneIn24h: prob24h, probabilityGoneIn48h: prob48h, urgencyTag }
}

export function computeRealCost(
  price: number,
  charges: number | null,
  chargesIncluded: boolean
) {
  const monthlyCharges = chargesIncluded ? 0 : (charges ?? Math.round(price * 0.1))
  const monthlyTotal = price + monthlyCharges
  const deposit = price * 2
  const entryTotal = deposit + price

  return {
    monthlyTotal,
    entryTotal,
    breakdown: { rent: price, charges: monthlyCharges, deposit, agencyFees: null, moving: 500 },
  }
}
