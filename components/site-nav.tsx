"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Palette, Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

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

  const links = [
    { href: "/about", label: "About" },
    { href: "/work", label: "Work" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="font-semibold tracking-tight">
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-6 w-6 rounded-md bg-primary"></span>
            <span className="text-lg">Arya Illustrations</span>
          </span>
        </Link>

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
        </ul>

        <div className="flex items-center gap-2">
          <AccentPicker value={accent} onChange={setAccent} />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
