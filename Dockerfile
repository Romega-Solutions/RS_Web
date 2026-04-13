# ==============================================================================
# STAGE 1: Dependencies
# ==============================================================================
FROM node:20-alpine AS deps

# Security: Add security updates and required packages
RUN apk add --no-cache libc6-compat && \
    apk upgrade

WORKDIR /app

# Copy package files for dependency installation
COPY romega-next/package*.json ./

# Install ALL dependencies (needed for build stage)
RUN npm ci --ignore-scripts && \
    npm cache clean --force

# ==============================================================================
# STAGE 2: Builder
# ==============================================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy application source
COPY romega-next/ .

# Build Next.js application with optimizations
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# ==============================================================================
# STAGE 3: Runner (Production)
# ==============================================================================
FROM node:20-alpine AS runner

# Security: Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

WORKDIR /app

# Security: Install only runtime dependencies and security updates
RUN apk add --no-cache \
    curl \
    ca-certificates && \
    apk upgrade && \
    rm -rf /var/cache/apk/* /tmp/* /var/tmp/*

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy necessary files from builder
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Security labels
LABEL maintainer="Romega Solutions" \
      version="2.0" \
      description="Secure Romega Solutions Next.js website" \
      security.hardened="true" \
      org.opencontainers.image.source="https://github.com/romega-solutions/website"

# Expose port 3000
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || curl -f http://localhost:3000/ || exit 1

# Security: Run as non-root user
USER nextjs

# Start Next.js server
CMD ["node", "server.js"]