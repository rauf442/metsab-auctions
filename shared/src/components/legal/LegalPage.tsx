// frontend/shared/src/components/legal/LegalPage.tsx
// Purpose: Reusable legal page component with brand theming and content support

import Link from 'next/link'
import { LegalPageContent, LegalPageTheme, BrandData } from '../../types/legal'
import { processLegalContent, getBrandLegalContent } from '../../utils/legal-placeholder'


// Helper function to convert text color classes to background color classes and determine text color
function getBadgeStyles(textClass: string): { bgClass: string; textClass: string } {
  // Extract the color part from text-color class and convert to bg-color
  const colorMatch = textClass.match(/text-(\w+)-(\d+)/)
  if (colorMatch) {
    const colorName = colorMatch[1]
    const shade = colorMatch[2]

    // For numbered badges, use appropriate colors for good contrast
    if (colorName === 'yellow' && shade === '400') {
      return { bgClass: 'bg-yellow-500', textClass: 'text-black' } // yellow bg needs black text
    } else if (colorName === 'blue' && shade === '600') {
      return { bgClass: 'bg-blue-600', textClass: 'text-white' } // blue bg can use white text
    }

    return { bgClass: `bg-${colorName}-${shade}`, textClass: 'text-white' }
  }
  return { bgClass: 'bg-gray-500', textClass: 'text-white' } // fallback
}

interface LegalPageProps {
  brandData: BrandData
  content: LegalPageContent
  theme: LegalPageTheme
  backUrl?: string
}

export function LegalPage({ brandData, content, theme, backUrl = '/' }: LegalPageProps) {
  // Check if brand has custom legal content, otherwise use template
  const brandLegalContent = getBrandLegalContent(brandData, content.pageType)
  const useCustomContent = brandLegalContent && brandLegalContent.trim().length > 0

  return (
    <div className={`min-h-screen ${theme.background} ${theme.text}`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href={backUrl}
            className={`inline-flex items-center gap-2 px-4 py-2 border ${theme.border} ${theme.accent} font-medium rounded-full ${theme.buttonSecondary} transition-all duration-300`}
          >
            ← Back to Home
          </Link>
        </div>

        <div className="max-w-none">
          {/* Page Header */}
          <div className="text-center mb-12">
            {/* Page Title */}
            <h1
              className={`inline-flex items-center justify-center px-6 py-2 text-4xl md:text-5xl font-bold ${theme.titleHighlight} rounded-full mb-4 leading-tight shadow-sm border ${theme.border}`}
            >
              {processLegalContent(content.title, brandData)}
            </h1>

            {/* Subtitle */}
            {content.subtitle && (
              <p className={`text-xl md:text-2xl ${theme.text.replace('text-', 'text-')}/70 mb-6 font-light`}>
                {processLegalContent(content.subtitle, brandData)}
              </p>
            )}

            {/* Description */}
            {content.description && (
              <div className={`max-w-3xl mx-auto ${theme.text.replace('text-', 'text-')}/80 leading-relaxed text-lg`}>
                <p className="font-medium italic">
                  {processLegalContent(content.description, brandData)}
                </p>
              </div>
            )}
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {useCustomContent ? (
              // Use custom brand content from database
              <div className={`prose prose-lg max-w-none ${theme.text.replace('text-', 'text-')}/90 leading-relaxed`}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: processLegalContent(brandLegalContent, brandData)
                  }}
                />
              </div>
            ) : (
              // Use template content with placeholders
              content.sections
                .sort((a, b) => a.order - b.order)
                .map((section) => {
                  const processedTitle = processLegalContent(section.title, brandData)
                  const { bgClass: bgColorClass } = getBadgeStyles(theme.accent)

                  return (
                    <div key={section.id} className="mb-16">
                      {section.title && (
                        <div className="mb-4">
                          <h3
                            className={`${theme.accent} text-2xl font-bold mb-3 leading-tight ${theme.titleHighlight}`}
                          >
                            {processedTitle}
                          </h3>
                          {/* Decorative line */}
                          <div className={`h-0.5 w-16 ${bgColorClass} opacity-60 rounded-full mb-6`}></div>
                        </div>
                      )}

                      {/* Section content with improved typography */}
                      <div className={`${theme.text.replace('text-', 'text-')}/90 leading-relaxed text-base md:text-lg`}>
                        <div
                          className="prose prose-lg max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: processLegalContent(section.content, brandData)
                              .replace(/\n\n/g, '</p><p>')
                              .replace(/\n/g, '<br/>')
                              .replace(/^/, '<p>')
                              .replace(/$/, '</p>')
                          }}
                        />
                      </div>
                    </div>
                  )
                })
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className={`mt-16 ${theme.contactBg} border ${theme.contactBorder} rounded-2xl p-8 text-center shadow-lg`}>
          <div className="mb-6">
            <h3 className={`${theme.accent} text-2xl font-bold mb-3`}>
              {processLegalContent(content.contactSection.title, brandData)}
            </h3>
            <p className={`${theme.text.replace('text-', 'text-')}/80 text-lg leading-relaxed`}>
              {processLegalContent(content.contactSection.description, brandData)}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {brandData?.contact_email && (
              <a
                href={`mailto:${brandData.contact_email}`}
                className={`flex items-center gap-3 px-6 py-3 ${theme.contactBg} border ${theme.contactBorder} rounded-xl ${theme.text.replace('text-', 'text-')}/90 hover:${theme.accent} hover:border-opacity-60 transition-all duration-300 shadow-sm hover:shadow-md`}
              >
                <div className={`w-5 h-5 ${theme.accent} opacity-70`}>
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <span className="font-medium">{brandData.contact_email}</span>
              </a>
            )}
            {brandData?.contact_phone && (
              <a
                href={`tel:${brandData.contact_phone}`}
                className={`flex items-center gap-3 px-6 py-3 ${theme.contactBg} border ${theme.contactBorder} rounded-xl ${theme.text.replace('text-', 'text-')}/90 hover:${theme.accent} hover:border-opacity-60 transition-all duration-300 shadow-sm hover:shadow-md`}
              >
                <div className={`w-5 h-5 ${theme.accent} opacity-70`}>
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </div>
                <span className="font-medium">{brandData.contact_phone}</span>
              </a>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center">
          <Link
            href={content.navigation.primaryLink.href}
            className={`px-8 py-4 ${theme.buttonPrimary} font-bold rounded-xl hover:opacity-90 hover:shadow-lg transition-all duration-300 text-center min-w-[200px] shadow-md`}
          >
            {content.navigation.primaryLink.text}
          </Link>
          <div className="flex flex-wrap gap-3 justify-center">
            {content.navigation.secondaryLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={`px-6 py-3 border-2 ${theme.border} ${theme.accent} font-medium rounded-lg ${theme.buttonSecondary} hover:shadow-md transition-all duration-300 text-center`}
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

