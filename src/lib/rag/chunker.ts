import { ContentItem } from '../content/schema';
import { KnowledgeChunk } from './types';

const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any',
  'are', 'aren', 'arent', 'as', 'at', 'be', 'because', 'been', 'before', 'being',
  'below', 'between', 'both', 'but', 'by', 'can', 'cannot', 'could', 'did', 'do',
  'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had',
  'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him', 'himself',
  'his', 'how', 'i', 'if', 'in', 'into', 'is', 'isn', 'isnt', 'it', 'its', 'itself',
  'me', 'more', 'most', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once',
  'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own',
  'same', 'she', 'should', 'so', 'some', 'such', 'than', 'that', 'the', 'their',
  'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they', 'this', 'those',
  'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what',
  'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'with', 'won', 'would',
  'you', 'your', 'yours', 'yourself', 'yourselves'
]);

export function tokenizeText(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function determineSourceUrl(item: ContentItem, sectionName: string): string {
  const cat = item.metadata.category;
  const id = item.metadata.id;

  if (cat === 'project') {
    return `#projects?id=${id}`;
  }
  if (cat === 'profile') {
    return `#${id}`;
  }
  if (cat === 'links') {
    return `#contact`;
  }
  if (cat === 'resume') {
    return `#resume`;
  }
  return `#${id}`;
}

export function chunkMarkdownDocument(item: ContentItem): KnowledgeChunk[] {
  const lines = item.content.split('\n');
  const chunks: KnowledgeChunk[] = [];

  let currentSectionTitle = item.metadata.title;
  let currentSectionContent: string[] = [];
  let chunkIndex = 0;

  function pushCurrentChunk() {
    const rawContent = currentSectionContent.join('\n').trim();
    if (rawContent.length > 15) {
      const sectionSlug = currentSectionTitle
        .toLowerCase()
        .replace(/[^\w]+/g, '-')
        .replace(/^-|-$/g, '');

      const chunkId = `${item.metadata.id}#${sectionSlug || chunkIndex}`;
      const contextPrefix = `[Document: ${item.metadata.title} | Section: ${currentSectionTitle} | Category: ${item.metadata.category}]\n`;
      const fullText = contextPrefix + rawContent;

      chunks.push({
        id: chunkId,
        docId: item.metadata.id,
        title: item.metadata.title,
        section: currentSectionTitle,
        category: item.metadata.category,
        content: fullText,
        tags: item.metadata.tags || [],
        sourceUrl: determineSourceUrl(item, currentSectionTitle),
        tokens: tokenizeText(`${item.metadata.title} ${currentSectionTitle} ${rawContent} ${(item.metadata.tags || []).join(' ')}`),
      });
      chunkIndex++;
    }
    currentSectionContent = [];
  }

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headerMatch) {
      pushCurrentChunk();
      currentSectionTitle = headerMatch[2].trim();
    } else {
      currentSectionContent.push(line);
    }
  }

  pushCurrentChunk();

  return chunks;
}
