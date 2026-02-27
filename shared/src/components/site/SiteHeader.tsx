// frontend/shared/src/components/site/SiteHeader.tsx
// Purpose: Brandable sticky header shared across sites with optional Auctions mega menu
'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export interface SiteHeaderMenuLink {
  label: string
  href: string
}

export interface SiteHeaderMenuGroup {
  title?: string
  links: SiteHeaderMenuLink[]
}

export interface SiteHeaderLink {
  label: string
  href?: string
  onClick?: () => void
  menuGroups?: SiteHeaderMenuGroup[]
}

export interface SiteHeaderTheme {
  bgClass: string
  borderClass: string
  textClass: string
  hoverTextClass: string
  hoverBgClass: string
}

export interface SiteHeaderProps {
  logoSrc: string
  brandName: string
  logoAlt?: string
  logoHref?: string
  links?: SiteHeaderLink[]
  theme: SiteHeaderTheme
  rightSlot?: React.ReactNode
}

export function SiteHeader({ logoSrc, brandName, logoAlt, logoHref = '/', links = [], theme, rightSlot }: SiteHeaderProps) {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current) return
      if (!menuRef.current.contains(e.target as Node)) {
        setOpenMenuIndex(null)
      }
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  return (
    <header className={`sticky top-0 z-50 w-full backdrop-blur ${theme.bgClass} ${theme.borderClass}`}>
      <div className="mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-3">
          <Link href={logoHref} aria-label={brandName} className="flex items-center gap-2">
            <img src={logoSrc} alt={logoAlt || brandName} className="h-8 w-auto object-contain" />
          </Link>
        </div>
        <nav className={`hidden md:flex items-center gap-3 ${theme.textClass}`} ref={menuRef}>
          {links.map((l, idx) => {
            const hasMenu = !!l.menuGroups?.length
            if (!hasMenu) {
              return l.href ? (
                <Link key={l.label} href={l.href} className={`px-4 py-2 ${theme.hoverTextClass} ${theme.hoverBgClass}`}>{l.label}</Link>
              ) : (
                <button key={l.label} onClick={l.onClick} className={`px-4 py-2 ${theme.hoverTextClass} ${theme.hoverBgClass}`}>{l.label}</button>
              )
            }
            const isOpen = openMenuIndex === idx
            return (
              <div key={l.label} className="relative">
                <button
                  type="button"
                  className={`px-4 py-2 flex items-center gap-1 ${theme.hoverTextClass} ${theme.hoverBgClass}`}
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onMouseEnter={() => setOpenMenuIndex(idx)}
                  onMouseLeave={() => setOpenMenuIndex(null)}
                >
                  {l.label}
                  <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                {isOpen && (
                  <div
                    onMouseEnter={() => setOpenMenuIndex(idx)}
                    onMouseLeave={() => setOpenMenuIndex(null)}
                    className={`absolute left-0 top-full mt-0 min-w-[800px] max-w-4xl ${theme.bgClass} ${theme.borderClass} border shadow-2xl z-50 rounded-lg`}
                    style={{ marginTop: '0px', width: 'max-content' }}
                  >
                    <div className="grid grid-cols-2 gap-6 p-2">
                      {l.menuGroups!.map((g, gi) => (
                        <div key={gi} className="p-4">
                          {g.title && (
                            <div className={`text-xs uppercase tracking-wide font-medium mb-3 ${theme.textClass} opacity-70`}>{g.title}</div>
                          )}
                          <ul className="space-y-1">
                            {g.links.map((ml) => (
                              <li key={ml.label}>
                                <Link href={ml.href} className={`block px-3 py-2 text-sm rounded-md ${theme.hoverTextClass} ${theme.hoverBgClass} transition-colors duration-150`}>
                                  {ml.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </nav>
        <div className="flex items-center gap-2">
          {rightSlot}
        </div>
      </div>
    </header>
  )
}

export default SiteHeader


