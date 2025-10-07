import type React from "react"
import { IllustrationCard } from "./illustration-card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export function SectionHeading({ title, cta }: { title: string; cta?: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-balance text-2xl font-semibold">{title}</h2>
      {cta}
    </div>
  )
}

export function LatestReleases() {
  const items = [
    "AI Response",
    "Adjust Settings",
    "Data at Work",
    "Authentication",
    "App Benchmarks",
    "Reviewed Docs",
    "Virtual Reality",
    "Logistics",
  ]
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionHeading
        title="Latest Releases"
        cta={
          <Button variant="secondary" className="rounded-xl">
            View all
          </Button>
        }
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((t) => (
          <IllustrationCard key={t} title={t} />
        ))}
      </div>
    </section>
  )
}

export function FeaturedCollections() {
  const items = [
    { title: "Product Ops", slug: "product-ops" },
    { title: "Fintech Scenes", slug: "fintech-scenes" },
    { title: "Dev Tools", slug: "dev-tools" },
    { title: "People Mono", slug: "people-mono" },
  ]
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionHeading title="Featured Collections" />
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((t) => (
          <Link key={t.slug} href={`/packs/${t.slug}`} className="block">
            <IllustrationCard title={t.title} />
          </Link>
        ))}
      </div>
    </section>
  )
}

export function BestSelling() {
  const items = [
    "Startup Scenes",
    "Business Mono",
    "Workflows",
    "Charts & Data",
    "Avatars",
    "AI Agents",
    "Icons (Outlined)",
    "E-commerce",
  ]
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionHeading
        title="Best Selling Packs"
        cta={
          <div className="flex gap-2">
            <Button size="sm" className="rounded-lg">
              Get all
            </Button>
            <Button size="sm" variant="secondary" className="rounded-lg">
              Top 100
            </Button>
          </div>
        }
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((t) => (
          <IllustrationCard key={t} title={t} />
        ))}
      </div>
    </section>
  )
}

export function ColorPlayground() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionHeading title="Color Picker" />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border p-6 shadow-sm">
          <p className="mb-3 text-sm text-muted-foreground">Adjust the accent to match your brand.</p>
          <div className="grid grid-cols-2 gap-4">
            <IllustrationCard title="Accent Preview 1" />
            <IllustrationCard title="Accent Preview 2" />
          </div>
        </div>
        <div className="rounded-2xl border p-2 shadow-sm">
          <Image
            src="/images/inspiration-getillustrations.jpg"
            alt="Inspiration layout"
            width={1400}
            height={2300}
            className="rounded-xl"
          />
        </div>
      </div>
    </section>
  )
}

export function Testimonials() {
  const logos = ["Forbes", "Canon", "Intel", "GE", "Aldi", "Rackspace"]
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 md:px-6">
      <div className="rounded-2xl border bg-muted/40 p-6 shadow-sm">
        <p className="mb-6 text-center text-sm text-muted-foreground">Loved by designers & developers</p>
        <div className="grid grid-cols-2 place-items-center gap-6 text-sm text-foreground/80 sm:grid-cols-3 md:grid-cols-6">
          {logos.map((l) => (
            <span key={l} className="font-medium">
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
