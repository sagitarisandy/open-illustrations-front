import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(_request: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params
  const upstreamBase = process.env.API_ILLUSTRATIONS || process.env.API_ILLUSTRATIONS_URL || "http://localhost:8080"
  const normalized = upstreamBase.startsWith("http") ? upstreamBase : `http://${upstreamBase}`
  const target = `${normalized.replace(/\/$/, "")}/api/v1/illustrations/${id}/public`
  try {
    const res = await fetch(target, { next: { revalidate: 60 } })
    if (!res.ok) {
      return NextResponse.json({ error: "Upstream error", status: res.status }, { status: 502 })
    }
    const svg = await res.text()
    return new NextResponse(svg, {
      status: 200,
      headers: { "Content-Type": "image/svg+xml; charset=utf-8", "Cache-Control": "public, max-age=60" },
    })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Proxy failed" }, { status: 500 })
  }
}
