/**
 * Next.js Instrumentation Hook
 * Runs in Node.js runtime and can collect metrics for all requests
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('[Instrumentation] Metrics collection initialized');
    
    // Initialize global metrics store
    const globalForMetrics = global as typeof global & {
      __metricsStore?: {
        requestCount: number;
        requestDurations: number[];
      };
    };

    if (!globalForMetrics.__metricsStore) {
      globalForMetrics.__metricsStore = {
        requestCount: 0,
        requestDurations: [],
      };
      console.log('[Instrumentation] Metrics store created');
    }
  }
}
