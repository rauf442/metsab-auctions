// frontend/shared/src/lib/theme-utils.ts
// Purpose: Server-safe theme utilities and theme definitions

export interface AppTheme {
  // Layout colors
  bgClass: string
  textClass: string
  borderClass: string

  // Button colors
  primaryButtonClass: string
  secondaryButtonClass: string
  primaryBgColor: string

  // Form colors
  inputClass: string
  labelClass: string

  // Card/section colors
  cardBgClass: string
  cardBorderClass: string
  sectionBgClass: string

  // Status colors
  successBgClass: string
  successBorderClass: string
  successTextClass: string

  errorBgClass: string
  errorBorderClass: string
  errorTextClass: string

  warningBgClass: string
  warningBorderClass: string
  warningTextClass: string

  infoBgClass: string
  infoBorderClass: string
  infoTextClass: string

  // Focus colors
  focusRingClass: string

  // Accent colors for specific elements
  accentBgClass: string
  accentTextClass: string
}

export const defaultTheme: AppTheme = {
  bgClass: 'bg-gray-50',
  textClass: 'text-gray-900',
  borderClass: 'border-gray-200',
  primaryButtonClass: 'bg-teal-600 text-white hover:bg-teal-700',
  secondaryButtonClass: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50',
  primaryBgColor: 'bg-teal-600',
  inputClass: 'border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500',
  labelClass: 'text-gray-700',
  cardBgClass: 'bg-white',
  cardBorderClass: 'border-gray-200',
  sectionBgClass: 'bg-gray-50',
  successBgClass: 'bg-green-50',
  successBorderClass: 'border-green-200',
  successTextClass: 'text-green-800',
  errorBgClass: 'bg-red-50',
  errorBorderClass: 'border-red-200',
  errorTextClass: 'text-red-800',
  warningBgClass: 'bg-yellow-50',
  warningBorderClass: 'border-yellow-200',
  warningTextClass: 'text-yellow-800',
  infoBgClass: 'bg-blue-50',
  infoBorderClass: 'border-blue-200',
  infoTextClass: 'text-blue-800',
  focusRingClass: 'focus:ring-2 focus:ring-teal-500',
  accentBgClass: 'bg-teal-100',
  accentTextClass: 'text-teal-600'
}

// Predefined themes for each brand
export const aurumTheme: AppTheme = {
  bgClass: 'bg-gradient-to-br from-black via-gray-900 to-black',
  textClass: 'text-white',
  borderClass: 'border-yellow-500/60',
  primaryButtonClass: 'bg-yellow-500 text-black hover:bg-yellow-400 hover:shadow-yellow-500/25 font-semibold',
  secondaryButtonClass: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/60 hover:bg-yellow-400/20 hover:border-yellow-400/80 hover:shadow-md hover:scale-[1.01] active:scale-[0.99] font-medium transition-all duration-200',
  primaryBgColor: 'bg-yellow-500',
  inputClass: 'border border-yellow-500/60 bg-black/50 text-white placeholder-yellow-200/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400',
  labelClass: 'text-yellow-400 font-medium',
  cardBgClass: 'bg-gray-900/90',
  cardBorderClass: 'border-yellow-500/30',
  sectionBgClass: 'bg-black/70',
  successBgClass: 'bg-green-900/20',
  successBorderClass: 'border-green-500/30',
  successTextClass: 'text-green-400',
  errorBgClass: 'bg-red-900/20',
  errorBorderClass: 'border-red-500/30',
  errorTextClass: 'text-red-400',
  warningBgClass: 'bg-yellow-900/20',
  warningBorderClass: 'border-yellow-500/30',
  warningTextClass: 'text-yellow-400',
  infoBgClass: 'bg-yellow-400/10',
  infoBorderClass: 'border-yellow-400/30',
  infoTextClass: 'text-yellow-400',
  focusRingClass: 'focus:ring-2 focus:ring-yellow-400',
  accentBgClass: 'bg-yellow-400/10',
  accentTextClass: 'text-yellow-400'
}

export const metsabTheme: AppTheme = {
  bgClass: 'bg-gradient-to-br from-slate-50 via-blue-50/50 to-slate-100',
  textClass: 'text-slate-900',
  borderClass: 'border-blue-700',
  primaryButtonClass: 'bg-blue-700 text-white hover:bg-blue-600 hover:shadow-blue-500/25 font-semibold',
  secondaryButtonClass: 'bg-slate-100 text-slate-700 border-2 border-slate-300 hover:bg-slate-200 hover:border-slate-400 hover:shadow-md hover:scale-[1.01] active:scale-[0.99] font-medium shadow-sm transition-all duration-200',
  primaryBgColor: 'bg-blue-700',
  inputClass: 'border-2 border-blue-700 bg-white text-slate-900 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 shadow-sm',
  labelClass: 'text-slate-800 font-semibold',
  cardBgClass: 'bg-white',
  cardBorderClass: 'border-blue-200',
  sectionBgClass: 'bg-slate-50',
  successBgClass: 'bg-green-50',
  successBorderClass: 'border-green-600',
  successTextClass: 'text-green-900',
  errorBgClass: 'bg-red-50',
  errorBorderClass: 'border-red-600',
  errorTextClass: 'text-red-900',
  warningBgClass: 'bg-yellow-50',
  warningBorderClass: 'border-yellow-600',
  warningTextClass: 'text-yellow-900',
  infoBgClass: 'bg-blue-50',
  infoBorderClass: 'border-blue-700',
  infoTextClass: 'text-slate-800',
  focusRingClass: 'focus:ring-2 focus:ring-blue-700',
  accentBgClass: 'bg-blue-50',
  accentTextClass: 'text-slate-800'
}
