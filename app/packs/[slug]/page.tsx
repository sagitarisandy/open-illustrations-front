import Image from "next/image"
import Link from "next/link"
import SiteNav from "@/components/site-nav"
import PackElementsGrid from "@/components/pack-elements-grid"
import { Button } from "@/components/ui/button"
import PackPreview from "@/components/pack-preview"
import DownloadDialog from "@/components/download-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { getPack, packs } from "@/lib/packs"
import { Check, Folder, FileBox, Tag } from "lucide-react"

export default function PackPage({ params }: { params: { slug: string } }) {
  const data = getPack(params.slug)

  if (!data) {
    return (
      <main>
        <SiteNav />
        <section className="mx-auto max-w-5xl px-4 py-20 text-center md:px-6">
          <h1 className="mb-3 text-3xl font-semibold">Pack not found</h1>
          <p className="mb-6 text-muted-foreground">The requested illustration pack does not exist.</p>
          <Button asChild>
            <Link href="/pick">Browse all illustrations</Link>
          </Button>
        </section>
      </main>
    )
  }

  return (
    <main>
      <SiteNav />
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link className="hover:text-foreground" href="/">
            Home
          </Link>{" "}
          /{" "}
          <Link className="hover:text-foreground" href="/pick">
            Illustrations
          </Link>{" "}
          / <span className="text-foreground">{data.title}</span>
        </nav>

        <div className="grid items-start gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h1 className="text-balance text-3xl font-semibold leading-tight md:text-4xl">{data.title}</h1>
            <p className="text-muted-foreground">{data.summary}</p>

            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="rounded-full border px-2.5 py-1">Elements: {data.count}</span>
              <span className="rounded-full border px-2.5 py-1">Style: {data.style}</span>
            </div>

            <div className="space-y-3 rounded-2xl border p-4 shadow-sm">
              <p className="text-sm leading-relaxed">{data.longDescription}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                {data.keywords.map((k) => (
                  <span key={k} className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1">
                    <Tag className="h-3.5 w-3.5" />
                    {k}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <DownloadDialog id={1} title={data.title} trigger={<Button className="h-11 rounded-xl px-6 text-base shadow-sm">Get this SVG</Button>} />
              <Button variant="secondary" className="h-11 rounded-xl px-6 text-base shadow-sm">Get all access</Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="rounded-2xl">
                <CardContent className="p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <Folder className="h-4 w-4" />
                    Style
                  </div>
                  <p className="text-sm text-muted-foreground">{data.style}</p>
                </CardContent>
              </Card>
              <Card className="rounded-2xl">
                <CardContent className="p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <FileBox className="h-4 w-4" />
                    File types
                  </div>
                  <p className="text-sm text-muted-foreground">{data.fileTypes.join(", ")}</p>
                </CardContent>
              </Card>
              <Card className="rounded-2xl">
                <CardContent className="p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <Check className="h-4 w-4" />
                    License
                  </div>
                  <p className="text-sm text-muted-foreground">{data.license}</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right preview column: made sticky so it stays in view while scrolling the left content */}
          <div className="space-y-6 md:sticky md:top-24 md:self-start">
            {/* Live preview fetched from API, recolored to match the accent picker */}
            <PackPreview id={1} />
            {/* <div className="rounded-2xl border bg-card p-2 shadow-sm">
              <Image
                src="/images/reference-pack-detail.jpg"
                alt="Pack detail layout inspiration"
                width={1400}
                height={1400}
                className="rounded-xl"
              />
            </div> */}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-6 pt-2 md:px-6">
        <h2 className="mb-4 text-2xl font-semibold">What’s inside</h2>
        <PackElementsGrid items={data.items} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Other packs to consider</h3>
          <Link className="text-sm text-primary hover:underline" href="/pick">
            View all
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {packs
            .filter((p) => p.slug !== data.slug)
            .slice(0, 3)
            .map((p) => (
              <Link key={p.slug} href={`/packs/${p.slug}`} className="rounded-2xl border p-4 shadow-sm hover:shadow-md">
                <div className="mb-3 aspect-[4/3] w-full rounded-xl border bg-muted/40" />
                <div className="text-sm font-medium">{p.title}</div>
                <div className="text-xs text-muted-foreground">{p.summary}</div>
              </Link>
            ))}
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Arya Illustrations — Packs built for product teams.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Twitter
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Dribbble
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
