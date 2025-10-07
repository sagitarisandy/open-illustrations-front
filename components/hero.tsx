import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-20 md:px-6">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-widest text-primary">Premium Vector Library</p>
          <h1 className="text-pretty text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Human Made{" "}
            <span className="rounded-xl bg-primary px-2 py-1 text-primary-foreground shadow-sm">
              Vector Illustrations
            </span>
          </h1>
          <p className="max-w-prose text-muted-foreground">
            5,000+ premium illustrations for web, apps, and product teams — expressive, flexible, and brandable.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button className="h-11 rounded-xl px-6 text-base shadow-sm">Browse Illustrations</Button>
            <Button variant="secondary" className="h-11 rounded-xl px-6 text-base shadow-sm" asChild>
              <a href="/contact">Custom Work</a>
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>Trusted by</span>
            <div className="flex items-center gap-4 opacity-80">
              <span className="font-medium">ACME</span>
              <span className="font-medium">Globex</span>
              <span className="font-medium">Voxel</span>
              <span className="font-medium">Nova</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-2xl border bg-card p-2 shadow-sm">
            <Image
              alt="Inspiration gallery"
              width={1200}
              height={800}
              className="rounded-xl"
              src="/images/inspiration-undraw.png"
            />
          </div>
          <div className="pointer-events-none absolute -left-6 -top-6 hidden h-24 w-24 rounded-2xl bg-secondary/20 blur-xl md:block" />
        </div>
      </div>
    </section>
  )
}
