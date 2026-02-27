// frontend/shared/src/components/info/FaqPage.tsx
// Purpose: Enhanced FAQ page with improved styling and accordion behavior
'use client'
import React, { useState } from 'react'
import { defaultTheme } from '../../lib/theme-utils'
import { PrimaryButton } from '../ui/PrimaryButton'

export interface FaqItem {
  q: string
  a: React.ReactNode
  category?: string
}

interface FaqPageProps {
  title?: string
  intro?: string
  items: FaqItem[]
}

export default function FaqPage({ title = 'Frequently Asked Questions', intro, items }: FaqPageProps) {
  const theme = defaultTheme
  const categories = Array.from(new Set(items.map(i => i.category).filter(Boolean))) as string[]
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (itemKey: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(itemKey)) {
      newOpenItems.delete(itemKey)
    } else {
      newOpenItems.add(itemKey)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass}`}>
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
          {intro && <p className="text-lg leading-relaxed max-w-3xl mx-auto opacity-90">{intro}</p>}
        </header>

        {categories.length > 0 ? (
          <div className="space-y-12">
            {categories.map((cat) => (
              <section key={cat}>
                <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-current opacity-80">{cat}</h2>
                <div className="space-y-2">
                  {items.filter(i => i.category === cat).map((item, idx) => {
                    const itemKey = `${cat}-${idx}`
                    const isOpen = openItems.has(itemKey)
                    return (
                      <div key={itemKey} className={`rounded-lg border ${theme.borderClass} ${theme.cardBgClass} overflow-hidden transition-all duration-200 hover:shadow-md`}>
                        <button
                          onClick={() => toggleItem(itemKey)}
                          className={`w-full px-6 py-4 text-left flex items-center justify-between hover:bg-opacity-5 hover:bg-current transition-colors duration-200`}
                          aria-expanded={isOpen}
                        >
                          <span className="text-lg font-medium pr-4">{item.q}</span>
                          <svg 
                            className={`w-5 h-5 transform transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-6 pt-2">
                            <div className="text-base leading-relaxed opacity-90 prose prose-sm max-w-none">
                              {item.a}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="space-y-2 max-w-3xl mx-auto">
            {items.map((item, idx) => {
              const itemKey = `item-${idx}`
              const isOpen = openItems.has(itemKey)
              return (
                <div key={itemKey} className={`rounded-lg border ${theme.borderClass} ${theme.cardBgClass} overflow-hidden transition-all duration-200 hover:shadow-md`}>
                  <button
                    onClick={() => toggleItem(itemKey)}
                    className={`w-full px-6 py-4 text-left flex items-center justify-between hover:bg-opacity-5 hover:bg-current transition-colors duration-200`}
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg font-medium pr-4">{item.q}</span>
                    <svg 
                      className={`w-5 h-5 transform transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-2">
                      <div className="text-base leading-relaxed opacity-90 prose prose-sm max-w-none">
                        {item.a}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Contact Section */}
        <section className={`mt-16 rounded-xl border ${theme.borderClass} ${theme.cardBgClass} p-8 text-center`}>
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="text-lg opacity-80 mb-6">
            Can't find the answer you're looking for? Our team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryButton
              href="mailto:support@example.com"
              size="lg"
            >
              Email Support
            </PrimaryButton>
            <a 
              href="tel:+1234567890"
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${theme.secondaryButtonClass}`}
            >
              Call Us
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}


