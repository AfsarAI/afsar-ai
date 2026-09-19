import { describe, it, expect } from 'vitest';
import { validateToolCall } from '@/lib/agent/tool-validator';

describe('Agent Tool Validator', () => {
  it('accepts valid openSection call', () => {
    const res = validateToolCall('openSection', { section: 'projects' });
    expect(res.valid).toBe(true);
    expect(res.call?.name).toBe('openSection');
  });

  it('rejects invalid openSection argument', () => {
    const res = validateToolCall('openSection', { section: 'arbitrary-hack' });
    expect(res.valid).toBe(false);
    expect(res.error).toBeDefined();
  });

  it('accepts valid openProject call', () => {
    const res = validateToolCall('openProject', { projectId: 'redactvision-agent' });
    expect(res.valid).toBe(true);
    expect(res.call?.name).toBe('openProject');
  });

  it('rejects unauthorized project id', () => {
    const res = validateToolCall('openProject', { projectId: 'fake-unverified-project' });
    expect(res.valid).toBe(false);
  });

  it('accepts openResume call without arguments', () => {
    const res = validateToolCall('openResume', {});
    expect(res.valid).toBe(true);
  });

  it('rejects unknown tool name', () => {
    const res = validateToolCall('executeBashCommand', { cmd: 'ls -la' });
    expect(res.valid).toBe(false);
  });
});
