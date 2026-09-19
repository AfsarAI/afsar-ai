export interface KnowledgeChunk {
  id: string;          // e.g. "redactvision-agent#overview"
  docId: string;       // e.g. "redactvision-agent"
  title: string;       // e.g. "RedactVision Agent"
  section: string;     // e.g. "Overview"
  category: string;    // e.g. "project" | "profile" | "links" | "resume"
  content: string;     // Raw text of the section
  tags: string[];
  sourceUrl: string;   // e.g. "#projects?id=redactvision-agent"
  tokens: string[];    // Tokenized terms for BM25
  embedding?: number[];// Vector representation
}

export interface KnowledgeIndex {
  version: string;
  builtAt: string;
  chunks: KnowledgeChunk[];
}

export interface SearchResult {
  chunk: KnowledgeChunk;
  score: number;
  matchType: 'bm25' | 'vector' | 'hybrid';
}
