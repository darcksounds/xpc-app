import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export const themes = {
  dark: {
    bg: '#0F172A',
    surface: '#1E293B',
    border: '#2a3a50',
    text: '#FFFFFF',
    muted: '#94A3B8',
    accent: '#F59E0B',
    card: '#1E293B',
    input: '#0F172A',
  },
  light: {
    bg: '#F8FAFC',
    surface: '#FFFFFF',
    border: '#E2E8F0',
    text: '#0F172A',
    muted: '#64748B',
    accent: '#F59E0B',
    card: '#FFFFFF',
    input: '#F1F5F9',
  }
}

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('dark')
  const toggle = () => setMode(prev => prev === 'dark' ? 'light' : 'dark')
  const theme = themes[mode]

  return (
    <ThemeContext.Provider value={{ theme, mode, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}