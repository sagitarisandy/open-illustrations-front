"use client"

import SiteNav, { AccentPicker, useAccent } from "@/components/site-nav"
import { IllustrationCard } from "@/components/illustration-card"
import { useEffect, useState } from "react"

type Illustration = {
  id: string | number
  title: string
  slug?: string
  category?: string
  pack?: string
  premium?: boolean
  fileName?: string
  storageKey?: string
  accentColor?: string
  previewSvg?: string
}

export default function PickPage() {
  const { accent, setAccent } = useAccent()
  const [items, setItems] = useState<Illustration[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    async function load() {
      try {
        setLoading(true)
        setError(null)
  // Fetch via internal proxy route to avoid exposing raw origin & handle CORS
    const res = await fetch("/api/illustrations")
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const raw = await res.json()
        const source = Array.isArray(raw)
          ? raw
          : raw.data || raw.items || raw.results || [] // support multiple shapes
        const mapped: Illustration[] = source.map((d: any, idx: number) => ({
          id: d.id ?? idx,
          title: d.title || d.name || `Illustration ${idx + 1}`,
          slug: d.slug || d.pack_ref?.slug,
          category: d.category_ref?.name,
          pack: d.pack_ref?.name,
          premium: Boolean(d.is_premium),
          fileName: d.file_name,
          storageKey: d.storage_key,
          accentColor: d.accentColor,
          previewSvg: d.previewSvg,
        }))
        if (active) setItems(mapped)
      } catch (e: any) {
        if (active) setError(e.message || "Failed to load illustrations")
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [])

  return (
    <main>
      <SiteNav />
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Illustrations</h1>
          <AccentPicker value={accent} onChange={setAccent} />
        </div>
        <p className="mb-6 max-w-prose text-muted-foreground">Browse and click to preview. Use the color picker to match accent generation to your brand.</p>
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl border bg-muted/40 p-6" />
            ))}
          </div>
        )}
        {error && !loading && (
          <div className="mb-6 rounded-xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
            Failed to load illustrations: {error}
          </div>
        )}
        {!loading && !error && (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {items.map((item) => (
              <div key={item.id} className="rounded-2xl border bg-white p-0.5 shadow-sm">
                <div className="flex h-full flex-col rounded-xl border bg-gray-50 p-4">
                  <IllustrationCard title={item.title} accent={item.accentColor || "var(--accent)"} />
                  <div className="mt-2 flex flex-wrap items-center justify-center gap-1">
                    {item.category && (
                      <span className="rounded-full border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        {item.category}
                      </span>
                    )}
                    {item.premium && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                        Premium
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
