# Open Illustrations

Small Next.js project to explore and display illustration “packs” with a modern component system (Radix UI + Tailwind + shadcn‑style patterns) and light/dark theme support.

## ✨ Features
- Next.js 15 (App Router) + TypeScript
- Ready‑made UI primitives (accordion, dialog, tooltip, etc.)
- Dark / Light theming via `next-themes`
- Forms + validation: `react-hook-form` + `zod`
- Carousel (Embla) & charts (Recharts)
- Toasts & sheet drawers (sonner + vaul)

## 🛠️ Tech Stack
React 18, Next.js, Tailwind CSS 4, Radix UI primitives, Lucide Icons.

## 🚀 Quick Start
```bash
git clone <repo-url> open-illustrations
cd open-illustrations
pnpm install   # or: npm install --legacy-peer-deps
pnpm dev
```

## 📂 Structure
```
app/        Routes & pages (App Router)
components/ UI & layout components
hooks/      Custom hooks
lib/        Helpers & data utilities
public/     Static assets
styles/     Global styles
```

## 📜 Scripts
```bash
pnpm dev      # Start dev server
pnpm build    # Production build
pnpm start    # Run built app
pnpm lint     # Lint code
```

## ⚠️ React Version Note
`vaul@^0.9.9` declares peer React ^16.8 || ^17 || ^18. This project uses React 18 (compatible). If you upgrade to React 19, first check if a newer `vaul` supports it or install with `--legacy-peer-deps`.

## 📄 License
MIT – see `LICENSE`.

---
Contributions & ideas welcome. Have fun! 🧩

## 🐳 Docker

Build and run the app in Docker:

```bash
docker build -t open-illustrations .
docker run --rm -p 3000:3000 \
	-e API_ILLUSTRATIONS=http://host.docker.internal:8080 \
	open-illustrations
```

Or with docker-compose (reads `.env` automatically):

```bash
docker compose up --build
```

Open http://localhost:3000
