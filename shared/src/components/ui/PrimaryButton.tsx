// frontend/shared/src/components/ui/PrimaryButton.tsx
// Purpose: Reusable primary button component with brand theming and hover effects

'use client'

import React, { ReactNode } from 'react'
import Link from 'next/link'
import { defaultTheme } from '../../lib/theme-utils'
import { cn } from '../../utils/utils'

export interface PrimaryButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  target?: string
  rel?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary'
  className?: string
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
}

export function PrimaryButton({
  children,
  onClick,
  href,
  target,
  rel,
  type = 'button',
  disabled = false,
  loading = false,
  size = 'md',
  variant = 'primary',
  className,
  icon,
  iconPosition = 'left',
  fullWidth = false
}: PrimaryButtonProps) {
  const theme = defaultTheme

  // Base styles that apply to all buttons
  const baseStyles = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg cursor-pointer select-none active:scale-95',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    {
      'w-full': fullWidth,
      'opacity-50 cursor-not-allowed pointer-events-none': disabled || loading,
      'animate-pulse': loading
    }
  )

  // Size variants
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  // Theme-based styles - let the theme handle all styling including hover effects
  const variantStyles = variant === 'primary'
    ? cn(
        theme.primaryButtonClass.includes('yellow')
          ? '!bg-yellow-500 !text-black hover:!bg-yellow-400 hover:scale-105 hover:shadow-lg transition-all duration-200'
          : '!bg-blue-700 !text-white hover:!bg-blue-600 hover:scale-105 hover:shadow-lg transition-all duration-200',
        theme.focusRingClass
      )
    : cn(theme.secondaryButtonClass, theme.focusRingClass)

  // Combine all styles - no inline styles to avoid overriding CSS hover effects
  const buttonStyles = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles,
    className
  )

  // Render as link if href is provided
  if (href && !disabled && !loading) {
    return (
      <Link
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : rel}
        className={buttonStyles}
      >
        {icon && iconPosition === 'left' && (
          <span className={cn('flex-shrink-0', { 'animate-spin': loading })}>
            {icon}
          </span>
        )}
        <span>{children}</span>
        {icon && iconPosition === 'right' && (
          <span className={cn('flex-shrink-0', { 'animate-spin': loading })}>
            {icon}
          </span>
        )}
      </Link>
    )
  }

  // Render as button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonStyles}
    >
      {icon && iconPosition === 'left' && (
        <span className={cn('flex-shrink-0', { 'animate-spin': loading })}>
          {icon}
        </span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className={cn('flex-shrink-0', { 'animate-spin': loading })}>
          {icon}
        </span>
      )}
    </button>
  )
}

export default PrimaryButton
