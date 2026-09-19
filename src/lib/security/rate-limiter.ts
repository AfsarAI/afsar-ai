interface RateLimitRecord {
  timestamps: number[];
}

export class RateLimiter {
  private store = new Map<string, RateLimitRecord>();
  private windowMs: number;
  private maxRequests: number;

  constructor(maxRequests: number = 20, windowMs: number = 60 * 1000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;

    // Periodic cleanup of stale IPs every 5 minutes
    if (typeof setInterval !== 'undefined') {
      setInterval(() => this.cleanup(), 5 * 60 * 1000);
    }
  }

  public isAllowed(clientIp: string): { allowed: boolean; remaining: number; resetMs: number } {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    let record = this.store.get(clientIp);
    if (!record) {
      record = { timestamps: [] };
      this.store.set(clientIp, record);
    }

    // Filter out timestamps outside the sliding window
    record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

    if (record.timestamps.length >= this.maxRequests) {
      const oldest = record.timestamps[0];
      const resetMs = oldest + this.windowMs - now;
      return { allowed: false, remaining: 0, resetMs: Math.max(0, resetMs) };
    }

    record.timestamps.push(now);
    return {
      allowed: true,
      remaining: this.maxRequests - record.timestamps.length,
      resetMs: this.windowMs,
    };
  }

  private cleanup() {
    const windowStart = Date.now() - this.windowMs;
    for (const [ip, record] of this.store.entries()) {
      record.timestamps = record.timestamps.filter((ts) => ts > windowStart);
      if (record.timestamps.length === 0) {
        this.store.delete(ip);
      }
    }
  }

  // Helper for test resets
  public reset() {
    this.store.clear();
  }
}

let globalRateLimiter: RateLimiter | null = null;
export function getRateLimiter(): RateLimiter {
  if (!globalRateLimiter) {
    globalRateLimiter = new RateLimiter(20, 60 * 1000);
  }
  return globalRateLimiter;
}
