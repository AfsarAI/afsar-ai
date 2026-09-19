import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {
  BaseFrontmatterSchema,
  ProjectFrontmatterSchema,
  ContentItem,
  ProjectItem,
  BaseFrontmatter,
} from './schema';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.md')) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

export function loadContentItem(filePath: string): ContentItem {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const relativePath = path.relative(CONTENT_DIR, filePath);
  const slug = path.basename(filePath, '.md');

  const validated = BaseFrontmatterSchema.parse(data);

  return {
    metadata: validated,
    content: content.trim(),
    slug,
    filePath: relativePath,
  };
}

export function loadAllContent(): ContentItem[] {
  const files = getAllFiles(CONTENT_DIR);
  return files.map((file) => loadContentItem(file));
}

export function loadProjects(): ProjectItem[] {
  const projectsDir = path.join(CONTENT_DIR, 'projects');
  const files = getAllFiles(projectsDir);

  return files.map((file) => {
    const fileContents = fs.readFileSync(file, 'utf8');
    const { data, content } = matter(fileContents);
    const relativePath = path.relative(CONTENT_DIR, file);
    const slug = path.basename(file, '.md');

    const validated = ProjectFrontmatterSchema.parse(data);

    return {
      metadata: validated,
      content: content.trim(),
      slug,
      filePath: relativePath,
    };
  });
}

export function loadProfileSection(id: string): ContentItem | null {
  const filePath = path.join(CONTENT_DIR, 'profile', `${id}.md`);
  if (!fs.existsSync(filePath)) return null;
  return loadContentItem(filePath);
}
