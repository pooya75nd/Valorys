export interface Commune92 {
  name: string
  postalCode: string
  lat: number
  lng: number
  population: number
  zone: 'nord' | 'centre' | 'sud'
}

export const COMMUNES_92: Commune92[] = [
  { name: 'Gennevilliers', postalCode: '92230', lat: 48.9306, lng: 2.2978, population: 44000, zone: 'nord' },
  { name: 'Villeneuve-la-Garenne', postalCode: '92390', lat: 48.9367, lng: 2.3239, population: 25000, zone: 'nord' },
  { name: 'Clichy', postalCode: '92110', lat: 48.9042, lng: 2.3054, population: 62000, zone: 'nord' },
  { name: 'Levallois-Perret', postalCode: '92300', lat: 48.8955, lng: 2.2876, population: 65000, zone: 'nord' },
  { name: 'Neuilly-sur-Seine', postalCode: '92200', lat: 48.8848, lng: 2.2698, population: 61000, zone: 'nord' },
  { name: 'Courbevoie', postalCode: '92400', lat: 48.8972, lng: 2.2542, population: 82000, zone: 'nord' },
  { name: 'La Garenne-Colombes', postalCode: '92250', lat: 48.9050, lng: 2.2517, population: 30000, zone: 'nord' },
  { name: 'Colombes', postalCode: '92700', lat: 48.9199, lng: 2.2537, population: 87000, zone: 'nord' },
  { name: 'Bois-Colombes', postalCode: '92270', lat: 48.9101, lng: 2.2686, population: 30000, zone: 'nord' },
  { name: 'Asnières-sur-Seine', postalCode: '92600', lat: 48.9154, lng: 2.2902, population: 88000, zone: 'nord' },
  { name: 'Puteaux', postalCode: '92800', lat: 48.8826, lng: 2.2370, population: 45000, zone: 'centre' },
  { name: 'Nanterre', postalCode: '92000', lat: 48.8922, lng: 2.2069, population: 92000, zone: 'centre' },
  { name: 'Rueil-Malmaison', postalCode: '92500', lat: 48.8773, lng: 2.1887, population: 80000, zone: 'centre' },
  { name: 'Suresnes', postalCode: '92150', lat: 48.8703, lng: 2.2295, population: 48000, zone: 'centre' },
  { name: 'Saint-Cloud', postalCode: '92210', lat: 48.8468, lng: 2.2131, population: 32000, zone: 'centre' },
  { name: 'Garches', postalCode: '92380', lat: 48.8468, lng: 2.1853, population: 19000, zone: 'centre' },
  { name: 'Vaucresson', postalCode: '92420', lat: 48.8331, lng: 2.1575, population: 8600, zone: 'centre' },
  { name: "Ville-d'Avray", postalCode: '92410', lat: 48.8276, lng: 2.1890, population: 11000, zone: 'centre' },
  { name: 'Sèvres', postalCode: '92310', lat: 48.8260, lng: 2.2125, population: 24000, zone: 'centre' },
  { name: 'Chaville', postalCode: '92370', lat: 48.8097, lng: 2.1936, population: 20000, zone: 'centre' },
  { name: 'Meudon', postalCode: '92190', lat: 48.8128, lng: 2.2318, population: 45000, zone: 'centre' },
  { name: 'Issy-les-Moulineaux', postalCode: '92130', lat: 48.8241, lng: 2.2780, population: 68000, zone: 'sud' },
  { name: 'Vanves', postalCode: '92170', lat: 48.8204, lng: 2.2918, population: 27000, zone: 'sud' },
  { name: 'Malakoff', postalCode: '92240', lat: 48.8163, lng: 2.2989, population: 31000, zone: 'sud' },
  { name: 'Montrouge', postalCode: '92120', lat: 48.8187, lng: 2.3186, population: 49000, zone: 'sud' },
  { name: 'Châtillon', postalCode: '92320', lat: 48.8037, lng: 2.2922, population: 38000, zone: 'sud' },
  { name: 'Bagneux', postalCode: '92220', lat: 48.7969, lng: 2.3069, population: 38000, zone: 'sud' },
  { name: 'Fontenay-aux-Roses', postalCode: '92260', lat: 48.7937, lng: 2.2878, population: 24000, zone: 'sud' },
  { name: 'Le Plessis-Robinson', postalCode: '92350', lat: 48.7826, lng: 2.2637, population: 30000, zone: 'sud' },
  { name: 'Clamart', postalCode: '92140', lat: 48.8021, lng: 2.2625, population: 53000, zone: 'sud' },
  { name: 'Châtenay-Malabry', postalCode: '92290', lat: 48.7746, lng: 2.2697, population: 34000, zone: 'sud' },
  { name: 'Antony', postalCode: '92160', lat: 48.7554, lng: 2.2996, population: 61000, zone: 'sud' },
  { name: 'Sceaux', postalCode: '92330', lat: 48.7774, lng: 2.2960, population: 21000, zone: 'sud' },
  { name: 'Bourg-la-Reine', postalCode: '92340', lat: 48.7861, lng: 2.3148, population: 21000, zone: 'sud' },
  { name: 'Boulogne-Billancourt', postalCode: '92100', lat: 48.8369, lng: 2.2380, population: 120000, zone: 'sud' },
  { name: 'Marnes-la-Coquette', postalCode: '92430', lat: 48.8265, lng: 2.1717, population: 1800, zone: 'centre' },
]

export const COMMUNES_92_NAMES = COMMUNES_92.map(c => c.name).sort()

export const getCommuneByName = (name: string) =>
  COMMUNES_92.find(c => c.name.toLowerCase() === name.toLowerCase())

export const getCommuneByPostalCode = (code: string) =>
  COMMUNES_92.find(c => c.postalCode === code)
