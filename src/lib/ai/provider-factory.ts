import { AIProvider } from './provider-interface';
import { GroqProvider } from './groq-provider';
import { GeminiProvider } from './gemini-provider';
import { MockProvider } from './mock-provider';

export function getAIProvider(): AIProvider {
  const chosen = process.env.AI_PROVIDER?.toLowerCase();

  if (chosen === 'groq' || (!chosen && process.env.GROQ_API_KEY)) {
    if (process.env.GROQ_API_KEY) {
      return new GroqProvider();
    }
  }

  if (chosen === 'gemini' || (!chosen && process.env.GEMINI_API_KEY)) {
    if (process.env.GEMINI_API_KEY) {
      return new GeminiProvider();
    }
  }

  if (chosen === 'mock') {
    return new MockProvider();
  }

  // Safe fallback to mock if no keys are found
  return new MockProvider();
}
