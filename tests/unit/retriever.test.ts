import { describe, it, expect } from 'vitest';
import { HybridRetriever } from '@/lib/rag/hybrid-retriever';

describe('HybridRetriever', () => {
  const retriever = new HybridRetriever();

  it('initializes and indexes canonical chunks', () => {
    const chunks = retriever.getChunks();
    expect(chunks.length).toBeGreaterThan(10);
  });

  it('retrieves RedactVision Agent for browser agent queries', () => {
    const results = retriever.search('browser agent ISRO privacy redactvision', 3);
    expect(results.length).toBeGreaterThan(0);
    const topDocIds = results.map((r) => r.chunk.docId);
    expect(topDocIds).toContain('redactvision-agent');
  });

  it('retrieves Stroke2D for brain histology and neuroimaging queries', () => {
    const results = retriever.search('brain centre stroke2d histology mri', 3);
    expect(results.length).toBeGreaterThan(0);
    const topDocIds = results.map((r) => r.chunk.docId);
    expect(topDocIds).toContain('stroke2d');
  });

  it('retrieves education details for IIT Madras queries', () => {
    const results = retriever.search('IIT Madras degree CGPA coursework', 3);
    expect(results.length).toBeGreaterThan(0);
    const topDocIds = results.map((r) => r.chunk.docId);
    expect(topDocIds.some((id) => id === 'education' || id === 'resume')).toBe(true);
  });
});
