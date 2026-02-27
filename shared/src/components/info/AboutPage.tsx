// frontend/shared/src/components/info/AboutPage.tsx
'use client'
import React from 'react'
import { defaultTheme } from '../../lib/theme-utils'
import UpcomingAuctions from '../auctions/UpcomingAuctions'

interface AboutPageProps {
  brandName: string
  brandCode: string
}

export default function AboutPage({ brandName, brandCode }: AboutPageProps) {
  const theme = defaultTheme

  const usefulLinks = [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Our Core Values', href: '/core-values' },
    { label: 'Award Winning Saleroom', href: '/awards' },
    { label: 'Sponsorship', href: '/sponsorship' },
    { label: 'Ivory Policy', href: '/ivory-policy' },
    { label: 'Client Testimonials', href: '/testimonials' },
    { label: 'Collection and Shipping', href: '/collection-shipping' },
    { label: 'Selling with Us', href: '/selling' },
    { label: 'Press Coverage', href: '/press' }
  ]

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass}`}>
      {/* Modern Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">{brandName}</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Where tradition meets innovation in the world of fine art auctions
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-slate-900 to-transparent"></div>
      </section>

      <div className="relative">
        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto">
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  50+
                </div>
                <div className="text-slate-600 dark:text-slate-400 text-sm font-medium uppercase tracking-wide">
                  Annual Auctions
                </div>
              </div>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  3
                </div>
                <div className="text-slate-600 dark:text-slate-400 text-sm font-medium uppercase tracking-wide">
                  Prime Locations
                </div>
              </div>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                  Global
                </div>
                <div className="text-slate-600 dark:text-slate-400 text-sm font-medium uppercase tracking-wide">
                  Market Reach
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-16">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-8">
                  <div className="max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-white">
                      Our Legacy of Excellence
                    </h2>

                    <div className="space-y-8 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                      <p className="text-xl font-medium text-slate-900 dark:text-white leading-relaxed">
                        {brandName} stands as one of the UK's most esteemed fine art auction houses, blending centuries of tradition with cutting-edge innovation in the art market.
                      </p>

                      <div className="grid md:grid-cols-2 gap-8 mt-12">
                        <div className="space-y-4">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Award-Winning Facilities</h3>
                              <p className="text-slate-600 dark:text-slate-400">Our sustainably-built auction rooms in Stansted Mountfitchet serve as the heart of our operations.</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Global Reach</h3>
                              <p className="text-slate-600 dark:text-slate-400">We connect collectors worldwide with exceptional artworks from our diverse auction calendar.</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Expertise & Integrity</h3>
                              <p className="text-slate-600 dark:text-slate-400">Members of the Society of Fine Art Auctioneers, committed to the highest ethical standards.</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Innovation</h3>
                              <p className="text-slate-600 dark:text-slate-400">We leverage technology to enhance the auction experience for buyers and sellers alike.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-12 p-8 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-2xl">
                        <blockquote className="text-xl italic text-slate-700 dark:text-slate-300 mb-4">
                          "This ethical foundation has earned us a well-deserved reputation among respected art dealers and passionate collectors alike."
                        </blockquote>
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">{brandName.charAt(0)}</span>
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-white">Society of Fine Art Auctioneers</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Professional Member</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Quick Links */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Quick Links</h3>
                  <div className="space-y-4">
                    {usefulLinks.slice(0, 6).map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        className="flex items-center group p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200"
                      >
                        <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full mr-3 group-hover:bg-blue-500 transition-colors"></div>
                        <span className="text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white font-medium">
                          {link.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Next Auction */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 shadow-lg border border-blue-200 dark:border-slate-600">
                  <UpcomingAuctions
                    title="Next Auction"
                    showViewAll={false}
                    maxItems={1}
                    layout="grid"
                    brandCode={brandCode}
                    className=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Auctions */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4">
            <UpcomingAuctions
              title="Upcoming Auctions"
              className="mb-0"
              layout="horizontal"
              itemsPerPage={4}
              brandCode={brandCode}
            />
          </div>
        </section>

        {/* Latest News */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Latest Insights
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Stay informed with the latest news, market insights, and stories from the world of fine art.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((item) => (
                <article key={item} className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={`/api/placeholder/400/300`}
                      alt="News article"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-3">
                      <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      News
                    </div>
                    <h3 className="font-bold text-lg mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      Sample News Article Title That May Be Quite Long
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">
                      Discover the latest developments in the art market and auction world with our expert insights and analysis.
                    </p>
                    <div className="flex items-center justify-between">
                      <time className="text-sm text-slate-500 dark:text-slate-400">
                        {new Date().toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </time>
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:underline">
                        Read more →
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href="/news"
                className="inline-flex items-center px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors duration-200"
              >
                View All Articles
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

