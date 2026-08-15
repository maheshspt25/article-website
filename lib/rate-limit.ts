import { NextRequest, NextResponse } from 'next/server';

interface RateLimitStore {
  count: number;
  resetTime: number;
}

const ipMap = new Map<string, RateLimitStore>();

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, store] of ipMap.entries()) {
    if (now > store.resetTime) {
      ipMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

export function rateLimit(
  request: NextRequest,
  limit: number = 60,
  windowMs: number = 60 * 1000
): { success: boolean; limit: number; remaining: number; resetTime: number } {
  // Get IP address from headers
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1';

  const now = Date.now();
  const store = ipMap.get(ip);

  if (!store || now > store.resetTime) {
    const newStore: RateLimitStore = {
      count: 1,
      resetTime: now + windowMs
    };
    ipMap.set(ip, newStore);
    return { success: true, limit, remaining: limit - 1, resetTime: newStore.resetTime };
  }

  if (store.count >= limit) {
    return { success: false, limit, remaining: 0, resetTime: store.resetTime };
  }

  store.count += 1;
  return { success: true, limit, remaining: limit - store.count, resetTime: store.resetTime };
}
