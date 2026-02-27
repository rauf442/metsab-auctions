// frontend/shared/src/utils/legal-placeholder.ts
// Purpose: Utility functions for replacing brand placeholders in legal content

import { BrandData, BrandPlaceholders } from '../types/legal'

const LEGACY_LEGAL_MARKERS = [
  /squarespace/i,
  /Squarespace functionality cookies/i,
  /static1\.squarespace\.com/i,
  /assets\.squarespace\.com/i
]

function sanitizeBrandContent(raw: string | null): string | null {
  if (!raw) return null

  const containsLegacyMarkers = LEGACY_LEGAL_MARKERS.some((regex) => regex.test(raw))
  if (containsLegacyMarkers) {
    return null
  }

  return raw
}

/**
 * Creates brand placeholders object from brand data
 */
export function createBrandPlaceholders(brandData: BrandData): BrandPlaceholders {
  return {
    brandName: brandData.name || '',
    brandAddress: brandData.brand_address || '',
    brandPhone: brandData.contact_phone || '',
    brandEmail: brandData.contact_email || '',
    brandWebsite: brandData.website_url || '',
    companyRegistration: brandData.company_registration || '',
    businessLicense: brandData.business_license || '',
    vatNumber: brandData.vat_number || '',
    eoriNumber: brandData.eori_number || ''
  }
}

/**
 * Replaces placeholders in content with brand data
 */
export function replacePlaceholders(content: string, placeholders: BrandPlaceholders): string {
  let result = content

  // Replace all placeholders with actual brand data
  Object.entries(placeholders).forEach(([key, value]) => {
    const placeholder = `[${key}]`
    const regex = new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
    result = result.replace(regex, value)
  })

  return result
}

/**
 * Processes legal content with brand data replacement
 */
export function processLegalContent(content: string, brandData: BrandData): string {
  const placeholders = createBrandPlaceholders(brandData)
  return replacePlaceholders(content, placeholders)
}

/**
 * Gets brand-specific legal content from database fields
 */
export function getBrandLegalContent(
  brandData: BrandData,
  contentType: 'privacy-policy' | 'buyer-terms' | 'seller-terms' | 'vendor-terms'
): string | null {
  let rawContent: string | null = null

  switch (contentType) {
    case 'privacy-policy':
      rawContent = brandData.privacy_policy ?? null
      break
    case 'buyer-terms':
      rawContent = brandData.buyer_terms_and_conditions ?? null
      break
    case 'seller-terms':
    case 'vendor-terms':
      rawContent = brandData.vendor_terms_and_conditions ?? brandData.terms_and_conditions ?? null
      break
    default:
      return null
  }

  return sanitizeBrandContent(rawContent)
}
