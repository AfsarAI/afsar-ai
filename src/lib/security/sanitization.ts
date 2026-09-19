export interface ValidationResult {
  valid: boolean;
  sanitizedMessage: string;
  error?: string;
}

export function validateAndSanitizeMessage(rawMessage: unknown): ValidationResult {
  if (typeof rawMessage !== 'string') {
    return { valid: false, sanitizedMessage: '', error: 'Message must be a string' };
  }

  const trimmed = rawMessage.trim();
  if (trimmed.length === 0) {
    return { valid: false, sanitizedMessage: '', error: 'Message cannot be empty' };
  }

  if (trimmed.length > 500) {
    return {
      valid: false,
      sanitizedMessage: '',
      error: 'Message exceeds maximum length of 500 characters',
    };
  }

  // Strip null bytes and non-printable control characters (except newline, tab)
  const sanitized = trimmed.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  return { valid: true, sanitizedMessage: sanitized };
}

export function validateHistory(history: unknown): Array<{ role: 'user' | 'assistant'; content: string }> {
  if (!Array.isArray(history)) return [];

  const maxHistoryItems = 6;
  const validItems = history
    .filter(
      (item): item is { role: 'user' | 'assistant'; content: string } =>
        typeof item === 'object' &&
        item !== null &&
        (item.role === 'user' || item.role === 'assistant') &&
        typeof item.content === 'string' &&
        item.content.trim().length > 0 &&
        item.content.length <= 500
    )
    .slice(-maxHistoryItems);

  return validItems;
}
