// frontend/shared/src/components/site/NewsSection.tsx
"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import ArticlesList, { Article } from '../articles/ArticlesList'

interface NewsSectionProps {
  brandId: number
  brandCode: string
  title?: string
  description?: string
  limit?: number
  theme?: 'light' | 'dark'
}

export default function NewsSection({
  brandId,
  brandCode,
  title = "News, Views & Insights",
  description = "Stay informed with the latest auction news and expert insights",
  limit = 3,
  theme = 'light'
}: NewsSectionProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadArticles()
  }, [brandId])

  const loadArticles = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/articles?published_only=true&brand_id=${brandId}&limit=${limit}`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch articles')
      }

      const data = await response.json()

      if (data.success) {
        setArticles(data.data || [])
      } else {
        throw new Error(data.message || 'Failed to load articles')
      }

    } catch (err) {
      console.error('Error loading articles:', err)
      setError(err instanceof Error ? err.message : 'Failed to load articles')
    } finally {
      setLoading(false)
    }
  }

  // Don't render section if no articles and not loading
  if (!loading && articles.length === 0) {
    return null
  }

  const themeClasses = theme === 'dark' ? {
    title: 'text-[#fae070]',
    description: 'text-yellow-200/70',
    card: 'bg-gradient-to-br from-neutral-900 to-neutral-800 border-[#fae070]/20 hover:border-[#fae070]/40',
    cardTitle: 'text-white group-hover:text-[#fae070]',
    cardText: 'text-yellow-200/70',
    cardDate: 'text-[#fae070]/60',
    link: 'text-[#fae070] hover:text-[#fae070]/80'
  } : {
    title: 'text-black',
    description: 'text-neutral-600',
    card: 'bg-gradient-to-br from-white to-neutral-50 border-neutral-200 hover:border-black',
    cardTitle: 'text-black group-hover:text-neutral-700',
    cardText: 'text-neutral-600',
    cardDate: 'text-neutral-500',
    link: 'text-blue-600 hover:text-blue-700'
  }

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className={`text-4xl font-bold mb-4 ${themeClasses.title}`}>
          {title}
        </h2>
        <p className={`${themeClasses.description} text-lg max-w-2xl mx-auto`}>
          {description}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className={`text-center py-12 ${themeClasses.description}`}>
          <p>Unable to load news at this time.</p>
        </div>
      ) : articles.length > 0 ? (
        <ArticlesList
          articles={articles}
          brandCode={brandCode}
          showFeatured={false}
          limit={limit}
        />
      ) : null}

      {articles.length > 0 && (
        <div className="text-center mt-12">
          <Link
            href="/news"
            className={`inline-flex items-center px-6 py-3 border border-black/60 ${themeClasses.link} font-medium rounded-full hover:bg-black/5 hover:border-black transition-all duration-300`}
          >
            View All News
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </section>
  )
}
