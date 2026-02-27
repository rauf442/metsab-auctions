// frontend/shared/src/lib/ThemeProvider.client.tsx
// Purpose: Client-side ThemeProvider component to avoid SSR issues
'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { AppTheme, defaultTheme } from './theme-utils'

export const ThemeContext = createContext<AppTheme>(defaultTheme)

export const useTheme = () => {
  // For now, just return default theme to avoid build issues
  // TODO: Implement proper theming
  return defaultTheme
}

interface ThemeProviderProps {
  children: ReactNode
  theme: AppTheme
}

export function ThemeProvider({ children, theme }: ThemeProviderProps) {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}
