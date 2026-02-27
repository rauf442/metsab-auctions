// frontend/metsab/src/app/news/[slug]/page.tsx
"use client"

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { ArticleDetail, type Article } from '@msaber/shared'

export default function ArticlePage() {
  const params = useParams()
  const slug = params.slug as string

  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (slug) {
      loadArticle()
    }
  }, [slug])

  const loadArticle = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/articles/slug/${slug}`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (!response.ok) {
        throw new Error('Article not found')
      }

      const data = await response.json()
      
      if (data.success) {
        setArticle(data.data)
      } else {
        throw new Error(data.message || 'Failed to load article')
      }

    } catch (err) {
      console.error('Error loading article:', err)
      setError(err instanceof Error ? err.message : 'Failed to load article')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        ) : article ? (
          <ArticleDetail article={article} brandCode="metsab" />
        ) : null}
      </div>
    </div>
  )
}

