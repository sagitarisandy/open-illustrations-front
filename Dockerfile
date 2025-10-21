# syntax=docker/dockerfile:1

# -----------------
# Base deps stage
# -----------------
FROM node:20-alpine AS base
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable && apk add --no-cache libc6-compat
WORKDIR /app

# -----------------
# Install deps
# -----------------
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# -----------------
# Build
# -----------------
FROM base AS build
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Ensure Next can produce standalone output
RUN pnpm build

# -----------------
# Runtime
# -----------------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Copy only what we need to run
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/node_modules /app/node_modules

CMD ["node", "node_modules/.bin/next", "start", "-p", "3000"]
