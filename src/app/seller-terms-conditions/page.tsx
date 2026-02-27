// frontend/metsab/src/app/seller-terms-conditions/page.tsx
// Purpose: Metsab Seller Terms and Conditions page using shared legal component
import { getPublicBrandByCode } from '@msaber/shared'
import { 
  LegalPage, 
  getLegalContent, 
  getBrandTheme, 
  type BrandData 
} from '@msaber/shared'

export const dynamic = 'force-dynamic'

export default async function SellerTermsConditionsPage() {
  const brandData = await getPublicBrandByCode('METSAB') as BrandData

  if (!brandData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-white text-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-blue-600 mb-4">Brand Not Found</h1>
          <p className="text-gray-700">Unable to load brand data for this page.</p>
        </div>
      </div>
    )
  }

  const content = getLegalContent('seller-terms')
  const theme = getBrandTheme('METSAB')

  return (
    <LegalPage 
      brandData={brandData}
      content={content}
      theme={theme}
      backUrl="/"
    />
  )
}