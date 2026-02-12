import { NextResponse } from 'next/server';

/**
 * Health Check Endpoint
 * Used by Docker health checks and monitoring systems
 */
export async function GET() {
  return NextResponse.json(
    { 
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'romega-solutions-website',
      uptime: process.uptime()
    },
    { status: 200 }
  );
}
