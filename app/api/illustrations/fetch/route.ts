import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")
  if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 })
  try {
    let u = new URL(url)
    // Allow-list of hosts; include common local aliases by default
    const allowedDefault = "minio:9000,host.docker.internal:9000,127.0.0.1:9000,localhost:9000"
    const allowed = (process.env.ALLOWED_IMAGE_HOSTS || allowedDefault)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)

    if (!allowed.includes(u.host)) {
      return NextResponse.json({ error: "Host not allowed", host: u.host }, { status: 400 })
    }

    // Optional host rewrite mapping: "from=to,from2=to2"
    const rewrite = process.env.IMAGE_PROXY_HOST_REWRITE || process.env.MINIO_PUBLIC_HOST /* legacy single mapping */
    if (rewrite) {
      if (rewrite.includes("=")) {
        const pairs = rewrite.split(",").map((p) => p.trim()).filter(Boolean)
        for (const p of pairs) {
          const [from, to] = p.split("=").map((s) => s.trim())
          if (from && to && u.host === from) {
            const toUrl = new URL(u.toString())
            // to may include protocol; if not, keep original protocol
            if (/^https?:\/\//i.test(to)) {
              u = new URL(`${to}${u.pathname}${u.search}`)
            } else {
              toUrl.host = to
              u = toUrl
            }
            break
          }
        }
      } else if (u.hostname === "minio" && rewrite) {
        // Back-compat: MINIO_PUBLIC_HOST=localhost:9000
        const toUrl = new URL(u.toString())
        toUrl.host = rewrite
        u = toUrl
      }
    }

    const res = await fetch(u.toString(), { headers: { Accept: "image/svg+xml,application/xml" } })
    if (!res.ok) return NextResponse.json({ error: "Upstream error", status: res.status }, { status: 502 })
    const text = await res.text()
    return new Response(text, {
      status: 200,
      headers: { "Content-Type": "image/svg+xml; charset=utf-8", "Cache-Control": "public, max-age=60" },
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Proxy failed" }, { status: 500 })
  }
}
