import { z } from 'zod';

export const OpenSectionSchema = z.object({
  section: z.enum(['about', 'projects', 'experience', 'education', 'skills', 'achievements', 'contact']),
});

export const OpenProjectSchema = z.object({
  projectId: z.enum(['redactvision-agent', 'stroke2d', 'civic-services-platform', 'quizmaster']),
});

export const OpenResumeSchema = z.object({}).optional();

export const OpenExternalLinkSchema = z.object({
  platform: z.enum(['github', 'linkedin', 'leetcode', 'email']),
});

export type ValidatedToolCall =
  | { name: 'openSection'; arguments: z.infer<typeof OpenSectionSchema> }
  | { name: 'openProject'; arguments: z.infer<typeof OpenProjectSchema> }
  | { name: 'openResume'; arguments: Record<string, never> }
  | { name: 'openExternalLink'; arguments: z.infer<typeof OpenExternalLinkSchema> };

export function validateToolCall(name: string, rawArgs: unknown): { valid: boolean; call?: ValidatedToolCall; error?: string } {
  try {
    const argsObj = typeof rawArgs === 'string' ? JSON.parse(rawArgs) : (rawArgs || {});

    switch (name) {
      case 'openSection': {
        const validated = OpenSectionSchema.parse(argsObj);
        return { valid: true, call: { name: 'openSection', arguments: validated } };
      }
      case 'openProject': {
        const validated = OpenProjectSchema.parse(argsObj);
        return { valid: true, call: { name: 'openProject', arguments: validated } };
      }
      case 'openResume': {
        return { valid: true, call: { name: 'openResume', arguments: {} } };
      }
      case 'openExternalLink': {
        const validated = OpenExternalLinkSchema.parse(argsObj);
        return { valid: true, call: { name: 'openExternalLink', arguments: validated } };
      }
      default:
        return { valid: false, error: `Unauthorized or unrecognized tool: ${name}` };
    }
  } catch (err) {
    return { valid: false, error: `Invalid arguments for tool ${name}: ${err instanceof Error ? err.message : String(err)}` };
  }
}
