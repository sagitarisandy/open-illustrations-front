"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { recolorBlueTo } from "@/lib/svg-recolor"

function downloadFile(url: string) {
  const a = document.createElement("a")
  a.href = url
  a.download = ""
  a.rel = "noopener"
  document.body.appendChild(a)
  a.click()
  a.remove()
}

export default function DownloadDialog({ id, title, trigger }: { id: number; title?: string; trigger?: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    if (!open) return
    let active = true
    async function load() {
      try {
        setLoading(true)
        setError(null)
        setUrl(null)
        const res = await fetch(`/api/illustrations/${id}/download`)
        if (!res.ok) throw new Error(`Failed: ${res.status}`)
        const json = await res.json()
        const u = json.download_url as string | undefined
        if (!u) throw new Error("No download_url")
        if (active) setUrl(u)
      } catch (e: any) {
        if (active) setError(e.message || "Failed to prepare download")
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [open, id])

  function getCurrentAccentHex(): string {
    // Read the current value of --accent from computed styles
    const root = document.documentElement
    const val = getComputedStyle(root).getPropertyValue("--accent").trim()
    // If it's already a hex, return; else default to a known hex
    return val && /^#([0-9a-fA-F]{3}){1,2}$/.test(val) ? val : "#1E40FF"
  }

  async function handleDownload() {
    if (!url) return
    try {
      setDownloading(true)
      // If URL is direct SVG, fetch, recolor, and save
      const res = await fetch(url)
      const contentType = res.headers.get("Content-Type") || ""
      const text = await res.text()
      const accentHex = getCurrentAccentHex()
      const svgOut = recolorBlueTo(text, accentHex)
      const blob = new Blob([svgOut], { type: "image/svg+xml;charset=utf-8" })
      const objUrl = URL.createObjectURL(blob)
      downloadFile(objUrl)
      URL.revokeObjectURL(objUrl)
    } catch (e: any) {
      setError(e.message || "Failed to download")
    } finally {
      setDownloading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button>Download</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title || "Download"}</DialogTitle>
          <DialogDescription>Choose an option to export the illustration.</DialogDescription>
        </DialogHeader>
        <div className="min-h-24">
          {loading && <div className="text-sm text-muted-foreground">Preparing link…</div>}
          {error && <div className="text-sm text-destructive">{error}</div>}
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>Close</Button>
          <Button disabled={!url || downloading} onClick={handleDownload}>{downloading ? "Downloading..." : "Download SVG"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
