// frontend/shared/src/components/info/CollectionShippingPage.tsx
'use client'
import React from 'react'
import { defaultTheme } from '../../lib/theme-utils'
import UpcomingAuctions from '../auctions/UpcomingAuctions'
import ContactForm from '../forms/ContactForm'

interface CollectionShippingPageProps {
  brandName: string
  brandCode: string
}

export default function CollectionShippingPage({ brandName, brandCode }: CollectionShippingPageProps) {
  const theme = defaultTheme

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass}`}>
      {/* Modern Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 dark:from-amber-900 dark:via-orange-900 dark:to-red-900"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium border border-white/20">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse"></span>
              Collection & Shipping
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">Seamless</span> Delivery
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Professional collection and shipping services tailored to your valuable art and antiques
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-slate-900 to-transparent"></div>
      </section>

      <div className="relative">
        {/* Service Options */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Collection & Delivery Options
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Choose the service that best fits your needs. Our expert team is here to guide you through every step.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* In-Person Collection */}
              <div className="group bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">In-Person Collection</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Visit our Stansted Mountfitchet auction rooms for personal collection of your items.
                </p>
                <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Appointment required (24h notice)
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Payment required before collection
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Assistance available for large items
                  </div>
                </div>
              </div>

              {/* Professional Delivery */}
              <div className="group bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-green-300 dark:hover:border-green-600">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{brandName} Delivery Service</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Professional shipping handled by our trusted partner Bradleys Antique Packaging Service.
                </p>
                <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Royal Mail Special Delivery (UK)
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    DPD courier for small items
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Worldwide shipping available
                  </div>
                </div>
              </div>

              {/* Third-Party Couriers */}
              <div className="group bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V7M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Third-Party Couriers</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Arrange your own preferred shipping company for custom requirements and special handling.
                </p>
                <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Choose your preferred carrier
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Specialized art handling
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Full insurance coverage
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-2xl p-8 border border-red-200 dark:border-red-800">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-800 dark:text-red-200 mb-3">
                    Important: Collections by Appointment Only
                  </h3>
                  <p className="text-red-700 dark:text-red-300">
                    To ensure a smooth collection process, please book your appointment at least 24 hours in advance.
                    Payment must be completed before collection arrangements can be made.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Information */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2 space-y-8">
                {/* Shipping Details */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Shipping Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold text-sm">UK</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">United Kingdom</h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                          Jewellery items up to 2.5kg are sent via Royal Mail Special Delivery. Other small items are couriered via DPD.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold text-sm">EU</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">European Union</h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                          UK and some European transit is carried out in Bradleys' own vehicles by their experienced staff.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold text-sm">🌍</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">International</h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                          Worldwide shipments are packed by Bradleys and delivered via quality recognized couriers with standing equivalent to FedEx.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Storage Information */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Storage & Collection Information</h3>

                  <div className="space-y-6">
                    <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                      <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-3">Abels Moving Services Ltd</h4>
                      <div className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                        <p>The Heights, East, Cranborne Road</p>
                        <p>Potters Bar, EN6 3JN</p>
                        <p>📞 020 4259 4315</p>
                        <p>✉️ collectionsPB@abels.co.uk</p>
                        <p>🕒 Monday – Friday 08:30-16:30 only</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-900 dark:text-white">Storage Charges</h4>
                      <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
                          <span>Collection (1-5 items)</span>
                          <span className="font-medium">£25 + VAT</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
                          <span>Collection (6-10 items)</span>
                          <span className="font-medium">£50 + VAT</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
                          <span>Free storage period</span>
                          <span className="font-medium">7 days</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span>Storage per lot per day (after free period)</span>
                          <span className="font-medium">£4.00 + VAT</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                      <p className="mb-2"><strong>Note:</strong> Additional charges apply for items exceeding 8 x 8ft, and a levied liability charge of £0.08 per £1,000 value of goods is payable.</p>
                      <p>All charges are subject to VAT and 6.27% insurance on total charges.</p>
                    </div>
                  </div>
                </div>

                {/* Recommended Couriers */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Recommended Couriers</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    For third-party shipping arrangements, we recommend working with specialized art and antique carriers who understand the unique requirements of valuable items.
                  </p>
                  <div className="text-center">
                    <a
                      href="/recommended-couriers"
                      className="inline-flex items-center px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors duration-200"
                    >
                      View Recommended Couriers
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Contact Form */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Questions?</h3>
                  <ContactForm
                    type="collection-shipping"
                    brandCode={brandCode}
                  />
                </div>

                {/* Contact Info */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 border border-blue-200 dark:border-slate-600">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">Phone</div>
                        <div className="text-slate-600 dark:text-slate-400">01279 817778</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">Email</div>
                        <div className="text-slate-600 dark:text-slate-400">auctions@sworder.co.uk</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Auctions */}
        <UpcomingAuctions 
          title="Upcoming Auctions"
          className="mt-16"
          layout="horizontal"
          itemsPerPage={4}
          brandCode={brandCode}
        />
      </div>
    </div>
  )
}

