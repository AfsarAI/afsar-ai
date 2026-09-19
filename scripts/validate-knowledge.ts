import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BaseFrontmatterSchema, ProjectFrontmatterSchema } from '../src/lib/content/schema';

function validateKnowledgeBase() {
  console.log('🔍 Validating canonical portfolio knowledge base...');
  const contentDir = path.join(process.cwd(), 'content');

  if (!fs.existsSync(contentDir)) {
    console.error(`❌ Content directory not found: ${contentDir}`);
    process.exit(1);
  }

  const seenIds = new Set<string>();
  let totalFiles = 0;
  let hasErrors = false;

  function walk(dir: string) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        walk(fullPath);
      } else if (file.endsWith('.md')) {
        totalFiles++;
        const relPath = path.relative(contentDir, fullPath);
        const rawContent = fs.readFileSync(fullPath, 'utf8');

        try {
          const { data, content } = matter(rawContent);
          const isProject = relPath.startsWith('projects/');

          const schema = isProject ? ProjectFrontmatterSchema : BaseFrontmatterSchema;
          const validated = schema.parse(data);

          if (seenIds.has(validated.id)) {
            console.error(`❌ Duplicate ID found: "${validated.id}" in ${relPath}`);
            hasErrors = true;
          }
          seenIds.add(validated.id);

          if (!content.trim()) {
            console.warn(`⚠️ Warning: ${relPath} has an empty body.`);
          }

          console.log(`  ✓ Validated: ${relPath} (ID: ${validated.id})`);
        } catch (err) {
          console.error(`❌ Validation failed for ${relPath}:`, err);
          hasErrors = true;
        }
      }
    }
  }

  walk(contentDir);

  if (hasErrors) {
    console.error('\n❌ Knowledge base validation FAILED with errors.');
    process.exit(1);
  }

  console.log(`\n✅ Knowledge base validation SUCCEEDED (${totalFiles} documents verified).`);
}

validateKnowledgeBase();
