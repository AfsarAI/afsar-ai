import { NextRequest, NextResponse } from 'next/server';
import { getRetriever } from '@/lib/rag/hybrid-retriever';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');
  const limitParam = searchParams.get('limit');
  const limit = limitParam ? Math.min(10, Math.max(1, parseInt(limitParam, 10))) : 5;

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ results: [] });
  }

  const retriever = getRetriever();
  const searchResults = retriever.search(query.trim(), limit);

  const results = searchResults.map((r) => ({
    id: r.chunk.id,
    title: r.chunk.title,
    section: r.chunk.section,
    category: r.chunk.category,
    sourceUrl: r.chunk.sourceUrl,
    score: Math.round(r.score * 100) / 100,
    snippet: r.chunk.content.slice(0, 160).replace(/\[Document:[^\]]+\]\n?/, '') + '...',
  }));

  return NextResponse.json({ results });
}
