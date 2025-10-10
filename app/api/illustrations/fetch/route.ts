import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")
  if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 })
  try {
    const u = new URL(url)
    const allowed = (process.env.ALLOWED_IMAGE_HOSTS || "127.0.0.1:9000,localhost:9000").split(",").map((s) => s.trim())
    if (!allowed.includes(u.host)) {
      return NextResponse.json({ error: "Host not allowed", host: u.host }, { status: 400 })
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
