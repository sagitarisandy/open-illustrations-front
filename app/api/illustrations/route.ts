import { NextResponse } from "next/server"

// Proxy endpoint to upstream illustrations API using server-only env variables.
// Accepts optional query params and forwards them.
export async function GET(request: Request) {
  const { search } = new URL(request.url)
  const upstreamBase = process.env.API_ILLUSTRATIONS || process.env.API_ILLUSTRATIONS_URL || "http://localhost:8080"
  const normalized = upstreamBase.startsWith("http") ? upstreamBase : `http://${upstreamBase}`
  const target = `${normalized.replace(/\/$/, "")}/api/v1/illustrations${search}`
  try {
    const res = await fetch(target, {
      // Revalidate every 60s; adjust as needed
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
    })
    if (!res.ok) {
      return NextResponse.json(
        { error: "Upstream error", status: res.status, target },
        { status: 502 },
      )
    }
    const data = await res.json()
    return NextResponse.json(data, { status: 200 })
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Proxy failed", target },
      { status: 500 },
    )
  }
}
