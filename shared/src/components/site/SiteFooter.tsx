// frontend/shared/src/components/site/SiteFooter.tsx
// Purpose: Brandable footer shared across sites with dynamic brand data
'use client'
import React, { useState, useEffect } from 'react'
import { getPublicBrandByCode, type BrandInfo } from '../../api/auctions-api'
export interface FooterLinkGroup {
  title: string
  links: { label: string; href: string }[]
}
export interface SiteFooterTheme {
  bgClass: string
  borderClass: string
  textClass: string
  headingClass: string
  inputClass: string
  buttonClass: string
}
export interface SiteFooterProps {
  linkGroups: FooterLinkGroup[]
  locations?: React.ReactNode
  social?: React.ReactNode
  newsletter?: boolean
  theme: SiteFooterTheme
  brandCopyright: string
  brandCode?: string
}
export function SiteFooter({ linkGroups, locations, social, newsletter = true, theme, brandCopyright, brandCode }: SiteFooterProps) {
  const [brandData, setBrandData] = useState<BrandInfo | null>(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (brandCode) {
      setLoading(true)
      getPublicBrandByCode(brandCode)
        .then(data => {
          setBrandData(data)
        })
        .catch(err => {
          console.error('Failed to fetch brand data:', err)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [brandCode])
  // Dynamic location component based on brand data
  const DynamicLocations = () => {
    if (loading) {
      return <div className="text-sm opacity-70">Loading contact information...</div>
    }
    if (!brandData) {
      return locations || <div className="text-sm opacity-70">Contact information not available</div>
    }
    return (
      <div className="space-y-3 text-sm">
        {brandData.brand_address && (
          <div>
            <div className="font-medium mb-1">Address</div>
            <div className="whitespace-pre-line">{brandData.brand_address}</div>
          </div>
        )}
        <div className="space-y-1">
          {brandData.contact_phone && (
            <div>
              <span className="font-medium">T: </span>
              <a href={`tel:${brandData.contact_phone}`} className="hover:underline">
                {brandData.contact_phone}
              </a>
            </div>
          )}
          {brandData.contact_email && (
            <div>
              <span className="font-medium">E: </span>
              <a href={`mailto:${brandData.contact_email}`} className="hover:underline">
                {brandData.contact_email}
              </a>
            </div>
          )}
          {brandData.business_whatsapp_number && (
            <div>
              <span className="font-medium">WhatsApp: </span>
              <a href={`https://wa.me/${brandData.business_whatsapp_number.replace(/[^0-9]/g, '')}`} className="hover:underline" target="_blank" rel="noopener noreferrer">
                {brandData.business_whatsapp_number}
              </a>
            </div>
          )}
        </div>
      </div>
    )
  }
  // Static legal links (content is loaded from static HTML files)
  const getLegalLinks = () => {
    return [
      { label: 'Buyer Terms & Conditions', href: '/buyer-terms-conditions' },
      { label: 'Seller Terms & Conditions', href: '/seller-terms-conditions' },
      { label: 'Privacy Policy', href: '/privacy-policy' }
    ]
  }
  return (
    <footer className={`${theme.bgClass} ${theme.borderClass}`}>
      <div className={`container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 ${theme.textClass}`}>
        <div>
          <h4 className={`${theme.headingClass} mb-3`}>Locations & Contact</h4>
          <DynamicLocations />
        </div>
        {linkGroups.slice(0,2).map((group) => (
          <div key={group.title}>
            <h4 className={`${theme.headingClass} mb-3`}>{group.title}</h4>
            <ul className="space-y-2 text-sm">
              {group.links.map((l) => (
                <li key={l.label}><a href={l.href} className="hover:underline">{l.label}</a></li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h4 className={`${theme.headingClass} mb-3`}>Newsletter</h4>
          {newsletter && (
            <form className="space-y-2">
              <input type="text" placeholder="First name" className={`w-full rounded px-3 py-2 ${theme.inputClass}`} />
              <input type="text" placeholder="Surname" className={`w-full rounded px-3 py-2 ${theme.inputClass}`} />
              <input type="email" placeholder="Email" className={`w-full rounded px-3 py-2 ${theme.inputClass}`} />
              <button type="button" className={theme.buttonClass}>Submit</button>
            </form>
          )}
          <div className="mt-4">{social}</div>
        </div>
      </div>
      <div className={`border-t py-4 text-xs ${theme.textClass} ${theme.borderClass}`}>
  <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-3">
    <div className="whitespace-nowrap">
      © {new Date().getFullYear()} {brandCopyright}. All Rights Reserved.
    </div>
    <div className="whitespace-nowrap text-black-300/50">
      Developed and Managed by{' '}
      
       <a href="https://www.ahyconsulting.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-black-300/70 font-medium hover:text-black-300 hover:underline transition-colors" >
        Ahy Consulting
      </a>
    </div>
    <div className="flex flex-wrap gap-3 justify-center md:justify-end">
      {getLegalLinks().map((link, index) => (
        <React.Fragment key={link.href}>
          {index > 0 && <span className="hidden md:inline">|</span>}
          <a href={link.href} className="hover:underline block md:inline">{link.label}</a>
        </React.Fragment>
      ))}
    </div>
  </div>
</div>
    </footer>
  )
}
export default SiteFooter