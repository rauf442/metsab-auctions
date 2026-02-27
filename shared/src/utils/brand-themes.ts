// frontend/shared/src/utils/brand-themes.ts
// Purpose: Brand-specific theme configurations for legal pages

import { LegalPageTheme } from '../types/legal'

export const AURUM_THEME: LegalPageTheme = {
  background: 'bg-gradient-to-br from-black via-gray-900 to-black',
  text: 'text-white',
  accent: 'text-yellow-400',
  border: 'border-yellow-500/60',
  buttonPrimary: 'bg-yellow-500 text-black',
  buttonSecondary: 'bg-yellow-500/10 hover:border-yellow-500',
  contactBg: 'bg-yellow-500/10',
  contactBorder: 'border-yellow-500/20',
  titleHighlight: 'bg-yellow-500/20 text-yellow-100'
}

export const METSAB_THEME: LegalPageTheme = {
  background: 'bg-gradient-to-br from-white via-gray-50 to-white',
  text: 'text-gray-900',
  accent: 'text-blue-600',
  border: 'border-blue-600/60',
  buttonPrimary: 'bg-blue-600 text-white',
  buttonSecondary: 'bg-blue-600/10 hover:border-blue-600',
  contactBg: 'bg-blue-50',
  contactBorder: 'border-blue-200',
  titleHighlight: 'bg-blue-600/10 text-blue-800'
}

/**
 * Gets theme configuration for a brand
 */
export function getBrandTheme(brandCode: string): LegalPageTheme {
  switch (brandCode.toUpperCase()) {
    case 'AURUM':
      return AURUM_THEME
    case 'METSAB':
      return METSAB_THEME
    default:
      // Return default theme (similar to METSAB)
      return METSAB_THEME
  }
}

