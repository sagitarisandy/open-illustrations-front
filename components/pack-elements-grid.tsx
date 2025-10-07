"use client"

import { Card, CardContent } from "@/components/ui/card"

export function ElementTile({ label }: { label: string }) {
  return (
    <Card className="group overflow-hidden rounded-2xl border bg-card transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        <div className="mb-3 aspect-square w-full rounded-xl border bg-muted/40">
          <svg viewBox="0 0 300 300" className="h-full w-full rounded-xl" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="300" fill="#ffffff" />
            <rect x="60" y="70" width="180" height="120" rx="14" fill="var(--accent)" opacity="0.12" />
            <circle cx="110" cy="190" r="22" fill="var(--accent)" opacity="0.18" />
            <path d="M40 250 L260 250" stroke="var(--border)" strokeWidth="2" />
          </svg>
        </div>
        <p className="text-center text-xs font-medium text-foreground">{label}</p>
      </CardContent>
    </Card>
  )
}

export default function PackElementsGrid({ items }: { items: string[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((i) => (
        <ElementTile key={i} label={i} />
      ))}
    </div>
  )
}
