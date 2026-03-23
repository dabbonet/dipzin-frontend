import * as Sentry from '@sentry/nextjs';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Node.js Sentry configuration
    Sentry.init({
      // Sentry DSN
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

      // Enable Spotlight only in local development (not in production builds)
      // Check both NODE_ENV and NEXT_PUBLIC_ENV to ensure spotlight is disabled in production
      spotlight: process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_ENV !== 'production',

      // Adjust this value in production, or use tracesSampler for greater control
      tracesSampleRate: 1,

      // Setting this option to true will print useful
      // information to the console while you're setting up Sentry.
      debug: false,
    });
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // Edge Sentry configuration
    Sentry.init({
      // Sentry DSN
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

      // Enable Spotlight only in local development (not in production builds)
      // Check both NODE_ENV and NEXT_PUBLIC_ENV to ensure spotlight is disabled in production
      spotlight: process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_ENV !== 'production',

      // Adjust this value in production, or use tracesSampler for greater control
      tracesSampleRate: 1,

      // Setting this option to true will print useful
      // information to the console while you're setting up Sentry.
      debug: false,
    });
  }
}
