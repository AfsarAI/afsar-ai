# Data Model Specification

## 1. Canonical Entities

All portfolio content is structured using Markdown with YAML Frontmatter, validated against Zod schemas.

### 1.1 Profile Model (`content/profile/*.md`)
```typescript
interface ProfileEntity {
  id: "about" | "education" | "experience" | "skills" | "achievements" | "contact";
  title: string;
  section: string;
  category: "profile";
  tags: string[];
  updatedAt: string; // ISO 8601 YYYY-MM-DD
  content: string;   // Full markdown body
}
```

### 1.2 Project Model (`content/projects/*.md`)
```typescript
interface ProjectEntity {
  id: string;        // e.g. "redactvision-agent", "stroke2d"
  title: string;
  subtitle?: string;
  category: "project";
  tags: string[];
  featured: boolean;
  github?: string;
  demo?: string;
  video?: string;
  startDate?: string;
  endDate?: string;
  role?: string;
  updatedAt: string;
  content: string;   // Problem, solution, architecture markdown
}
```

### 1.3 Knowledge Chunk Model (`data/knowledge-index.json`)
```typescript
interface KnowledgeChunk {
  id: string;          // e.g. "redactvision-agent#architecture"
  docId: string;       // Document slug
  title: string;       // Display title
  section: string;     // Heading name
  category: string;    // "profile" | "project" | "links" | "resume"
  content: string;     // Text chunk
  tags: string[];
  sourceUrl: string;   // Navigation anchor
  tokens: string[];    // Normalized tokens for BM25
  embedding?: number[];// Float array vector
}
```
