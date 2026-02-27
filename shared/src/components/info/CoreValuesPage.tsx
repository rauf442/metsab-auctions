// frontend/shared/src/components/info/CoreValuesPage.tsx
'use client'
import React from 'react'
import { defaultTheme } from '../../lib/theme-utils'
import UpcomingAuctions from '../auctions/UpcomingAuctions'

interface CoreValuesPageProps {
  brandName: string
  brandCode: string
}

export default function CoreValuesPage({ brandName, brandCode }: CoreValuesPageProps) {
  const theme = defaultTheme

  const coreValues = [
    'To provide a high quality, professional service to our clients, both sellers and bidders',
    'To make the auction process as transparent, equitable and enjoyable as possible',
    'To achieve the best possible prices for all our clients objects',
    'To nurture the development of our staff in a safe and rewarding working environment',
    'To protect our clients property, both objects and funds',
    'To respect our clients privacy',
    'To promote our clients interests to the best of our ability whilst always adhering to the highest professional standards',
    'To acknowledge when we make mistakes and rectify them as promptly and fairly as possible'
  ]

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass}`}>
      {/* Modern Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900"></div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium border border-white/20">
              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
              Our Foundation
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Core Values</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            The principles that guide every decision and interaction at {brandName}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-slate-900 to-transparent"></div>
      </section>

      <div className="relative">
        {/* Values Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Guiding Principles
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                These core values shape our culture, drive our decisions, and define our commitment to excellence.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {coreValues.map((value, index) => (
                <div key={index} className="group bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <span className="text-white font-bold text-lg">{index + 1}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                        {value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Central Promise */}
            <div className="text-center mb-16">
              <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-3xl p-12 shadow-2xl border border-blue-200 dark:border-slate-600">
                  <div className="inline-block p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                    Our Promise to You
                  </h3>
                  <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
                    When we make mistakes, we acknowledge them promptly and rectify them fairly. This commitment to integrity
                    ensures that every client interaction reflects our dedication to professional excellence.
                  </p>
                </div>
              </div>
            </div>

            {/* Terms Link */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-3 bg-white dark:bg-slate-800 rounded-full px-8 py-4 shadow-lg border border-slate-200 dark:border-slate-700">
                <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  Read our full{' '}
                  <a
                    href="/terms-and-conditions"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold hover:underline transition-colors"
                  >
                    Terms and Conditions
                  </a>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Values in Action */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Values in Action
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                See how our core values translate into real-world excellence in everything we do.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Quality Service</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Every client interaction is handled with the highest level of professionalism and care.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Innovation</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  We continuously evolve our processes and technology to serve you better.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Integrity</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Transparency and honesty guide all our business practices and client relationships.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sidebar with Next Auction */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2">
                {/* Latest News */}
                <div className="mb-16">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                      Latest Insights
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                      Stay informed with the latest developments and market insights from the art world.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        title: 'Reflecting on Our Valuation Day at Snape Maltings',
                        image: '/api/placeholder/300/200',
                        category: 'Events'
                      },
                      {
                        title: 'Rare David Patchen Vessels from Elton John\'s Collection',
                        subtitle: 'Offered This October at ' + brandName,
                        image: '/api/placeholder/300/200',
                        category: 'Auctions'
                      },
                      {
                        title: 'George Nakashima\'s Harmonies in Wood',
                        image: '/api/placeholder/300/200',
                        category: 'Artists'
                      },
                      {
                        title: 'From Hive to Home | ' + brandName + ' Honey 2025',
                        image: '/api/placeholder/300/200',
                        category: 'News'
                      }
                    ].map((article, index) => (
                      <article key={index} className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700">
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-3">
                            <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                            {article.category}
                          </div>
                          <h3 className="font-bold text-lg mb-3 text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          {article.subtitle && (
                            <p className="text-slate-600 dark:text-slate-400 text-sm mb-3 line-clamp-2">
                              {article.subtitle}
                            </p>
                          )}
                          <div className="flex items-center justify-between">
                            <time className="text-sm text-slate-500 dark:text-slate-400">
                              {new Date().toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </time>
                            <span className="text-emerald-600 dark:text-emerald-400 text-sm font-medium group-hover:underline">
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
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 shadow-lg border border-emerald-200 dark:border-slate-600">
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
      </div>
    </div>
  )
}
