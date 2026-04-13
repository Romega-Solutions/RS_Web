import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const PRIVATE_BLOB_URL = process.env.HERO_VIDEO_BLOB_URL;
const BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

function copyHeaderIfPresent(source: Headers, target: Headers, key: string): void {
  const value = source.get(key);
  if (value) {
    target.set(key, value);
  }
}

export async function GET(request: NextRequest) {
  if (!PRIVATE_BLOB_URL || !BLOB_READ_WRITE_TOKEN) {
    return new NextResponse('Hero video is not configured.', { status: 503 });
  }

  const upstreamHeaders = new Headers({
    Authorization: `Bearer ${BLOB_READ_WRITE_TOKEN}`,
  });

  const range = request.headers.get('range');
  if (range) {
    upstreamHeaders.set('Range', range);
  }

  const upstreamResponse = await fetch(PRIVATE_BLOB_URL, {
    headers: upstreamHeaders,
    cache: 'no-store',
  });

  if (!upstreamResponse.ok || !upstreamResponse.body) {
    return new NextResponse('Unable to load hero video.', {
      status: upstreamResponse.status || 502,
    });
  }

  const responseHeaders = new Headers();
  copyHeaderIfPresent(upstreamResponse.headers, responseHeaders, 'Content-Type');
  copyHeaderIfPresent(upstreamResponse.headers, responseHeaders, 'Content-Length');
  copyHeaderIfPresent(upstreamResponse.headers, responseHeaders, 'Content-Range');
  copyHeaderIfPresent(upstreamResponse.headers, responseHeaders, 'Accept-Ranges');
  copyHeaderIfPresent(upstreamResponse.headers, responseHeaders, 'ETag');
  copyHeaderIfPresent(upstreamResponse.headers, responseHeaders, 'Last-Modified');

  responseHeaders.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
  responseHeaders.set('X-Content-Type-Options', 'nosniff');

  return new NextResponse(upstreamResponse.body, {
    status: upstreamResponse.status,
    headers: responseHeaders,
  });
}
