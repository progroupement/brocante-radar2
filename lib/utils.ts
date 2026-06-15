import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const DEPARTEMENTS_IDF = [
  { code: '75', nom: 'Paris', slug: 'paris' },
  { code: '77', nom: 'Seine-et-Marne', slug: 'seine-et-marne' },
  { code: '78', nom: 'Yvelines', slug: 'yvelines' },
  { code: '91', nom: 'Essonne', slug: 'essonne' },
  { code: '92', nom: 'Hauts-de-Seine', slug: 'hauts-de-seine' },
  { code: '93', nom: 'Seine-Saint-Denis', slug: 'seine-saint-denis' },
  { code: '94', nom: 'Val-de-Marne', slug: 'val-de-marne' },
  { code: '95', nom: "Val-d'Oise", slug: 'val-d-oise' },
]

export const KEYWORDS_SUGGESTIONS = [
  'Playmobil', 'Lego', 'Vinyles', 'Livres', 'Nintendo',
  'Outils', 'Meubles', 'Vêtements', 'Déco', 'Jouets',
  'Vaisselle', 'Tableaux', 'Bijoux', 'Montres', 'Vintage',
  'Électronique', 'Vélos', 'Sports', 'Cuisine', 'Textiles',
]
