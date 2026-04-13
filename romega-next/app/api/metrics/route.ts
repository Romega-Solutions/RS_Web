/**
 * Prometheus Metrics API Route
 * Exposes application metrics in Prometheus format
 * 
 * Metrics included:
 * - HTTP request count and duration
 * - Health check status
 * - Node.js process metrics
 * - Next.js specific metrics
 */

import { NextRequest, NextResponse } from 'next/server';
import { metricsStore } from '@/lib/metrics/store';

function toPrometheusFormat(): string {
  const { requestCount, requestDurations } = metricsStore.getMetrics();
  const lines: string[] = [];
  
  // HTTP requests total
  lines.push('# HELP http_requests_total Total number of HTTP requests');
  lines.push('# TYPE http_requests_total counter');
  lines.push(`http_requests_total ${requestCount}`);
  lines.push('');

  // HTTP request duration
  if (requestDurations && requestDurations.length > 0) {
    const sum = requestDurations.reduce((a, b) => a + b, 0);
    const sorted = [...requestDurations].sort((a, b) => a - b);
    const p50 = sorted[Math.floor(sorted.length * 0.5)] || 0;
    const p95 = sorted[Math.floor(sorted.length * 0.95)] || 0;
    const p99 = sorted[Math.floor(sorted.length * 0.99)] || 0;

    lines.push('# HELP http_request_duration_seconds HTTP request duration in seconds');
    lines.push('# TYPE http_request_duration_seconds summary');
    lines.push(`http_request_duration_seconds_sum ${sum.toFixed(6)}`);
    lines.push(`http_request_duration_seconds_count ${requestDurations.length}`);
    lines.push(`http_request_duration_seconds{quantile="0.5"} ${p50.toFixed(6)}`);
    lines.push(`http_request_duration_seconds{quantile="0.95"} ${p95.toFixed(6)}`);
    lines.push(`http_request_duration_seconds{quantile="0.99"} ${p99.toFixed(6)}`);
    lines.push('');
  }

  // Health check status (always healthy if this endpoint responds)
  lines.push('# HELP health_check_status Current health check status (1 = healthy, 0 = unhealthy)');
  lines.push('# TYPE health_check_status gauge');
  lines.push(`health_check_status 1`);
  lines.push('');

  // Node.js process metrics
  if (typeof process !== 'undefined' && process.memoryUsage) {
    const mem = process.memoryUsage();
    
    lines.push('# HELP nodejs_heap_size_bytes Node.js heap size in bytes');
    lines.push('# TYPE nodejs_heap_size_bytes gauge');
    lines.push(`nodejs_heap_size_bytes ${mem.heapUsed}`);
    lines.push('');

    lines.push('# HELP nodejs_external_memory_bytes Node.js external memory in bytes');
    lines.push('# TYPE nodejs_external_memory_bytes gauge');
    lines.push(`nodejs_external_memory_bytes ${mem.external}`);
    lines.push('');
  }

  // Uptime
  if (typeof process !== 'undefined' && process.uptime) {
    lines.push('# HELP nodejs_uptime_seconds Node.js process uptime in seconds');
    lines.push('# TYPE nodejs_uptime_seconds gauge');
    lines.push(`nodejs_uptime_seconds ${Math.floor(process.uptime())}`);
    lines.push('');
  }

  return lines.join('\n');
}

export async function GET(request: NextRequest) {
  // Simple authentication check
  const authHeader = request.headers.get('authorization');
  const token = process.env.METRICS_AUTH_TOKEN;

  // If auth token is set, require it
  if (token && authHeader !== `Bearer ${token}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // Return metrics in Prometheus format
  return new NextResponse(toPrometheusFormat(), {
    headers: {
      'Content-Type': 'text/plain; version=0.0.4',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
