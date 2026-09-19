import { describe, it, expect } from 'vitest';
import { tokenizeText, chunkMarkdownDocument } from '@/lib/rag/chunker';
import { ContentItem } from '@/lib/content/schema';

describe('RAG Chunker & Tokenizer', () => {
  it('tokenizes text and removes stop words', () => {
    const text = 'Mohd Afsar is a software and AI engineer at IIT Madras';
    const tokens = tokenizeText(text);

    expect(tokens).toContain('mohd');
    expect(tokens).toContain('afsar');
    expect(tokens).toContain('software');
    expect(tokens).toContain('ai');
    expect(tokens).toContain('engineer');
    expect(tokens).toContain('iit');
    expect(tokens).toContain('madras');
    expect(tokens).not.toContain('is');
    expect(tokens).not.toContain('a');
    expect(tokens).not.toContain('and');
    expect(tokens).not.toContain('at');
  });

  it('chunks markdown document by section headers', () => {
    const mockItem: ContentItem = {
      metadata: {
        id: 'test-doc',
        title: 'Test Document',
        category: 'project',
        tags: ['test', 'unit'],
        updatedAt: '2026-09-19',
      },
      content: `## Overview
This is the overview section with sufficient text length.

## Architecture
This is the architecture section explaining system components.`,
      slug: 'test-doc',
      filePath: 'projects/test-doc.md',
    };

    const chunks = chunkMarkdownDocument(mockItem);
    expect(chunks.length).toBe(2);
    expect(chunks[0].section).toBe('Overview');
    expect(chunks[1].section).toBe('Architecture');
    expect(chunks[0].docId).toBe('test-doc');
    expect(chunks[0].tokens.length).toBeGreaterThan(0);
  });
});
