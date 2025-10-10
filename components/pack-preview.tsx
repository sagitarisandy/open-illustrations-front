"use client"

import { useEffect, useState } from "react"
import { recolorBlueToAccent } from "@/lib/svg-recolor"

export default function PackPreview({ id = 1 }: { id?: number }) {
  const [svg, setSvg] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    async function load() {
      try {
        setError(null)
        const res = await fetch(`/api/illustrations/${id}/public`)
        if (!res.ok) throw new Error(`Failed to fetch preview: ${res.status}`)
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
  }, [id])

  return (
    <div className="rounded-2xl border bg-card p-2 shadow-sm">
      <div className="aspect-square w-full overflow-hidden rounded-xl border bg-muted/40">
        {error && (
          <div className="flex h-full items-center justify-center p-6 text-sm text-destructive">{error}</div>
        )}
        {!error && !svg && <div className="h-full animate-pulse rounded-xl bg-muted" />}
        {!error && svg && (
          <div className="h-full w-full [&_svg]:h-full [&_svg]:w-full" dangerouslySetInnerHTML={{ __html: svg }} />
        )}
      </div>
    </div>
  )
}
