// frontend/shared/src/components/info/CareersPage.tsx
'use client'
import React from 'react'
import { defaultTheme } from '../../lib/theme-utils'

interface CareersPageProps {
  brandName: string
  brandCode: string
}

export default function CareersPage({ brandName, brandCode }: CareersPageProps) {
  const theme = defaultTheme

  const careerBenefits = [
    { icon: '🏆', title: 'Competitive Compensation', description: 'Attractive salary packages with performance bonuses and benefits' },
    { icon: '📚', title: 'Professional Development', description: 'Continuous learning opportunities and career advancement programs' },
    { icon: '🎨', title: 'Creative Environment', description: 'Work with exceptional artworks and passionate art enthusiasts' },
    { icon: '🤝', title: 'Collaborative Culture', description: 'Join a supportive team that values expertise and integrity' },
    { icon: '🌍', title: 'Global Impact', description: 'Contribute to the worldwide art market and cultural heritage' },
    { icon: '⚖️', title: 'Work-Life Balance', description: 'Flexible working arrangements and comprehensive wellness programs' }
  ]

  const currentOpenings = [
    { title: 'Senior Art Specialist', department: 'Specialist Department', type: 'Full-time', location: 'Stansted Mountfitchet' },
    { title: 'Digital Marketing Manager', department: 'Marketing', type: 'Full-time', location: 'Stansted Mountfitchet' },
    { title: 'Client Services Coordinator', department: 'Client Services', type: 'Full-time', location: 'Stansted Mountfitchet' },
    { title: 'Valuation Assistant', department: 'Valuations', type: 'Full-time', location: 'Stansted Mountfitchet' }
  ]

  const usefulLinks = [
    { label: 'About Aurum', href: '/about' },
    { label: 'Our Core Values', href: '/core-values' },
    { label: 'Collection and Shipping', href: '/collection-shipping' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/buyer-terms-conditions' }
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
            Careers at <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">{brandName}</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Join our passionate team of art specialists and help shape the future of fine art auctions
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-slate-900 to-transparent"></div>
      </section>

      <div className="relative">
        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto">
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  25+
                </div>
                <div className="text-slate-600 dark:text-slate-400 text-sm font-medium uppercase tracking-wide">
                  Team Members
                </div>
              </div>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  50+
                </div>
                <div className="text-slate-600 dark:text-slate-400 text-sm font-medium uppercase tracking-wide">
                  Years Combined Experience
                </div>
              </div>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                  3
                </div>
                <div className="text-slate-600 dark:text-slate-400 text-sm font-medium uppercase tracking-wide">
                  Office Locations
                </div>
              </div>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                  Global
                </div>
                <div className="text-slate-600 dark:text-slate-400 text-sm font-medium uppercase tracking-wide">
                  Client Network
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
                      Join Our Team of Art Experts
                    </h2>

                    <div className="space-y-8 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                      <p className="text-xl font-medium text-slate-900 dark:text-white leading-relaxed">
                        At {brandName}, we believe that our people are our greatest asset. We're looking for passionate individuals who share our commitment to excellence, integrity, and the world of fine art.
                      </p>

                      <div className="grid md:grid-cols-2 gap-8 mt-12">
                        {careerBenefits.map((benefit, index) => (
                          <div key={index} className="space-y-4">
                            <div className="flex items-start space-x-4">
                              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
                                {benefit.icon}
                              </div>
                              <div>
                                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{benefit.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400">{benefit.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-12 p-8 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-2xl">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Culture & Values</h3>
                        <p className="text-slate-700 dark:text-slate-300 mb-6">
                          We foster a culture of continuous learning, collaboration, and professional growth. As a member of the Society of Fine Art Auctioneers, we uphold the highest ethical standards in everything we do.
                        </p>
                        <div className="grid md:grid-cols-3 gap-6">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
                              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Integrity</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Ethical standards in all dealings</p>
                          </div>
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Innovation</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Embracing new technologies</p>
                          </div>
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                            </div>
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Collaboration</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Working together for success</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Current Openings */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Current Opportunities</h3>
                  <div className="space-y-6">
                    {currentOpenings.map((opening, index) => (
                      <div key={index} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-50 dark:bg-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-200">
                        <div className="mb-4 md:mb-0">
                          <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">{opening.title}</h4>
                          <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              {opening.department}
                            </span>
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {opening.type}
                            </span>
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {opening.location}
                            </span>
                          </div>
                        </div>
                        <button className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors duration-200">
                          Apply Now
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 text-center">
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      Don't see a position that matches your expertise? We're always interested in hearing from talented individuals.
                    </p>
                    <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                      Send Us Your CV
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Quick Links */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Quick Links</h3>
                  <div className="space-y-4">
                    {usefulLinks.map((link, index) => (
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

                {/* Contact Information */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 shadow-lg border border-blue-200 dark:border-slate-600">
                  <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Get in Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">Email</p>
                        <p className="text-slate-600 dark:text-slate-400">careers@{brandCode.toLowerCase()}auctions.com</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">Phone</p>
                        <p className="text-slate-600 dark:text-slate-400">+44 (0) 1279 817 817</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">Address</p>
                        <p className="text-slate-600 dark:text-slate-400">Stansted Mountfitchet, Essex CM24 8XL</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
