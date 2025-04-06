import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useThemeSettings } from '@/app/components/custom/theme/ThemeSettingsContext'
import { generateDarkThemeColors, hexToHSL } from '@/lib/utils/color'

export function useThemeColors() {
  const { theme, resolvedTheme } = useTheme()
  const { state } = useThemeSettings()

  useEffect(() => {
    if (typeof window === "undefined") return

    const root = document.documentElement
    let isDark = theme === "dark"

    if (theme === "system" && resolvedTheme === "dark") {
      isDark = true
    }

    if (state.colorScheme === "custom" && state.selectedColorScheme !== null) {
      const selectedScheme = state.customColorSchemes.find(
        scheme => scheme.id === state.selectedColorScheme
      )
      if (selectedScheme) {
        const themeColors = isDark
          ? generateDarkThemeColors(selectedScheme.colors)
          : selectedScheme.colors

        Object.entries(themeColors).forEach(([key, value]) => {
          const hslValue = hexToHSL(value)
          root.style.setProperty(`--${key}`, `hsl(${hslValue})`)
        })

        const hslValue = hexToHSL(themeColors.primary)
        root.style.setProperty(`--ring`, `hsl(${hslValue})`)
        root.style.setProperty(`--sidebar-primary`, `hsl(${hslValue})`)
        root.style.setProperty(`--sidebar-ring`, `hsl(${hslValue})`)
      }
    } else {
      // Remove custom CSS variables when using default color scheme
      root.style.removeProperty('--background')
      root.style.removeProperty('--primary')
      root.style.removeProperty('--secondary')
      root.style.removeProperty('--ring')
      root.style.removeProperty('--sidebar-primary')
      root.style.removeProperty('--sidebar-ring')
    }
  }, [theme, resolvedTheme, state.colorScheme, state.selectedColorScheme, state.customColorSchemes])
} 