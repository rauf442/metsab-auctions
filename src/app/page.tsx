// frontend/metsab/src/app/page.tsx
// Purpose: Metsab Home - Elegant light theme showcasing exceptional collectibles and rare treasures
"use client"

// Disable static generation to avoid SSR issues
export const dynamic = 'force-dynamic'

import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { getPublicAuctions, type Auction, NewsSection } from '@msaber/shared';
import { useState, useEffect } from 'react';

function formatDate(d: string | undefined) {
  if (!d) return '';
  const dt = new Date(d);
  return dt.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

function UpcomingAuctions({ auctions }: { auctions: Auction[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {auctions.map((a: Auction) => (
        <Link
          key={a.id}
          href={`/auctions/${a.id}`}
          className="group block bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-neutral-200 hover:border-black overflow-hidden"
        >
          {/* Image Placeholder */}
          <div className="aspect-[16/10] bg-gradient-to-br from-neutral-100 to-neutral-200 relative overflow-hidden">
            {a.title_image_url ? (
              <Image
                src={a.title_image_url}
                alt={a.long_name || a.short_name}
                fill
                style={{objectFit: 'cover'}}
                className="group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100">
                <div className="text-6xl opacity-30">🏛️</div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-3 left-3 right-3">
              <div className="text-xs text-neutral-600 uppercase tracking-wider font-medium mb-1">
                {a.type?.toUpperCase?.()} AUCTION
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-black group-hover:text-neutral-700 transition-colors line-clamp-2 mb-3 leading-tight">
              {a.long_name || a.short_name}
            </h3>
            <div className="flex items-center justify-between text-sm">
              <div className="text-neutral-700">
                <div className="font-medium">{formatDate(a.settlement_date)}</div>
              </div>
              {a.total_estimate_low && a.total_estimate_high && (
                <div className="text-right">
                  <div className="text-black font-semibold">
                    £{a.total_estimate_low.toLocaleString()} - £{a.total_estimate_high.toLocaleString()}
                  </div>
                  <div className="text-neutral-500 text-xs">Estimated Value</div>
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function Home() {
  const [auctions, setAuctions] = useState<Auction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAuctions = async () => {
      try {
        const res = await getPublicAuctions({ status: 'planned', limit: 6, sort_field: 'settlement_date', sort_direction: 'asc' })
        setAuctions(res.auctions)
      } catch (error) {
        console.error('Failed to load auctions:', error)
      } finally {
        setLoading(false)
      }
    }
    loadAuctions()
  }, [])

  return (
    <div className="min-h-screen will-change-transform" style={{ background: 'linear-gradient(to bottom right, #f8fafc, #e0f2fe, #f1f5f9)' }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden will-change-transform">
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-100/50 via-transparent to-neutral-100/50 will-change-auto" />
        <div className="relative container mx-auto px-4 py-20 lg:py-32 transform-gpu">
          <div className="text-center max-w-5xl mx-auto">
            {/* Main Title */}
            <h1 className={cn(
              "text-6xl sm:text-7xl lg:text-8xl font-black mb-6 tracking-tight",
              "bg-gradient-to-r from-black via-neutral-800 to-black bg-clip-text text-transparent",
              "drop-shadow-lg"
            )}>
              Metsab
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl lg:text-3xl text-neutral-700 mb-8 font-light tracking-wide leading-relaxed">
              Exceptional Items Auction House
            </p>

            {/* Tagline */}
            <p className="text-lg sm:text-xl text-neutral-600 mb-12 font-light max-w-3xl mx-auto leading-relaxed">
              Discover extraordinary collectibles and rare treasures in our prestigious auctions
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                href="/auctions"
                className="px-8 py-4 bg-black text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-black/50 hover:scale-105 transition-all duration-300 transform"
              >
                Explore Auctions
              </Link>
              <Link
                href="#services"
                className="px-8 py-4 border-2 border-black/60 text-black font-semibold text-lg rounded-full hover:bg-black/5 hover:border-black transition-all duration-300"
              >
                Our Services
              </Link>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-black mb-1">1,200+</div>
                <div className="text-neutral-600 text-sm uppercase tracking-wide">Items Sold</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-black mb-1">150+</div>
                <div className="text-neutral-600 text-sm uppercase tracking-wide">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-black mb-1">24/7</div>
                <div className="text-neutral-600 text-sm uppercase tracking-wide">Concierge Service</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16">
        {/* Upcoming Auctions */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">Upcoming Auctions</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Discover extraordinary pieces in our carefully curated collections
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
            </div>
          ) : (
            <UpcomingAuctions auctions={auctions} />
          )}

          <div className="text-center mt-12">
            <Link
              href="/auctions"
              className="inline-flex items-center px-6 py-3 border border-black/60 text-black font-medium rounded-full hover:bg-black/5 hover:border-black transition-all duration-300"
            >
              View All Auctions
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Our Services */}
        <section id="services" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">Our Services</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Comprehensive concierge service throughout your auction experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/inventory-form" className="group block bg-gradient-to-br from-white to-neutral-50 rounded-2xl p-8 shadow-xl border border-neutral-200 hover:border-black transition-all duration-300 hover:transform hover:scale-105 will-change-transform transform-gpu">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-neutral-700 transition-colors">Request A Valuation</h3>
              <p className="text-neutral-700 leading-relaxed">
                Begin your journey with a professional valuation from our expert specialists.
              </p>
              <div className="mt-4 flex items-center text-black font-medium">
                <span>Get Started</span>
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            <div className="group bg-gradient-to-br from-white to-neutral-50 rounded-2xl p-8 shadow-xl border border-neutral-200 hover:border-black transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Buying Guide</h3>
              <p className="text-neutral-700 leading-relaxed">
                Master the art of bidding with our comprehensive guide to successful acquisitions.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-white to-neutral-50 rounded-2xl p-8 shadow-xl border border-neutral-200 hover:border-black transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Collection & Shipping</h3>
              <p className="text-neutral-700 leading-relaxed">
                Professional worldwide collection and shipping services for your treasures.
              </p>
            </div>
          </div>
        </section>

        {/* Consign Your Treasures */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">Ready to Sell?</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Submit your exceptional items for professional appraisal and prestigious auction placement
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-white to-neutral-50 rounded-2xl p-8 shadow-xl border border-neutral-200">
              <div className="text-center">
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">Submit Your Inventory</h3>
                <p className="text-neutral-700 text-lg mb-8 max-w-2xl mx-auto">
                  Our specialist team will provide a comprehensive valuation and guide you through our prestigious
                  consignment process. Multiple exceptional items can be submitted for expert review.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    href="/inventory-form"
                    className="px-8 py-4 bg-black text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-black/50 hover:scale-105 transition-all duration-300 transform"
                  >
                    Start Submission
                  </Link>
                  <Link
                    href="/auctions"
                    className="px-6 py-3 border-2 border-black/60 text-black font-medium rounded-full hover:bg-black/5 hover:border-black transition-all duration-300"
                  >
                    View Current Auctions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* News & Insights */}
        <NewsSection
          brandId={1}
          brandCode="METSAB"
          title="News, Views & Insights"
          description="Stay informed with the latest market intelligence and expert perspectives"
          theme="light"
          limit={3}
        />

        {/* Lot Archive Search */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">Lot Archive</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Search through our comprehensive archive of past auctions and results
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-white to-neutral-50 rounded-2xl p-8 shadow-xl border border-neutral-200">
              <div className="relative">
                <input
                  placeholder="Search by artist, period, or lot number..."
                  className="w-full px-6 py-4 rounded-xl border border-neutral-300 bg-white text-neutral-900 placeholder-neutral-500 text-lg focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all duration-300"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-3 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors duration-300 shadow-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
              <div className="mt-4 text-center">
                <span className="text-neutral-500 text-sm">Advanced search features coming soon</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
