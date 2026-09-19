import { z } from 'zod';

export const ContentCategorySchema = z.enum(['profile', 'project', 'links', 'resume']);

export const BaseFrontmatterSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  category: ContentCategorySchema,
  section: z.string().optional(),
  tags: z.array(z.string()).default([]),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be YYYY-MM-DD'),
});

export const ProjectFrontmatterSchema = BaseFrontmatterSchema.extend({
  category: z.literal('project'),
  subtitle: z.string().optional(),
  featured: z.boolean().default(false),
  github: z.string().optional(),
  demo: z.string().optional(),
  video: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  role: z.string().optional(),
});

export type ContentCategory = z.infer<typeof ContentCategorySchema>;
export type BaseFrontmatter = z.infer<typeof BaseFrontmatterSchema>;
export type ProjectFrontmatter = z.infer<typeof ProjectFrontmatterSchema>;

export interface ContentItem<T = BaseFrontmatter> {
  metadata: T;
  content: string;
  slug: string;
  filePath: string;
}

export type ProjectItem = ContentItem<ProjectFrontmatter>;
