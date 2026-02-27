// frontend/shared/src/components/ui/MediaRenderer.tsx
"use client"

import React, { useState } from 'react'
import { Trophy } from 'lucide-react'

// Utility functions for external use
export const extractDriveFileId = (url: string): string | null => {
  if (!url) return null

  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /\/open\?id=([a-zA-Z0-9_-]+)/,
    /\/uc\?export=view&id=([a-zA-Z0-9_-]+)/,
    /id=([a-zA-Z0-9_-]+)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  return null
}

export const isDriveUrl = (url: string): boolean => {
  return Boolean(url && (
    url.includes('drive.google.com') ||
    url.includes('docs.google.com')
  ))
}

interface MediaRendererProps {
  src: string | string[]
  alt?: string
  className?: string
  containerProps?: React.HTMLAttributes<HTMLDivElement>
  showControls?: boolean
  aspectRatio?: 'square' | 'video' | 'auto'
  onClick?: () => void
  placeholder?: React.ReactNode
}

export default function MediaRenderer({
  src,
  alt = '',
  className = '',
  containerProps = {},
  showControls = false,
  aspectRatio = 'square',
  onClick,
  placeholder
}: MediaRendererProps) {
  const mediaUrl = Array.isArray(src) ? src[0] : src
  const [mediaError, setMediaError] = useState(false)

  const hasSizeClasses = (classes: string) => {
    return /\b(w|h)-\d+/.test(classes) || /\b(w|h)-\w+/.test(classes)
  }

  const renderDriveImage = (url: string, altText: string) => {
    const fileId = extractDriveFileId(url)

    if (!fileId || mediaError) {
      return renderPlaceholder()
    }

    const imageUrl = `https://lh3.googleusercontent.com/d/${fileId}`
    const sizeClasses = hasSizeClasses(className) ? '' : 'w-full h-full'

    return (
      <img
        src={imageUrl}
        alt={altText}
        className={`${className} ${sizeClasses} object-cover group-hover:scale-105 transition-transform duration-200`}
        onClick={onClick}
        onError={() => setMediaError(true)}
        onLoad={() => setMediaError(false)}
      />
    )
  }

  const renderImage = (url: string, altText: string) => {
    if (mediaError) {
      return renderPlaceholder()
    }

    const sizeClasses = hasSizeClasses(className) ? '' : 'w-full h-full'

    return (
      <img
        src={url}
        alt={altText}
        className={`${className} ${sizeClasses} object-cover group-hover:scale-105 transition-transform duration-200`}
        onClick={onClick}
        onError={() => setMediaError(true)}
        onLoad={() => setMediaError(false)}
      />
    )
  }

  const renderPlaceholder = () => {
    if (placeholder) {
      return <>{placeholder}</>
    }

    return (
      <div className={`w-full h-full flex items-center justify-center text-gray-300 bg-gray-100 ${className}`}>
        <Trophy className="h-16 w-16" />
      </div>
    )
  }

  const getContainerClasses = () => {
    const baseClasses = 'bg-gray-50 overflow-hidden relative'
    if (hasSizeClasses(className)) {
      return baseClasses
    }
    switch (aspectRatio) {
      case 'square':
        return `${baseClasses} aspect-square`
      case 'video':
        return `${baseClasses} aspect-video`
      case 'auto':
        return `${baseClasses}`
      default:
        return `${baseClasses} aspect-square`
    }
  }

  const renderMedia = () => {
    if (!mediaUrl || mediaError) {
      return renderPlaceholder()
    }

    if (isDriveUrl(mediaUrl)) {
      return renderDriveImage(mediaUrl, alt)
    } else {
      return renderImage(mediaUrl, alt)
    }
  }

  return (
    <div
      className={getContainerClasses()}
      {...containerProps}
    >
      {renderMedia()}
    </div>
  )
}



