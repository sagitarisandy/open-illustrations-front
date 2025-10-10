export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const upstreamBase = process.env.API_ILLUSTRATIONS || process.env.API_ILLUSTRATIONS_URL || "http://localhost:8080"
  const normalized = upstreamBase.startsWith("http") ? upstreamBase : `http://${upstreamBase}`
  const target = `${normalized.replace(/\/$/, "")}/api/v1/illustrations/${params.id}/public`
  try {
    const res = await fetch(target, { next: { revalidate: 60 } })
    if (!res.ok) {
      return new Response(`Upstream error: ${res.status}`, { status: 502 })
    }
    const svg = await res.text()
    return new Response(svg, {
      status: 200,
      headers: { "Content-Type": "image/svg+xml; charset=utf-8", "Cache-Control": "public, max-age=60" },
    })
  } catch (e: any) {
    return new Response(e?.message || "Proxy failed", { status: 500 })
  }
}
