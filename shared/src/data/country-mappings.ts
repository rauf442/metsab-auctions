// frontend/shared/src/data/country-mappings.ts
export interface CountryMapping {
  destination: 'within_uk' | 'international'
  country: string
}

export const COUNTRY_CODE_MAPPINGS: Record<string, CountryMapping> = {
  'GB': { destination: 'within_uk', country: 'United Kingdom' },
  'UK': { destination: 'within_uk', country: 'United Kingdom' },
  'US': { destination: 'international', country: 'United States' },
  'IN': { destination: 'international', country: 'India' },
  'DE': { destination: 'international', country: 'Germany' },
  'FR': { destination: 'international', country: 'France' }
}

export const getCountryMapping = (countryCode: string): CountryMapping => {
  return COUNTRY_CODE_MAPPINGS[countryCode?.toUpperCase()] || {
    destination: 'international',
    country: 'Unknown'
  }
}

export const getAvailableCountryCodes = (): string[] => {
  return Object.keys(COUNTRY_CODE_MAPPINGS)
}



