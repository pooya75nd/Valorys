import { prisma } from '../prisma'

export interface InvestDealAnalysis {
  investScore: number | null
  investScoreDetails: null
  aiDescription: null
  pricePerSqm: number | null
  dvfMedianPricePerSqm: null
  dvfTransactionCount: number
  priceVsDvf: null
  estimatedRent: number | null
  estimatedYieldGross: number | null
  estimatedResalePrice: null
  estimatedRenovCost: number
  estimatedMdbMarginPct: null
  isSucessionKeyword: boolean
  isJudiciaryKeyword: boolean
  isDivisionPotential: boolean
  isImmoRapport: boolean
  fraudScore: number
  fraudFlags: string[]
}

// Loyer estimé par département
const LOYER_PAR_M2: Record<string, number> = {
  '75': 28, '92': 24, '93': 18, '94': 20,
  '69': 14, '13': 13, '31': 13, '33': 14,
  '06': 15, '34': 12, '59': 12, '44': 13,
}

function detecterOpportunites(title: string, description: string | null) {
  const texte = (title + ' ' + (description ?? '')).toLowerCase()
  return {
    isSucession: /succession|héritier|décès/.test(texte),
    isJudiciaire: /saisie|licitation|judiciaire|adjudication/.test(texte),
    isDivision: /division|immeuble divisible/.test(texte),
    isImmoRapport: /immeuble de rapport|ensemble immobilier/.test(texte),
  }
}

export async function analyzeDeal(listing: {
  title: string
  description: string | null
  price: number
  surface: number | null
  department: string
}): Promise<InvestDealAnalysis> {
  const surface = listing.surface ?? 0
  const pricePerSqm = surface > 0 ? listing.price / surface : null
  const loyerParM2 = LOYER_PAR_M2[listing.department] ?? 9
  const estimatedRent = surface > 0 ? loyerParM2 * surface : null
  const estimatedYieldGross = estimatedRent && surface > 0
    ? ((estimatedRent * 12) / listing.price) * 100
    : null

  const opportunites = detecterOpportunites(listing.title, listing.description)

  // Score basique sans IA
  let score = 50
  if (estimatedYieldGross) {
    if (estimatedYieldGross >= 8) score += 30
    else if (estimatedYieldGross >= 6) score += 20
    else if (estimatedYieldGross >= 4) score += 10
  }
  if (opportunites.isSucession) score += 5
  if (opportunites.isJudiciaire) score += 8
  if (opportunites.isImmoRapport) score += 5

  const fraudFlags: string[] = []
  let fraudScore = 0
  if (!listing.description || listing.description.length < 50) {
    fraudFlags.push('Description insuffisante')
    fraudScore += 10
  }

  return {
    investScore: Math.min(100, Math.max(0, score)),
    investScoreDetails: null,
    aiDescription: null,
    pricePerSqm,
    dvfMedianPricePerSqm: null,
    dvfTransactionCount: 0,
    priceVsDvf: null,
    estimatedRent,
    estimatedYieldGross,
    estimatedResalePrice: null,
    estimatedRenovCost: 0,
    estimatedMdbMarginPct: null,
    isSucessionKeyword: opportunites.isSucession,
    isJudiciaryKeyword: opportunites.isJudiciaire,
    isDivisionPotential: opportunites.isDivision,
    isImmoRapport: opportunites.isImmoRapport,
    fraudScore,
    fraudFlags,
  }
}
