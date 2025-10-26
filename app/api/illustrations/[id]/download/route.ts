import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params

  const upstreamBase =
    process.env.API_ILLUSTRATIONS ||
    process.env.API_ILLUSTRATIONS_URL ||
    "http://localhost:8080"
  
  const normalized = upstreamBase.startsWith("http") ? upstreamBase : `http://${upstreamBase}`
  const target = `${normalized.replace(/\/$/, "")}/api/v1/illustrations/${id}/download`

  try {
    const res = await fetch(target, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    })
    if (!res.ok) {
      return NextResponse.json({ error: "Upstream error", status: res.status }, { status: 502 })
    }
    const data = await res.json()
    // Expected: { download_url: "..."}
    return NextResponse.json(data)
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Proxy failed" }, { status: 500 })
  }
}