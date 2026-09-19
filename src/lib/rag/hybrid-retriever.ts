import fs from 'fs';
import path from 'path';
import { KnowledgeChunk, KnowledgeIndex, SearchResult } from './types';
import { tokenizeText, chunkMarkdownDocument } from './chunker';
import { loadAllContent } from '../content/loader';

export class HybridRetriever {
  private chunks: KnowledgeChunk[] = [];
  private avgDocLength = 0;
  private idfMap = new Map<string, number>();

  constructor() {
    this.init();
  }

  private init() {
    const indexPath = path.join(process.cwd(), 'data', 'knowledge-index.json');
    if (fs.existsSync(indexPath)) {
      try {
        const raw = fs.readFileSync(indexPath, 'utf8');
        const parsed: KnowledgeIndex = JSON.parse(raw);
        this.chunks = parsed.chunks;
      } catch (err) {
        console.warn('Failed to load pre-computed index, building in-memory:', err);
        this.buildInMemoryIndex();
      }
    } else {
      this.buildInMemoryIndex();
    }

    this.calculateBM25Stats();
  }

  private buildInMemoryIndex() {
    try {
      const allContent = loadAllContent();
      this.chunks = allContent.flatMap((item) => chunkMarkdownDocument(item));
    } catch {
      this.chunks = [];
    }
  }

  private calculateBM25Stats() {
    if (this.chunks.length === 0) return;

    const totalTokens = this.chunks.reduce((acc, c) => acc + c.tokens.length, 0);
    this.avgDocLength = totalTokens / this.chunks.length;

    const docCount = this.chunks.length;
    const docFreq = new Map<string, number>();

    for (const chunk of this.chunks) {
      const uniqueTokens = new Set(chunk.tokens);
      for (const t of uniqueTokens) {
        docFreq.set(t, (docFreq.get(t) || 0) + 1);
      }
    }

    for (const [token, df] of docFreq.entries()) {
      const idf = Math.log(1 + (docCount - df + 0.5) / (df + 0.5));
      this.idfMap.set(token, Math.max(0.1, idf));
    }
  }

  public search(query: string, topK: number = 4): SearchResult[] {
    if (!query || this.chunks.length === 0) return [];

    const queryTokens = tokenizeText(query);
    if (queryTokens.length === 0) return [];

    const k1 = 1.2;
    const b = 0.75;
    const results: SearchResult[] = [];

    for (const chunk of this.chunks) {
      let bm25Score = 0;
      const docLen = chunk.tokens.length;
      const tfMap = new Map<string, number>();

      for (const t of chunk.tokens) {
        tfMap.set(t, (tfMap.get(t) || 0) + 1);
      }

      for (const q of queryTokens) {
        const tf = tfMap.get(q) || 0;
        if (tf > 0) {
          const idf = this.idfMap.get(q) || 0.5;
          const numerator = tf * (k1 + 1);
          const denominator = tf + k1 * (1 - b + b * (docLen / (this.avgDocLength || 1)));
          bm25Score += idf * (numerator / denominator);
        }
      }

      // Title and Tag Boosts for high precision
      const queryLower = query.toLowerCase();
      if (chunk.title.toLowerCase().includes(queryLower)) {
        bm25Score += 3.0;
      }
      if (chunk.tags.some((tag) => queryLower.includes(tag.toLowerCase()))) {
        bm25Score += 2.0;
      }
      if (queryLower.includes(chunk.docId.toLowerCase())) {
        bm25Score += 4.0;
      }

      if (bm25Score > 0.1) {
        results.push({
          chunk,
          score: bm25Score,
          matchType: 'hybrid',
        });
      }
    }

    results.sort((a, b) => b.score - a.score);
    return results.slice(0, topK);
  }

  public getChunks(): KnowledgeChunk[] {
    return this.chunks;
  }
}

let cachedRetriever: HybridRetriever | null = null;
export function getRetriever(): HybridRetriever {
  if (!cachedRetriever) {
    cachedRetriever = new HybridRetriever();
  }
  return cachedRetriever;
}
