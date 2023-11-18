# Base image with Node.js
FROM node:18-alpine AS base

# Install libc6-compat if needed
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Dependencies installation stage
FROM base AS deps

# Copy package.json and package-lock.json
COPY package.json package-lock.json* ./

# Install dependencies using npm ci for a cleaner, more reliable install
RUN npm i

# Builder stage to build the Next.js application
FROM base AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Copy the .env.production file and rename it to .env for production build
COPY .env.production ./.env

# # Build the application
# RUN yarn build
RUN npm run build

# Production stage for the final image
FROM base AS runner

WORKDIR /app
ENV NODE_ENV production

# Create a non-root user and set file permissions
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built assets from the builder stage
COPY --from=builder /app/public ./public
RUN mkdir .next && chown nextjs:nodejs .next

# Leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# Set runtime environment variables
ENV PORT 3000
ENV HOSTNAME "localhost"

# Start the application
CMD ["node", "server.js"]
