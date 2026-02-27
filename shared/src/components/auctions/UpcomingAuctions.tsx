// frontend/shared/src/components/auctions/UpcomingAuctions.tsx
'use client'
import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { defaultTheme } from '../../lib/theme-utils'

interface Auction {
  id: string
  short_name: string
  long_name?: string
  title_image_url?: string
  status: string
  start_date?: string
  end_date?: string
  live_bidding_url?: string
  catalog_url?: string
  external_urls?: Array<{
    platform: string
    url: string
    type: 'bidding' | 'catalog' | 'general'
  }>
  brand_code?: string
}

interface UpcomingAuctionsProps {
  title?: string
  subtitle?: string
  showViewAll?: boolean
  maxItems?: number
  className?: string
  layout?: 'grid' | 'horizontal'
  itemsPerPage?: number
  brandCode?: string
}

export default function UpcomingAuctions({ 
  title = "Upcoming Auctions",
  subtitle,
  showViewAll = true,
  maxItems = 8,
  className = "",
  layout = 'horizontal',
  itemsPerPage = 4,
  brandCode
}: UpcomingAuctionsProps) {
  const theme = defaultTheme
  const [auctions, setAuctions] = useState<Auction[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/auctions?status=planned')
        if (response.ok) {
          const data = await response.json()
          // Filter by brand if brandCode is provided
          const filteredData = brandCode 
            ? data.filter((auction: Auction) => auction.brand_code === brandCode)
            : data
          setAuctions(filteredData.slice(0, maxItems))
        }
      } catch (error) {
        console.error('Error fetching auctions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAuctions()
  }, [maxItems, brandCode])

  const getPrimaryAuctionUrl = (auction: Auction) => {
    if (auction.live_bidding_url) return auction.live_bidding_url
    if (auction.catalog_url) return auction.catalog_url
    if (auction.external_urls?.length) return auction.external_urls[0].url
    return '#'
  }

  const getExternalAuctionUrls = (auction: Auction) => {
    const urls = []
    if (auction.live_bidding_url) urls.push({ label: 'Live Bidding', url: auction.live_bidding_url })
    if (auction.catalog_url) urls.push({ label: 'View Catalog', url: auction.catalog_url })
    if (auction.external_urls) {
      auction.external_urls.forEach(ext => {
        urls.push({ 
          label: ext.type === 'bidding' ? 'Bid Now' : 'View Details', 
          url: ext.url 
        })
      })
    }
    return urls
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Date TBA'
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    } catch {
      return 'Date TBA'
    }
  }

  if (loading) {
    return (
      <section className={className}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">{title}</h2>
            {subtitle && <p className="text-lg opacity-80 mt-1">{subtitle}</p>}
          </div>
        </div>
        <div className="opacity-80">Loading auctions…</div>
      </section>
    )
  }

  if (auctions.length === 0) {
    return (
      <section className={className}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">{title}</h2>
            {subtitle && <p className="text-lg opacity-80 mt-1">{subtitle}</p>}
          </div>
        </div>
        <div className="opacity-80">No upcoming auctions listed yet. Please check back soon.</div>
      </section>
    )
  }

  if (layout === 'grid') {
    return (
      <section className={className}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">{title}</h2>
            {subtitle && <p className="text-lg opacity-80 mt-1">{subtitle}</p>}
          </div>
          {showViewAll && (
            <a href="/auctions?status=planned" className={`text-sm underline ${theme.accentTextClass}`}>
              View all
            </a>
          )}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {auctions.map(auction => {
            const primaryUrl = getPrimaryAuctionUrl(auction)
            const urls = getExternalAuctionUrls(auction)
            return (
              <div key={auction.id} className={`rounded-xl overflow-hidden border ${theme.borderClass} ${theme.cardBgClass} shadow-sm flex flex-col`}>
                {auction.title_image_url && (
                  <img src={auction.title_image_url} alt={auction.long_name || auction.short_name} className="h-40 w-full object-cover" />
                )}
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{auction.long_name || auction.short_name}</h3>
                  <p className="text-sm opacity-70 mb-3">
                    {formatDate(auction.start_date)}
                    {auction.end_date && auction.end_date !== auction.start_date && ` - ${formatDate(auction.end_date)}`}
                  </p>
                  <div className="mt-auto space-y-2">
                    {urls.slice(0, 2).map((urlInfo, idx) => (
                      <a
                        key={idx}
                        href={urlInfo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block w-full text-center py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                          idx === 0 
                            ? theme.primaryButtonClass 
                            : `border ${theme.borderClass} ${theme.cardBgClass} hover:opacity-80`
                        }`}
                      >
                        {urlInfo.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    )
  }

  // Horizontal layout with pagination
  const totalPages = Math.ceil(auctions.length / itemsPerPage)
  const currentAuctions = auctions.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <section className={className}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          {subtitle && <p className="text-lg opacity-80 mt-1">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-4">
          {showViewAll && (
            <a href="/auctions?status=planned" className={`text-sm underline ${theme.accentTextClass}`}>
              View all
            </a>
          )}
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={prevPage}
                className={`p-2 rounded-lg border ${theme.borderClass} hover:opacity-80 transition-opacity`}
                aria-label="Previous auctions"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm opacity-70">
                {currentPage + 1} of {totalPages}
              </span>
              <button
                onClick={nextPage}
                className={`p-2 rounded-lg border ${theme.borderClass} hover:opacity-80 transition-opacity`}
                aria-label="Next auctions"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentAuctions.map(auction => {
          const primaryUrl = getPrimaryAuctionUrl(auction)
          const urls = getExternalAuctionUrls(auction)
          return (
            <div key={auction.id} className={`rounded-xl overflow-hidden border ${theme.borderClass} ${theme.cardBgClass} shadow-sm flex flex-col`}>
              {auction.title_image_url && (
                <img src={auction.title_image_url} alt={auction.long_name || auction.short_name} className="h-40 w-full object-cover" />
              )}
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{auction.long_name || auction.short_name}</h3>
                <p className="text-sm opacity-70 mb-3">
                  {formatDate(auction.start_date)}
                  {auction.end_date && auction.end_date !== auction.start_date && ` - ${formatDate(auction.end_date)}`}
                </p>
                <div className="mt-auto space-y-2">
                  {urls.slice(0, 2).map((urlInfo, idx) => (
                    <a
                      key={idx}
                      href={urlInfo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full text-center py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                        idx === 0 
                          ? theme.primaryButtonClass 
                          : `border ${theme.borderClass} ${theme.cardBgClass} hover:opacity-80`
                      }`}
                    >
                      {urlInfo.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
