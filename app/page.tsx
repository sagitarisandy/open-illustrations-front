import SiteNav from "@/components/site-nav"
import Hero from "@/components/hero"
import { BestSelling, ColorPlayground, FeaturedCollections, LatestReleases, Testimonials } from "@/components/sections"

export default function Page() {
  return (
    <main>
      <SiteNav />
      <Hero />
      <LatestReleases />
      <FeaturedCollections />
      <BestSelling />
      <ColorPlayground />
      <Testimonials />
      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Arya Illustrations — Built for creators.
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
