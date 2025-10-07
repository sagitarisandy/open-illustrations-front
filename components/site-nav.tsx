"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Palette, Sun, Moon, Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { packs } from "@/lib/packs"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    const root = document.documentElement
    const stored = localStorage.getItem("theme")
    const initial = stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    root.classList.toggle("dark", initial === "dark")
    setIsDark(initial === "dark")
  }, [])
  const toggle = () => {
    const root = document.documentElement
    const next = !isDark
    root.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
    setIsDark(next)
  }
  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border bg-background transition-colors hover:bg-muted"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}

export function AccentPicker({
  onChange,
  value,
}: {
  value: string
  onChange: (val: string) => void
}) {
  const presets = ["#1E40FF", "#6C63FF", "#1EA7FD", "#10B981", "#F59E0B", "#EF4444", "#111111"]
  return (
    <div className="flex items-center gap-2">
      <label className="sr-only" htmlFor="accent">
        Pick accent color
      </label>
      <input
        id="accent"
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-9 cursor-pointer rounded-lg border bg-white p-1"
        aria-label="Accent color picker"
      />
      <div className="hidden md:flex items-center gap-1">
        {presets.map((c) => (
          <button
            key={c}
            aria-label={`Set accent ${c}`}
            onClick={() => onChange(c)}
            style={{ backgroundColor: c }}
            className="h-6 w-6 rounded-md ring-1 ring-black/10"
          />
        ))}
      </div>
      <Palette className="h-4 w-4 text-muted-foreground" />
    </div>
  )
}

export function useAccent() {
  const [accent, setAccent] = useState("#1E40FF")
  useEffect(() => {
    const stored = localStorage.getItem("accent") || "#1E40FF"
    setAccent(stored)
    document.documentElement.style.setProperty("--accent", stored)
    // compute contrasting foreground
    const hex = stored.replace("#", "")
    const r = Number.parseInt(hex.substring(0, 2), 16)
    const g = Number.parseInt(hex.substring(2, 4), 16)
    const b = Number.parseInt(hex.substring(4, 6), 16)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    const fg = luminance > 0.6 ? "#111111" : "#FFFFFF"
    document.documentElement.style.setProperty("--accent-foreground", fg)
  }, [])
  const update = (val: string) => {
    setAccent(val)
    localStorage.setItem("accent", val)
    document.documentElement.style.setProperty("--accent", val)
  }
  return { accent, setAccent: update }
}

export default function SiteNav() {
  const pathname = usePathname()
  const { accent, setAccent } = useAccent()
  const [open, setOpen] = useState(false)

  // Close on route change (basic: watch pathname)
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const links = [
    { href: "/about", label: "About" },
    { href: "/work", label: "Work" },
    { href: "/contact", label: "Contact" },
  ]

  // Derive style categories from packs (simplify to first 8 unique words of styles)
  const designStyles = [...new Set(packs.map((p) => p.style.split(",")[0]))].slice(0, 8)

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-4">
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border bg-background md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link href="/" className="font-semibold tracking-tight">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-6 w-6 rounded-md bg-primary"></span>
              <span className="text-lg">Arya Illustrations</span>
            </span>
          </Link>
        </div>

        <ul className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={cn(
                  "text-sm text-muted-foreground transition-colors hover:text-foreground",
                  pathname === l.href && "text-foreground",
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="relative hidden md:block">
            <button
              onClick={() => setOpen((o) => !o)}
              className={cn(
                "text-sm text-muted-foreground transition-colors hover:text-foreground", 
                open && "text-foreground"
              )}
            >
              Browse
            </button>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <AccentPicker value={accent} onChange={setAccent} />
          <ThemeToggle />
        </div>
      </nav>

      {/* Mega / mobile menu overlay */}
      {open && (
        <div className="absolute inset-x-0 top-full z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75 shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
            <div className="grid gap-10 md:grid-cols-12">
              {/* Design Styles */}
              <div className="md:col-span-4 space-y-4">
                <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">Design Styles</h3>
                <ul className="grid gap-2">
                  {designStyles.map((s) => (
                    <li key={s}>
                      <Link
                        href="/pick"
                        className="flex items-center gap-3 rounded-xl border p-2.5 text-sm hover:bg-muted"
                      >
                        <span className="inline-block h-10 w-10 rounded-lg bg-muted" />
                        <span className="font-medium leading-tight">{s}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature highlight */}
              <div className="md:col-span-4 space-y-6 border-t pt-6 md:border-t-0 md:border-l md:pl-8">
                <div className="space-y-3">
                  <h3 className="text-base font-semibold">Illustrations Playbook</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">Insights, tutorials and inspiration to learn about vector illustrations.</p>
                  <Link href="/about" className="text-sm font-medium text-primary hover:underline">Read more →</Link>
                </div>
                <div className="space-y-3">
                  <h3 className="text-base font-semibold">Free SVG Color Editor</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">Tweak palette & export instantly for your brand system.</p>
                  <Link href="/work" className="text-sm font-medium text-primary hover:underline">Open tool →</Link>
                </div>
              </div>

              {/* Right column links */}
              <div className="md:col-span-4 space-y-6 rounded-xl bg-primary/5 p-6">
                <div className="space-y-4">
                  <nav className="grid gap-3 text-sm font-medium">
                    <Link href="/pick" className="hover:underline">Illustration packs</Link>
                    <Link href="/pick" className="hover:underline">All Access Bundle</Link>
                    <Link href="/pick" className="hover:underline">Categories</Link>
                    <Link href="/about" className="hover:underline">Update log</Link>
                    <Link href="/contact" className="hover:underline">Custom Work</Link>
                  </nav>
                </div>
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Arya Illustrations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
