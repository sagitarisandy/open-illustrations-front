export type Pack = {
  slug: string
  title: string
  summary: string
  longDescription: string
  items: string[]
  count: number
  style: string
  fileTypes: string[]
  license: string
  keywords: string[]
}

export const packs: Pack[] = [
  {
    slug: "product-ops",
    title: "Product Ops Illustrations",
    summary: "50 clean illustration elements for roadmaps, rituals, and PM workflows.",
    longDescription:
      "A focused set crafted for product operations: planning, standups, scorecards, PM interviews, discovery, delivery, and more. Designed to be minimal, brandable, and readable at small sizes with Arya Blue accents.",
    items: [
      "Roadmap Review",
      "Sprint Planning",
      "Backlog Grooming",
      "Quarterly OKRs",
      "User Interviews",
      "Release Notes",
      "Feature Flags",
      "A/B Testing",
      "Incident Postmortem",
      "Product Metrics",
      "Adoption Funnel",
      "Usage Analytics",
      "Stakeholder Update",
      "Cross-team Sync",
      "Changelog",
      "Design System",
      "Ticket Triage",
      "Retrospective",
      "Discovery Notes",
      "Delivery Flow",
    ],
    count: 50,
    style: "Minimal, outlined, geometric shapes",
    fileTypes: ["SVG", "PNG", "Figma"],
    license: "Commercial and personal",
    keywords: ["product", "ops", "pm", "roadmap", "delivery", "discovery"],
  },
  {
    slug: "fintech-scenes",
    title: "Fintech Scenes",
    summary: "Modern finance scenes: payments, wallets, KYC, risk, and analytics.",
    longDescription:
      "Designed for fintech apps and dashboards. Scenes cover onboarding, KYC, card issuance, transfers, invoicing, subscriptions, and risk monitoring. Optimized for UI previews and marketing pages.",
    items: [
      "Send Money",
      "KYC Review",
      "Card Issuance",
      "Fraud Alerts",
      "Payouts",
      "Ledger",
      "Subscriptions",
      "Invoices",
      "Chargeback",
      "Analytics",
      "Exchange Rates",
      "Cash Flow",
      "Tax Summary",
      "PCI Compliance",
      "Mobile Wallet",
      "Bank Linking",
      "Virtual Card",
      "Checkout",
      "Deposit",
      "Withdrawal",
    ],
    count: 60,
    style: "Outlined people/objects, subtle fills",
    fileTypes: ["SVG", "PNG", "React SVG"],
    license: "Commercial and personal",
    keywords: ["fintech", "payments", "banking", "risk"],
  },
  {
    slug: "dev-tools",
    title: "Developer Tools",
    summary: "Build/ship/monitor visuals for developer-first products.",
    longDescription:
      "Scenes for repos, CI, deployments, observability, and incident response. Use them in docs, dashboards, CLI-themed pages, and status comms.",
    items: [
      "Code Review",
      "CI Passing",
      "Preview Deployment",
      "Observability",
      "Logging",
      "Rollbacks",
      "Feature Flag",
      "Workflow Graph",
      "API Keys",
      "Rate Limits",
      "Access Control",
      "Latency Graph",
      "Uptime",
      "Error Tracking",
      "SDK Install",
      "CLI Output",
      "Package Publish",
      "Branch Strategy",
      "Monorepo",
      "Test Coverage",
    ],
    count: 48,
    style: "Clean lines, monochrome + accent",
    fileTypes: ["SVG", "PNG"],
    license: "Commercial and personal",
    keywords: ["developer", "ci", "deploy", "observability", "status"],
  },
]

export function getPack(slug: string) {
  return packs.find((p) => p.slug === slug)
}
