import { ToolDefinition } from '../agent/tools';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface StreamEvent {
  type: 'text' | 'tool_call' | 'sources' | 'error' | 'done';
  content?: string;
  toolCall?: {
    name: string;
    arguments: Record<string, unknown>;
  };
  sources?: Array<{
    title: string;
    section: string;
    url: string;
  }>;
}

export interface GenerateStreamOptions {
  temperature?: number;
  tools?: ToolDefinition[];
  sources?: Array<{
    title: string;
    section: string;
    url: string;
  }>;
}

export interface AIProvider {
  name: string;
  generateStream(
    messages: ChatMessage[],
    options?: GenerateStreamOptions
  ): Promise<ReadableStream<Uint8Array>>;
}
