// frontend/shared/src/components/info/BuyingPage.tsx
// Purpose: Shared "Buying with <Brand>" informational page with layout inspired by Sworders, adapted to our themes
// frontend/shared/src/components/info/BuyingPage.tsx
// Purpose: Shared modern "Buying with <Brand>" informational page inspired by reference, themed per brand
'use client'
import React, { useMemo } from 'react'
import { defaultTheme } from '../../lib/theme-utils'
import UpcomingAuctions from '../auctions/UpcomingAuctions'

interface BuyingPageProps {
  brandName: string
  brandCode: string
}

export default function BuyingPage({ brandName, brandCode }: BuyingPageProps) {
  const theme = defaultTheme

  const heroSubtitle = useMemo(() => (
    `We make bidding in-room and online straightforward and enjoyable. Our specialists and client services are here to help at every step.`
  ), [])

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass}`}>
      <main className="container mx-auto px-4 py-12">
        {/* Hero */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Buying with {brandName}</h1>
          <p className="opacity-80 max-w-3xl mx-auto text-lg">{heroSubtitle}</p>
        </section>

        {/* How to Bid */}
        <section className={`rounded-xl border ${theme.borderClass} ${theme.cardBgClass} shadow-sm mb-10`}>
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">How to Bid in Live Auctions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">In Person</h3>
                  <p className="opacity-80">Register for a bidding paddle with photo ID at reception before the sale begins.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Live Internet Bidding</h3>
                  <p className="opacity-80">Bid in real time with live audio/video. When you bid directly with us, there are no additional online fees.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Absentee Bidding</h3>
                  <p className="opacity-80">Leave a maximum bid and we will bid on your behalf, securing the lot at the lowest price possible subject to competing bids and reserves.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Telephone Bidding</h3>
                  <p className="opacity-80">Bid via phone with a member of our team relaying the auctioneer’s call and placing bids on your instruction for suitable lots.</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Timed Online-Only Auctions</h2>
              <ol className="list-decimal pl-5 space-y-3 opacity-90">
                <li>Create or sign in to your account and register a card.</li>
                <li>Browse the catalogue and set your maximum bid at any time.</li>
                <li>Lots close sequentially; late bids extend the timer to keep things fair.</li>
                <li>We’ll notify you if you are outbid so you can increase your bid.</li>
              </ol>
              <p className="mt-4 opacity-80">After the sale closes, successful bidders receive payment and shipping options via email.</p>
              <div className={`mt-6 p-4 rounded-lg border ${theme.borderClass}`}>
                <h3 className="text-lg font-semibold mb-2">Bid on Leading Platforms</h3>
                <p className="opacity-80 text-sm">In addition to our site, selected sales are available via LiveAuctioneers, The Saleroom, EasyLive, and Invaluable.</p>
                <ul className="flex flex-wrap gap-2 mt-3 text-sm opacity-90">
                  <li className="px-2 py-1 rounded border">LiveAuctioneers</li>
                  <li className="px-2 py-1 rounded border">The Saleroom</li>
                  <li className="px-2 py-1 rounded border">EasyLive</li>
                  <li className="px-2 py-1 rounded border">Invaluable</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Things to consider */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className={`rounded-xl border ${theme.borderClass} ${theme.cardBgClass} p-6`}>
            <h3 className="text-xl font-semibold mb-3">Condition Reports</h3>
            <p className="opacity-80">Request condition reports and additional images for lots you are interested in. We encourage prospective bidders to gather as much information as possible before bidding.</p>
          </div>
          <div className={`rounded-xl border ${theme.borderClass} ${theme.cardBgClass} p-6`}>
            <h3 className="text-xl font-semibold mb-3">Buyer’s Premium</h3>
            <p className="opacity-80">A buyer’s premium is added to the hammer price. Rates may vary for specific categories and will be clearly stated in the sale details.</p>
          </div>
          <div className={`rounded-xl border ${theme.borderClass} ${theme.cardBgClass} p-6`}>
            <h3 className="text-xl font-semibold mb-3">Artist’s Resale Right</h3>
            <p className="opacity-80">Lots marked accordingly may be subject to Artist’s Resale Right, a royalty payable by the purchaser on qualifying works. This is calculated on a sliding scale.</p>
          </div>
          <div className={`rounded-xl border ${theme.borderClass} ${theme.cardBgClass} p-6`}>
            <h3 className="text-xl font-semibold mb-3">Payment Methods</h3>
            <p className="opacity-80">We accept bank transfer and major cards with limits in place. Full details and any caps appear on your invoice and our terms.</p>
          </div>
          <div className={`rounded-xl border ${theme.borderClass} ${theme.cardBgClass} p-6 md:col-span-2`}>
            <h3 className="text-xl font-semibold mb-3">Collection & Shipping</h3>
            <p className="opacity-80">We can assist with shipping of smaller items. Otherwise, you can arrange your own courier or collect in person—contact us to discuss options.</p>
          </div>
        </section>

        {/* Upcoming Auctions */}
        <UpcomingAuctions 
          title="Upcoming Auctions"
          className="mt-14"
          layout="horizontal"
          itemsPerPage={4}
          brandCode={brandCode}
        />

        {/* Contact */}
        <section className={`mt-12 rounded-xl border ${theme.borderClass} ${theme.cardBgClass} p-6`}>
          <h3 className="text-xl font-semibold mb-2">Need help?</h3>
          <p className="opacity-80">Our team is happy to guide you through registration, bidding and post-sale steps. Get in touch via the contact details on our site.</p>
        </section>
      </main>
    </div>
  )
}


