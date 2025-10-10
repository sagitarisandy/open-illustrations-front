// Recolor only "blue-ish" fills/strokes to CSS variable accent, preserving grayscale/black and other colors.

type RGB = { r: number; g: number; b: number }

function clamp(n: number, min = 0, max = 255) {
  return Math.max(min, Math.min(max, n))
}

function parseHex(c: string): RGB | null {
  const hex = c.trim()
  const m3 = /^#([0-9a-fA-F]{3})$/.exec(hex)
  if (m3) {
    const v = m3[1]
    const r = parseInt(v[0] + v[0], 16)
    const g = parseInt(v[1] + v[1], 16)
    const b = parseInt(v[2] + v[2], 16)
    return { r, g, b }
  }
  const m6 = /^#([0-9a-fA-F]{6})$/.exec(hex)
  if (m6) {
    const v = m6[1]
    const r = parseInt(v.substring(0, 2), 16)
    const g = parseInt(v.substring(2, 4), 16)
    const b = parseInt(v.substring(4, 6), 16)
    return { r, g, b }
  }
  return null
}

function parseRgb(c: string): RGB | null {
  const m = /^rgba?\(([^)]+)\)$/i.exec(c.trim())
  if (!m) return null
  const parts = m[1].split(",").map((s) => s.trim())
  if (parts.length < 3) return null
  const to255 = (val: string) => {
    if (val.endsWith("%")) return clamp((parseFloat(val) / 100) * 255)
    return clamp(parseFloat(val))
  }
  const r = to255(parts[0])
  const g = to255(parts[1])
  const b = to255(parts[2])
  return { r, g, b }
}

function rgbToHue({ r, g, b }: RGB): number {
  const R = r / 255, G = g / 255, B = b / 255
  const max = Math.max(R, G, B), min = Math.min(R, G, B)
  const d = max - min
  if (d === 0) return 0
  let h = 0
  switch (max) {
    case R:
      h = ((G - B) / d) % 6
      break
    case G:
      h = (B - R) / d + 2
      break
    case B:
      h = (R - G) / d + 4
      break
  }
  h *= 60
  if (h < 0) h += 360
  return h
}

function rgbToHsl({ r, g, b }: RGB): { h: number; s: number; l: number } {
  const R = r / 255, G = g / 255, B = b / 255
  const max = Math.max(R, G, B), min = Math.min(R, G, B)
  let h = 0, s = 0
  const l = (max + min) / 2
  if (max === min) {
    h = 0
    s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max - min)
    switch (max) {
      case R:
        h = (G - B) / d + (G < B ? 6 : 0)
        break
      case G:
        h = (B - R) / d + 2
        break
      case B:
        h = (R - G) / d + 4
        break
    }
    h *= 60
  }
  return { h, s, l }
}

function parseColor(c?: string): RGB | null {
  if (!c) return null
  if (/^#/.test(c)) return parseHex(c)
  if (/^rgba?\(/i.test(c)) return parseRgb(c)
  // named colors minimal support
  const lower = c.trim().toLowerCase()
  if (lower === "blue") return { r: 0, g: 0, b: 255 }
  if (lower === "dodgerblue") return { r: 30, g: 144, b: 255 }
  if (lower === "royalblue") return { r: 65, g: 105, b: 225 }
  return null
}

function isWhiteOrTransparent(c?: string): boolean {
  if (!c) return false
  const lower = c.trim().toLowerCase()
  return (
    lower === "none" ||
    lower === "transparent" ||
    lower === "#fff" ||
    lower === "#ffffff" ||
    lower === "white"
  )
}

function isBlueish(rgb: RGB): boolean {
  const { h, s, l } = rgbToHsl(rgb)
  // Only recolor vivid-medium blues; avoid desaturated (grayish) and too dark/bright
  const isBlueHue = h >= 200 && h <= 250
  const vividEnough = s >= 0.35
  const goodLightness = l >= 0.25 && l <= 0.80
  return isBlueHue && vividEnough && goodLightness
}

function replaceColorValue(val: string): string | null {
  if (isWhiteOrTransparent(val)) return null
  const rgb = parseColor(val)
  if (rgb && isBlueish(rgb)) return "var(--accent)"
  return null
}

function recolorBlueInternal(svg: string, targetColor: string): string {
  let out = svg
  const urlPattern = /url\(/i

  const replaceWithTarget = (value: string): string | null => {
    if (urlPattern.test(value)) return null
    const rgb = parseColor(value)
    if (rgb && isBlueish(rgb)) return targetColor
    return null
  }

  out = out.replace(/\b(fill|stroke)=(["'])([^"']+?)\2/gi, (match, prop, quote, value) => {
    const repl = replaceWithTarget(value)
    return repl ? `${prop}=${quote}${repl}${quote}` : match
  })

  out = out.replace(/style=(["'])([^"']*?)\1/gi, (match, quote, content) => {
    const parts = content
      .split(/;/)
      .map((p: string) => p.trim())
      .filter(Boolean)
    let changed = false
    const newParts = parts.map((p: string) => {
      const [kRaw, vRaw] = p.split(":").map((s: string) => s && s.trim())
      const k = (kRaw || "").toLowerCase()
      const v = vRaw || ""
      if ((k === "fill" || k === "stroke") && !/url\(/i.test(v)) {
        const repl = replaceWithTarget(v)
        if (repl) {
          changed = true
          return `${k}: ${repl}`
        }
      }
      return p
    })
    return changed ? `style=${quote}${newParts.join("; ")}${quote}` : match
  })

  return out
}

export function recolorBlueToAccent(svg: string): string {
  return recolorBlueInternal(svg, "var(--accent)")
}

export function recolorBlueTo(svg: string, targetHex: string): string {
  return recolorBlueInternal(svg, targetHex)
}
