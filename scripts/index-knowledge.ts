import fs from 'fs';
import path from 'path';
import { loadAllContent } from '../src/lib/content/loader';
import { chunkMarkdownDocument } from '../src/lib/rag/chunker';
import { KnowledgeIndex } from '../src/lib/rag/types';

function buildKnowledgeIndex() {
  console.log('📦 Building knowledge index from canonical content...');
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const allContent = loadAllContent();
  console.log(`  Loaded ${allContent.length} canonical documents.`);

  const allChunks = allContent.flatMap((item) => {
    const chunks = chunkMarkdownDocument(item);
    console.log(`  - ${item.metadata.title}: ${chunks.length} chunks generated.`);
    return chunks;
  });

  const index: KnowledgeIndex = {
    version: '1.0.0',
    builtAt: new Date().toISOString(),
    chunks: allChunks,
  };

  const outputPath = path.join(dataDir, 'knowledge-index.json');
  fs.writeFileSync(outputPath, JSON.stringify(index, null, 2), 'utf8');

  console.log(`\n✅ Successfully indexed ${allChunks.length} chunks into ${outputPath}`);
}

buildKnowledgeIndex();
