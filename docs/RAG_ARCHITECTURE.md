# Retrieval-Augmented Generation (RAG) Architecture

## 1. RAG Strategy: Lightweight Hybrid Search

For a personal portfolio, high reliability, zero recurring infrastructure costs, and instant retrieval (< 5ms) are far more critical than scaling to millions of enterprise vectors.

We implement an **In-Memory Hybrid Search Engine** combining:
1. **BM25 Lexical Keyword Search**: Exceptional at matching exact entity names, acronyms, and technical terms (e.g. "SGBC", "Stroke2D", "ISRO", "SIH 26171", "FastAPI", "OpenAtlas", "CGPA").
2. **Dense Vector Cosine Similarity**: Captures semantic synonyms and conceptual queries (e.g. "What did he build for brain imaging?" -> maps to `stroke2d.md`).
3. **Reciprocal Rank Fusion (RRF)**: Merges the scores of both rankers to produce a robust, balanced top-k chunk ranking.

---

## 2. Ingestion & Indexing Pipeline (`scripts/index-knowledge.ts`)

```
Canonical Markdown Files (content/**/*.md)
             │
             ▼
      Document Loader
             │
             ▼
   Semantic Section Chunker
   (Splits by H1/H2/H3 headers, preserves metadata & anchor tags)
             │
             ▼
      Token Extractor
   (Normalizes tokens, filters stop words for BM25)
             │
             ▼
   Vector Embedding Generator
   (Produces dense embeddings, fallback to lightweight local vector index)
             │
             ▼
    data/knowledge-index.json (Pre-computed build artifact)
```

---

## 3. Query Retrieval Pipeline (`src/lib/rag/hybrid-retriever.ts`)

At query time:
1. **Query Normalization**: Strips punctuation, normalizes case, extracts query keywords.
2. **BM25 Scoring**: Scores each chunk based on term frequency and inverse document frequency.
3. **Vector Similarity**: Computes cosine similarity between query vector and chunk vectors.
4. **Fusion**: Combines scores:
   $$\text{Score} = w_{\text{bm25}} \cdot \text{Score}_{\text{bm25}} + w_{\text{vector}} \cdot \text{Score}_{\text{vector}}$$
5. **Top-K Selection**: Selects top 3 to 5 chunks (typically ~800–1200 tokens total), ensuring concise context injection without blowing up prompt latency.
6. **Citation Construction**: Compiles clean, human-readable source anchors for the client UI.
