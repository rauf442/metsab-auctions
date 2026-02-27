// frontend/shared/src/components/articles/ArticleDetail.tsx
import React from 'react'
import Link from 'next/link'
import { Calendar, User, ArrowLeft, Eye, Tag } from 'lucide-react'

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

interface ArticleDetailProps {
  article: Article
  brandCode?: string
}

export default function ArticleDetail({ article, brandCode = 'METSAB' }: ArticleDetailProps) {
  const isAurum = brandCode.toUpperCase() === 'AURUM'

  // Theme-aware classes
  const theme = isAurum ? {
    backLink: 'text-yellow-400 hover:text-yellow-300',
    category: 'text-yellow-400',
    title: 'text-yellow-400',
    excerpt: 'text-yellow-200/70',
    meta: 'text-yellow-200/50',
    prose: '[&>*]:text-yellow-200/80 [&_h1]:text-yellow-400 [&_h2]:text-yellow-400 [&_h3]:text-yellow-400 [&_h4]:text-yellow-400 [&_h5]:text-yellow-400 [&_h6]:text-yellow-400 [&_p]:text-yellow-200/80 [&_a]:text-yellow-400 [&_a]:underline [&_strong]:text-yellow-300 [&_em]:text-yellow-200/80 [&_li]:text-yellow-200/80 [&_ul]:text-yellow-200/80 [&_ol]:text-yellow-200/80 [&_blockquote]:text-yellow-200/70 [&_blockquote]:border-yellow-500/30 [&_code]:text-yellow-300 [&_pre]:bg-gray-900/50 [&_pre]:text-yellow-200',
    border: 'border-yellow-500/30',
    tagLabel: 'text-yellow-200/70',
    tag: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    authorBg: 'bg-yellow-500/20 text-yellow-400',
    authorName: 'text-yellow-400',
    authorTitle: 'text-yellow-200/70'
  } : {
    backLink: 'text-blue-600 hover:text-blue-700',
    category: 'text-blue-600',
    title: 'text-gray-900',
    excerpt: 'text-gray-600',
    meta: 'text-gray-500',
    prose: '[&_h1]:text-gray-900 [&_h2]:text-gray-900 [&_h3]:text-gray-900 [&_h4]:text-gray-900 [&_h5]:text-gray-900 [&_h6]:text-gray-900 [&_p]:text-gray-700 [&_a]:text-blue-600 [&_a]:underline [&_strong]:text-gray-900 [&_li]:text-gray-700 [&_blockquote]:text-gray-600',
    border: 'border-gray-200',
    tagLabel: 'text-gray-700',
    tag: 'bg-gray-100 text-gray-700',
    authorBg: 'bg-blue-100 text-blue-600',
    authorName: 'text-gray-900',
    authorTitle: 'text-gray-600'
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not published'
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Link
        href="/news"
        className={`inline-flex items-center gap-2 ${theme.backLink} mb-6 transition-colors`}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to News
      </Link>

      {/* Article Header */}
      <header className="mb-8">
        {article.category && (
          <span className={`text-sm font-semibold ${theme.category} mb-2 block`}>
            {article.category}
          </span>
        )}
        <h1 className={`text-4xl md:text-5xl font-bold ${theme.title} mb-4`}>
          {article.title}
        </h1>
        
        {article.excerpt && (
          <p className={`text-xl ${theme.excerpt} mb-6`}>
            {article.excerpt}
          </p>
        )}

        {/* Meta Information */}
        <div className={`flex flex-wrap items-center gap-4 text-sm ${theme.meta} mb-6`}>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formatDate(article.published_at)}
          </div>
          {article.author_name && (
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>
                {article.author_name}
                {article.author_title && `, ${article.author_title}`}
              </span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {article.views_count} views
          </div>
        </div>

        {/* Cover Image */}
        {article.cover_image_url && (
          <div className="relative h-96 rounded-lg overflow-hidden mb-8">
            <img
              src={article.cover_image_url}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </header>

      {/* Article Content */}
      <div 
        className={`prose prose-lg max-w-none mb-8 ${theme.prose}`}
        dangerouslySetInnerHTML={{ __html: article.content }}
        style={isAurum ? { color: 'rgba(254, 240, 138, 0.8)' } : undefined}
      />

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className={`border-t ${theme.border} pt-6 mt-8`}>
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className={`w-4 h-4 ${theme.meta}`} />
            <span className={`text-sm font-medium ${theme.tagLabel}`}>Tags:</span>
            {article.tags.map(tag => (
              <span
                key={tag}
                className={`inline-flex px-3 py-1 ${theme.tag} rounded-full text-sm`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Author Bio (if available) */}
      {article.author_name && (
        <div className={`border-t ${theme.border} pt-6 mt-8`}>
          <div className="flex items-start gap-4">
            <div className={`w-16 h-16 rounded-full ${theme.authorBg} flex items-center justify-center font-bold text-xl`}>
              {article.author_name.charAt(0)}
            </div>
            <div>
              <h3 className={`font-bold ${theme.authorName} text-lg`}>{article.author_name}</h3>
              {article.author_title && (
                <p className={theme.authorTitle}>{article.author_title}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
