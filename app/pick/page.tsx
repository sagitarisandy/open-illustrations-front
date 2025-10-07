"use client"

import SiteNav, { AccentPicker, useAccent } from "@/components/site-nav"
import { IllustrationCard } from "@/components/illustration-card"

export default function PickPage() {
  const { accent, setAccent } = useAccent()
  const items = [
    "AI Response",
    "Adjust Settings",
    "Data at Work",
    "Authentication",
    "Clouds",
    "Real-time Collaboration",
    "Code Review",
    "Texting",
    "Time Management",
    "Server Status",
    "Stand Out",
    "Shared Workspace",
  ]

  return (
    <main>
      <SiteNav />
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Illustrations</h1>
          <AccentPicker value={accent} onChange={setAccent} />
        </div>
        <p className="mb-6 max-w-prose text-muted-foreground">
          Browse and click to preview. Use the color picker to match on-the-fly accent generation to your brand.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((t) => (
            <div key={t} className="rounded-2xl border bg-white p-0.5 shadow-sm">
              <div className="rounded-xl border bg-gray-50 p-4">
                <IllustrationCard title={t} accent={"var(--accent)"} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
