// frontend/shared/src/components/articles/ArticlesList.tsx
import React from 'react'
import Link from 'next/link'
import { Calendar, User, TrendingUp, Eye } from 'lucide-react'

export interface Article {
  id: number
  title: string
  slug: string
  excerpt: string | null
  content: string
  author_name: string | null
  author_title: string | null
  cover_image_url: string | null
  status: string
  published_at: string | null
  category: string | null
  tags: string[] | null
  featured: boolean
  views_count: number
  created_at: string
}

interface ArticlesListProps {
  articles: Article[]
  brandCode?: string
  showFeatured?: boolean
  limit?: number
}

export default function ArticlesList({ 
  articles, 
  brandCode = 'METSAB',
  showFeatured = false,
  limit
}: ArticlesListProps) {
  const displayArticles = limit ? articles.slice(0, limit) : articles
  const featuredArticles = showFeatured ? articles.filter(a => a.featured).slice(0, 1) : []
  const regularArticles = showFeatured && featuredArticles.length > 0 
    ? displayArticles.filter(a => !a.featured)
    : displayArticles

  const isAurum = brandCode.toUpperCase() === 'AURUM'

  // Theme-aware classes
  const theme = isAurum ? {
    card: 'bg-gray-900/90 border border-yellow-500/30 hover:border-yellow-400',
    featuredBadge: 'bg-yellow-500 text-black',
    category: 'text-yellow-400',
    title: 'text-yellow-400 hover:text-yellow-300',
    text: 'text-yellow-200/70',
    meta: 'text-yellow-200/50',
    link: 'text-yellow-400 hover:text-yellow-300',
    noArticles: 'text-yellow-200/50'
  } : {
    card: 'bg-white hover:shadow-xl',
    featuredBadge: 'bg-yellow-500 text-white',
    category: 'text-blue-600',
    title: 'text-gray-900 hover:text-blue-600',
    text: 'text-gray-600',
    meta: 'text-gray-500',
    link: 'text-blue-600 hover:text-blue-700',
    noArticles: 'text-gray-500'
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not published'
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const getArticleUrl = (slug: string) => {
    return `/news/${slug}`
  }

  return (
    <div className="space-y-8">
      {/* Featured Article */}
      {featuredArticles.length > 0 && (
        <div className={`${theme.card} rounded-lg shadow-lg overflow-hidden transition-all duration-300`}>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredArticles[0].cover_image_url && (
              <div className="relative h-64 md:h-auto">
                <img
                  src={featuredArticles[0].cover_image_url}
                  alt={featuredArticles[0].title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 ${theme.featuredBadge} rounded-full text-sm font-semibold`}>
                    <TrendingUp className="w-4 h-4" />
                    Featured
                  </span>
                </div>
              </div>
            )}
            <div className="p-6 flex flex-col justify-center">
              {featuredArticles[0].category && (
                <span className={`text-sm font-semibold ${theme.category} mb-2`}>
                  {featuredArticles[0].category}
                </span>
              )}
              <Link href={getArticleUrl(featuredArticles[0].slug)}>
                <h2 className={`text-3xl font-bold ${theme.title} mb-3 transition-colors`}>
                  {featuredArticles[0].title}
                </h2>
              </Link>
              {featuredArticles[0].excerpt && (
                <p className={`${theme.text} mb-4 line-clamp-3`}>
                  {featuredArticles[0].excerpt}
                </p>
              )}
              <div className={`flex items-center gap-4 text-sm ${theme.meta} mb-4`}>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(featuredArticles[0].published_at)}
                </div>
                {featuredArticles[0].author_name && (
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {featuredArticles[0].author_name}
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {featuredArticles[0].views_count}
                </div>
              </div>
              <Link
                href={getArticleUrl(featuredArticles[0].slug)}
                className={`inline-flex items-center ${theme.link} font-semibold`}
              >
                Read More →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Regular Articles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regularArticles.map((article) => (
          <article key={article.id} className={`${theme.card} rounded-lg shadow-md overflow-hidden transition-all duration-300`}>
            {article.cover_image_url && (
              <Link href={getArticleUrl(article.slug)}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.cover_image_url}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
            )}
            <div className="p-6">
              {article.category && (
                <span className={`text-xs font-semibold ${theme.category} mb-2 block`}>
                  {article.category}
                </span>
              )}
              <Link href={getArticleUrl(article.slug)}>
                <h3 className={`text-xl font-bold ${theme.title} mb-2 transition-colors line-clamp-2`}>
                  {article.title}
                </h3>
              </Link>
              {article.excerpt && (
                <p className={`${theme.text} text-sm mb-4 line-clamp-3`}>
                  {article.excerpt}
                </p>
              )}
              <div className={`flex items-center justify-between text-xs ${theme.meta} mb-4`}>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(article.published_at)}
                </div>
                {article.author_name && (
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {article.author_name}
                  </div>
                )}
              </div>
              <Link
                href={getArticleUrl(article.slug)}
                className={`${theme.link} text-sm font-semibold`}
              >
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* No Articles Message */}
      {displayArticles.length === 0 && (
        <div className="text-center py-12">
          <p className={`${theme.noArticles} text-lg`}>No articles available at the moment.</p>
        </div>
      )}
    </div>
  )
}
