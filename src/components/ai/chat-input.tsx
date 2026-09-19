'use client';

import * as React from 'react';
import { ArrowUp, Square, Sparkles } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isStreaming: boolean;
  onStopStreaming: () => void;
  suggestedQuestions?: string[];
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export function ChatInput({
  onSendMessage,
  isStreaming,
  onStopStreaming,
  suggestedQuestions = [],
  placeholder = 'Ask anything about Afsar...',
  className = '',
  autoFocus = false,
}: ChatInputProps) {
  const [input, setInput] = React.useState('');
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

  // Auto-resize textarea height
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isStreaming) return;
    onSendMessage(input.trim());
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={`w-full flex flex-col gap-3 ${className}`}>
      {/* Optional Suggestion Chips */}
      {!isStreaming && suggestedQuestions.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          <Sparkles className="h-3.5 w-3.5 text-accent flex-shrink-0" />
          <span className="text-muted text-xs flex-shrink-0 font-medium">Try asking:</span>
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSendMessage(q)}
              className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-surface-2 hover:bg-surface-3 text-muted hover:text-foreground border border-border hover:border-border-hover transition-all text-xs active:scale-95 shadow-sm"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Main Input Box */}
      <form
        onSubmit={handleSubmit}
        className="relative flex items-end rounded-2xl border border-border bg-surface-1/95 p-2 focus-within:border-accent/60 focus-within:ring-2 focus-within:ring-accent/15 transition-all shadow-xl shadow-black/40"
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          maxLength={500}
          placeholder={placeholder}
          className="w-full resize-none bg-transparent px-3 py-2 text-sm sm:text-base text-foreground placeholder:text-muted/60 focus:outline-none min-h-[44px] max-h-[160px] leading-relaxed"
        />

        <div className="flex items-center gap-2 pb-1 pr-1 flex-shrink-0">
          {input.length > 350 && (
            <span className="text-[10px] text-muted font-mono hidden sm:inline">
              {input.length}/500
            </span>
          )}

          {isStreaming ? (
            <button
              type="button"
              onClick={onStopStreaming}
              className="h-9 w-9 rounded-xl bg-surface-3 hover:bg-surface-2 text-muted hover:text-foreground flex items-center justify-center transition-colors shadow-sm"
              title="Stop generation"
            >
              <Square className="h-3.5 w-3.5 fill-current" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="h-9 w-9 rounded-xl bg-foreground text-background hover:bg-white disabled:opacity-20 disabled:pointer-events-none flex items-center justify-center transition-all active:scale-95 shadow-md"
              title="Send message"
            >
              <ArrowUp className="h-4 w-4 stroke-[2.5]" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
