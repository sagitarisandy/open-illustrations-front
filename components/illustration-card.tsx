import { Card, CardContent } from "@/components/ui/card"

export function IllustrationCard({
  title,
  accent = "var(--accent)",
}: {
  title: string
  accent?: string
}) {
  return (
    <Card className="group overflow-hidden rounded-2xl border bg-card transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        <div className="mb-3 aspect-[4/3] w-full rounded-xl border bg-muted/40">
          <svg viewBox="0 0 400 300" className="h-full w-full rounded-xl" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#ffffff" />
            <circle cx="90" cy="160" r="40" fill={accent} opacity="0.15" />
            <rect x="160" y="80" width="160" height="120" rx="16" fill={accent} opacity="0.15" />
            <path d="M40 250 L360 250" stroke="var(--border)" strokeWidth="2" />
          </svg>
        </div>
        <p className="text-center text-sm font-medium text-foreground">{title}</p>
      </CardContent>
    </Card>
  )
}
