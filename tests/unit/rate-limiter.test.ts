import { describe, it, expect } from 'vitest';
import { RateLimiter } from '@/lib/security/rate-limiter';

describe('Sliding-Window RateLimiter', () => {
  it('allows requests within threshold', () => {
    const limiter = new RateLimiter(3, 1000);
    const ip = '192.168.1.1';

    expect(limiter.isAllowed(ip).allowed).toBe(true);
    expect(limiter.isAllowed(ip).allowed).toBe(true);
    expect(limiter.isAllowed(ip).allowed).toBe(true);
  });

  it('blocks requests exceeding limit', () => {
    const limiter = new RateLimiter(2, 1000);
    const ip = '192.168.1.2';

    expect(limiter.isAllowed(ip).allowed).toBe(true);
    expect(limiter.isAllowed(ip).allowed).toBe(true);
    const thirdAttempt = limiter.isAllowed(ip);
    expect(thirdAttempt.allowed).toBe(false);
    expect(thirdAttempt.remaining).toBe(0);
  });

  it('tracks different IPs independently', () => {
    const limiter = new RateLimiter(1, 1000);
    expect(limiter.isAllowed('10.0.0.1').allowed).toBe(true);
    expect(limiter.isAllowed('10.0.0.1').allowed).toBe(false);

    expect(limiter.isAllowed('10.0.0.2').allowed).toBe(true);
  });
});
