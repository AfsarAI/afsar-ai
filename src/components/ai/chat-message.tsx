'use client';

import * as React from 'react';
import { User, Sparkles, Copy, Check, RotateCcw, AlertCircle } from 'lucide-react';
import { SourceCitations, SourceCitation } from './source-citations';
import { ToolIndicator } from './tool-indicator';

export interface MessageItem {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  toolCall?: {
    name: string;
    arguments: Record<string, unknown>;
  };
  sources?: SourceCitation[];
  isStreaming?: boolean;
  isError?: boolean;
  suggestedFollowups?: string[];
}

interface ChatMessageProps {
  message: MessageItem;
  onNavigate?: (url: string) => void;
  onSelectFollowup?: (prompt: string) => void;
  onRetry?: () => void;
}

export function ChatMessage({
  message,
  onNavigate,
  onSelectFollowup,
  onRetry,
}: ChatMessageProps) {
  const [copied, setCopied] = React.useState(false);
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Basic inline markdown parser (bold, backticks, bullet points)
  const renderFormattedContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Bullet points
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const bulletText = line.trim().substring(2);
        return (
          <li key={idx} className="ml-4 list-disc text-sm sm:text-base text-foreground/90 my-1 leading-relaxed">
            {parseInlineMarkdown(bulletText)}
          </li>
        );
      }
      // Numbered lists
      const numberedMatch = line.trim().match(/^(\d+)\.\s+(.*)/);
      if (numberedMatch) {
        return (
          <li key={idx} className="ml-4 list-decimal text-sm sm:text-base text-foreground/90 my-1 leading-relaxed">
            {parseInlineMarkdown(numberedMatch[2])}
          </li>
        );
      }
      // Empty line
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }
      return (
        <p key={idx} className="text-sm sm:text-base text-foreground/90 leading-relaxed my-1">
          {parseInlineMarkdown(line)}
        </p>
      );
    });
  };

  const parseInlineMarkdown = (line: string) => {
    const parts = line.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="px-1.5 py-0.5 rounded bg-surface-3 text-accent-light font-mono text-xs">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <div
      className={`group flex gap-3.5 py-3 transition-colors ${
        isUser
          ? 'justify-end'
          : 'justify-start'
      }`}
    >
      {/* Assistant Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 mt-0.5">
          <div className="h-8 w-8 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent-light shadow-sm">
            <Sparkles className="h-4 w-4 text-accent-light" />
          </div>
        </div>
      )}

      {/* Message Body */}
      <div
        className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-4 ${
          isUser
            ? 'bg-surface-2 border border-border text-foreground'
            : message.isError
            ? 'bg-surface-1 border border-red-500/30 text-foreground'
            : 'bg-surface-1 border border-border text-foreground shadow-sm'
        }`}
      >
        {/* Header (Role + Actions) */}
        <div className="flex items-center justify-between gap-4 mb-1.5">
          <span className="text-xs font-semibold text-muted">
            {isUser ? 'You' : 'Afsar AI'}
          </span>
          {!isUser && !message.isStreaming && message.content && (
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopy}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-surface-2 text-muted hover:text-foreground text-xs flex items-center gap-1"
                title="Copy response"
              >
                {copied ? <Check className="h-3 w-3 text-accent-light" /> : <Copy className="h-3 w-3" />}
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="prose-invert">
          {message.isError && (
            <div className="flex items-center gap-2 text-red-400 text-xs font-medium mb-2">
              <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
              <span>Service notice</span>
            </div>
          )}
          {renderFormattedContent(message.content)}
          {message.isStreaming && (
            <span className="inline-block w-1.5 h-4 bg-accent animate-pulse ml-0.5 align-middle" />
          )}
        </div>

        {/* Retry on error */}
        {message.isError && onRetry && (
          <div className="mt-3 pt-2 border-t border-border/50">
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-2 hover:bg-surface-3 border border-border text-xs font-medium text-foreground transition-all"
            >
              <RotateCcw className="h-3 w-3 text-accent-light" />
              <span>Retry Question</span>
            </button>
          </div>
        )}

        {/* Tool Indicator */}
        {message.toolCall && <ToolIndicator toolCall={message.toolCall} />}

        {/* Sources */}
        {message.sources && message.sources.length > 0 && (
          <SourceCitations sources={message.sources} onNavigate={onNavigate} />
        )}

        {/* Suggested Followups */}
        {!message.isStreaming && message.suggestedFollowups && message.suggestedFollowups.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border/50 flex flex-wrap gap-1.5">
            {message.suggestedFollowups.map((prompt, i) => (
              <button
                key={i}
                onClick={() => onSelectFollowup?.(prompt)}
                className="px-2.5 py-1 rounded-lg text-xs bg-surface-2 hover:bg-surface-3 text-muted hover:text-foreground border border-border transition-all active:scale-95"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex-shrink-0 mt-0.5">
          <div className="h-8 w-8 rounded-xl bg-surface-2 border border-border flex items-center justify-center text-muted">
            <User className="h-4 w-4" />
          </div>
        </div>
      )}
    </div>
  );
}
