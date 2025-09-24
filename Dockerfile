# BLKOUT Liberation Platform Backend - Production Dockerfile
# 🏁 Creator Sovereignty 75% Enforcement
# 🗳️ Democratic Governance Implementation
# 🛡️ Community Protection Maximum Security

FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install system dependencies for liberation platform
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    git \
    curl

# Copy package files for dependency installation\nCOPY package*.json ./\n\n# Install dependencies with liberation focus\nRUN npm ci --only=production && \\\n    npm cache clean --force

# Copy source code
COPY . .

# Build TypeScript if needed
RUN npm run build 2>/dev/null || echo "No build script found"

# Production stage
FROM node:18-alpine AS production

# Set liberation platform environment
ENV NODE_ENV=production \
    LIBERATION_VALUES_ENFORCEMENT=true \
    CREATOR_SOVEREIGNTY_MINIMUM=0.75 \
    DEMOCRATIC_GOVERNANCE_ENABLED=true \
    COMMUNITY_PROTECTION_LEVEL=maximum \
    MATHEMATICAL_ENFORCEMENT=true

# Create liberation platform user for security
RUN addgroup -g 1001 -S blkout && \
    adduser -S blkout -u 1001

# Set working directory
WORKDIR /app

# Install production system dependencies
RUN apk add --no-cache \
    curl \
    dumb-init

# Copy built application from builder stage
COPY --from=builder --chown=blkout:blkout /app/node_modules ./node_modules
COPY --from=builder --chown=blkout:blkout /app/package*.json ./
COPY --from=builder --chown=blkout:blkout /app/*.js ./
COPY --from=builder --chown=blkout:blkout /app/layer-* ./
COPY --from=builder --chown=blkout:blkout /app/tests ./tests

# Create directories for liberation platform operations
RUN mkdir -p /app/logs /app/tmp /app/uploads && \
    chown -R blkout:blkout /app

# Create health check script
RUN echo '#!/bin/sh\n\
curl -f http://localhost:${PORT:-8080}/health || exit 1\n\
curl -f http://localhost:${PORT:-8080}/health/liberation-values || exit 1' > /app/healthcheck.sh && \
    chmod +x /app/healthcheck.sh

# Switch to liberation platform user
USER blkout

# Expose port
EXPOSE 8080

# Health check with liberation values validation
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD /app/healthcheck.sh

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the liberation platform backend
CMD ["node", "phase3-deployment-orchestrator.js"]

# Add liberation platform labels
LABEL \
    com.blkout.service="liberation-backend" \
    com.blkout.version="3.0.0-revolutionary" \
    com.blkout.liberation-values="creator-sovereignty-75-percent" \
    com.blkout.democratic-governance="one-member-one-vote" \
    com.blkout.community-protection="trauma-informed-maximum" \
    com.blkout.mathematical-enforcement="enabled" \
    com.blkout.build-date="$(date -u +'%Y-%m-%dT%H:%M:%SZ')" \
    maintainer="BLKOUT Liberation Platform Team"