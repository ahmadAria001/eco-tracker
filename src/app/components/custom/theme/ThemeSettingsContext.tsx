'use client'

import { createContext, useContext, useReducer, useEffect } from 'react'

// Types
export interface ThemeColors {
  background: string
  primary: string
  secondary: string
}

export interface CustomColorScheme {
  id: number
  name: string
  colors: ThemeColors
}

interface ThemeSettings {
  activeTheme: 'light' | 'dark' | 'system'
  colorScheme: 'default' | 'custom'
  customColorSchemes: CustomColorScheme[]
  selectedColorScheme: number | null
}

// Initial state
const defaultCustomTheme: ThemeColors = {
  background: "#ffffff",
  primary: "#0ea5e9",
  secondary: "#f1f5f9",
}

const initialState: ThemeSettings = {
  activeTheme: 'system',
  colorScheme: 'default',
  customColorSchemes: [],
  selectedColorScheme: null
}

// Action types
type ThemeSettingsAction =
  | { type: 'SET_ACTIVE_THEME'; payload: 'light' | 'dark' | 'system' }
  | { type: 'SET_COLOR_SCHEME'; payload: 'default' | 'custom' }
  | { type: 'ADD_CUSTOM_COLOR_SCHEME'; payload: CustomColorScheme }
  | { type: 'UPDATE_CUSTOM_COLOR_SCHEME'; payload: CustomColorScheme }
  | { type: 'DELETE_CUSTOM_COLOR_SCHEME'; payload: number }
  | { type: 'SELECT_COLOR_SCHEME'; payload: number | null }
  | { type: 'LOAD_SETTINGS'; payload: ThemeSettings }

// Reducer
function themeSettingsReducer(state: ThemeSettings, action: ThemeSettingsAction): ThemeSettings {
  switch (action.type) {
    case 'SET_ACTIVE_THEME':
      return { ...state, activeTheme: action.payload }
    case 'SET_COLOR_SCHEME':
      return { ...state, colorScheme: action.payload }
    case 'ADD_CUSTOM_COLOR_SCHEME':
      return {
        ...state,
        customColorSchemes: [...state.customColorSchemes, action.payload],
        selectedColorScheme: action.payload.id
      }
    case 'UPDATE_CUSTOM_COLOR_SCHEME':
      return {
        ...state,
        customColorSchemes: state.customColorSchemes.map(scheme =>
          scheme.id === action.payload.id ? action.payload : scheme
        )
      }
    case 'DELETE_CUSTOM_COLOR_SCHEME':
      return {
        ...state,
        customColorSchemes: state.customColorSchemes.filter(scheme => scheme.id !== action.payload),
        selectedColorScheme: state.selectedColorScheme === action.payload ? null : state.selectedColorScheme
      }
    case 'SELECT_COLOR_SCHEME':
      return { ...state, selectedColorScheme: action.payload }
    case 'LOAD_SETTINGS':
      return action.payload
    default:
      return state
  }
}

// Context
const ThemeSettingsContext = createContext<{
  state: ThemeSettings
  dispatch: React.Dispatch<ThemeSettingsAction>
} | undefined>(undefined)

// Provider
export function ThemeSettingsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(themeSettingsReducer, initialState)

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('theme-settings')
      if (savedSettings) {
        dispatch({ type: 'LOAD_SETTINGS', payload: JSON.parse(savedSettings) })
      }
    } catch (error) {
      console.error('Failed to load theme settings:', error)
    }
  }, [])

  // Save settings to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem('theme-settings', JSON.stringify(state))
    } catch (error) {
      console.error('Failed to save theme settings:', error)
    }
  }, [state])

  return (
    <ThemeSettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeSettingsContext.Provider>
  )
}

// Hook
export function useThemeSettings() {
  const context = useContext(ThemeSettingsContext)
  if (context === undefined) {
    throw new Error('useThemeSettings must be used within a ThemeSettingsProvider')
  }
  return context
} 