// frontend/shared/src/types/legal.ts
// Purpose: Types and interfaces for legal content structure with brand placeholder support

export interface BrandData {
  id: number
  name: string
  code: string
  brand_address?: string | null
  contact_email?: string | null
  contact_phone?: string | null
  website_url?: string | null
  company_registration?: string | null
  business_license?: string | null
  vat_number?: string | null
  eori_number?: string | null
  buyer_terms_and_conditions?: string | null
  privacy_policy?: string | null
  terms_and_conditions?: string | null
  vendor_terms_and_conditions?: string | null
}

export interface LegalContentSection {
  id: string
  title: string
  content: string
  order: number
}

export interface LegalPageContent {
  pageType: 'privacy-policy' | 'buyer-terms' | 'seller-terms'
  title: string
  subtitle?: string
  description?: string
  sections: LegalContentSection[]
  contactSection: {
    title: string
    description: string
  }
  navigation: {
    primaryLink: {
      text: string
      href: string
    }
    secondaryLinks: Array<{
      text: string
      href: string
    }>
  }
}

export interface LegalPageTheme {
  background: string
  text: string
  accent: string
  border: string
  buttonPrimary: string
  buttonSecondary: string
  contactBg: string
  contactBorder: string
  titleHighlight: string
}

export interface BrandPlaceholders {
  brandName: string
  brandAddress: string
  brandPhone: string
  brandEmail: string
  brandWebsite: string
  companyRegistration: string
  businessLicense: string
  vatNumber: string
  eoriNumber: string
}

