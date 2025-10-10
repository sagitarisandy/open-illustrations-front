"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { recolorBlueToAccent } from "@/lib/svg-recolor"

function normalizeUrl(url?: string) {
  if (!url) return undefined
  if (url.startsWith("http")) return `/api/illustrations/fetch?url=${encodeURIComponent(url)}`
  const m = url.match(/^\/api\/v1\/illustrations\/(\d+)\/public/)
  if (m) return `/api/illustrations/${m[1]}/public`
  return url
}

export default function SvgCard({ title, url }: { title: string; url?: string }) {
  const [svg, setSvg] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const src = useMemo(() => normalizeUrl(url), [url])

  useEffect(() => {
    let active = true
    async function load() {
      if (!src) return
      try {
        setError(null)
        setSvg(null)
        const res = await fetch(src)
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`)
  const text = await res.text()
  if (active) setSvg(recolorBlueToAccent(text))
      } catch (e: any) {
        if (active) setError(e.message || "Failed to load SVG")
      }
    }
    load()
    return () => {
      active = false
    }
  }, [src])

  return (
    <Card className="group overflow-hidden rounded-2xl border bg-card transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        <div className="mb-3 aspect-[4/3] w-full overflow-hidden rounded-xl border bg-muted/40">
          {error && (
            <div className="flex h-full items-center justify-center p-6 text-sm text-destructive">{error}</div>
          )}
          {!error && !svg && <div className="h-full animate-pulse rounded-xl bg-muted" />}
          {!error && svg && (
            <div className="h-full w-full [&_svg]:h-full [&_svg]:w-full" dangerouslySetInnerHTML={{ __html: svg }} />
          )}
        </div>
        <p className="text-center text-sm font-medium text-foreground">{title}</p>
      </CardContent>
    </Card>
  )
}
