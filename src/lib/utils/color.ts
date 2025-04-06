export type ThemeColors = {
  background: string;
  primary: string;
  secondary: string;
}

export function generateDarkVariant(color: string): string {
  const reduceValue = 0.5;

  let r = Number.parseInt(color.slice(1, 3), 16)
  let g = Number.parseInt(color.slice(3, 5), 16)
  let b = Number.parseInt(color.slice(5, 7), 16)

  r = Math.max(Math.floor(r * reduceValue), 0)
  g = Math.max(Math.floor(g * reduceValue), 0)
  b = Math.max(Math.floor(b * reduceValue), 0)

  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
}

export function generateDarkThemeColors(lightColors: ThemeColors): ThemeColors {
  return {
    background: generateDarkVariant(lightColors.background),
    primary: lightColors.primary,
    secondary: lightColors.secondary,
  }
}

export function hexToHSL(hex: string): string {
  hex = hex.replace(/^#/, "")

  const r = Number.parseInt(hex.slice(0, 2), 16) / 255
  const g = Number.parseInt(hex.slice(2, 4), 16) / 255
  const b = Number.parseInt(hex.slice(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  let l = (max + min) / 2
  let h, s

  if (max === min) {
    h = s = 0
  } else {
    s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min)

    switch (max) {
      case r:
        h = (g - b) / (max - min) + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / (max - min) + 2
        break
      case b:
        h = (r - g) / (max - min) + 4
        break
      default:
        h = 0
    }
    h /= 6
  }

  h = Math.round(h * 360)
  s = Math.round(s * 100)
  l = Math.round(l * 100)

  return `${h} ${s}% ${l}%`
} 