/**
 * Shared Metrics Store
 * Singleton pattern to share metrics between middleware and API routes
 */

class MetricsStore {
  private static instance: MetricsStore;
  private requestCount: number = 0;
  private requestDurations: number[] = [];

  private constructor() {}

  public static getInstance(): MetricsStore {
    if (!MetricsStore.instance) {
      MetricsStore.instance = new MetricsStore();
    }
    return MetricsStore.instance;
  }

  public trackRequest(duration: number): void {
    this.requestCount++;
    this.requestDurations.push(duration);
    
    // Keep only last 1000 measurements
    if (this.requestDurations.length > 1000) {
      this.requestDurations.shift();
    }
  }

  public getMetrics() {
    return {
      requestCount: this.requestCount,
      requestDurations: [...this.requestDurations],
    };
  }

  public reset(): void {
    this.requestCount = 0;
    this.requestDurations = [];
  }
}

// Export singleton instance
export const metricsStore = MetricsStore.getInstance();
