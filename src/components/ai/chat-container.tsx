'use client';

import * as React from 'react';
import { Sparkles, Trash2, ArrowDown, RefreshCw, Compass } from 'lucide-react';
import { ChatMessage, MessageItem } from './chat-message';
import { ChatInput } from './chat-input';
import { Button } from '@/components/ui/button';

interface ChatContainerProps {
  onOpenProject?: (projectId: string) => void;
  onNavigateSection?: (sectionId: string) => void;
  onSwitchToExplore?: () => void;
  className?: string;
}

const VERIFIED_SUGGESTED_PROMPTS = [
  'Who is Afsar?',
  'What projects has he built?',
  'What technologies does he use?',
  'Tell me about RedactVision Agent',
  'What is his education?',
];

export function ChatContainer({
  onOpenProject,
  onNavigateSection,
  onSwitchToExplore,
  className = '',
}: ChatContainerProps) {
  const [messages, setMessages] = React.useState<MessageItem[]>([]);
  const [isStreaming, setIsStreaming] = React.useState(false);
  const [lastUserMessage, setLastUserMessage] = React.useState<string | null>(null);
  const abortControllerRef = React.useRef<AbortController | null>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const hasMessages = messages.length > 0;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    if (hasMessages) {
      scrollToBottom();
    }
  }, [messages, isStreaming, hasMessages]);

  const handleToolCall = (toolCall: { name: string; arguments: Record<string, unknown> }) => {
    const { name, arguments: args } = toolCall;

    if (name === 'openSection') {
      const section = (args.section as string) || 'projects';
      onNavigateSection?.(section);
    } else if (name === 'openProject') {
      const projectId = (args.projectId as string) || '';
      if (projectId) {
        onOpenProject?.(projectId);
      }
    } else if (name === 'openResume') {
      window.open('/resume.pdf', '_blank');
    } else if (name === 'openExternalLink') {
      const platform = (args.platform as string) || 'github';
      const urls: Record<string, string> = {
        github: 'https://github.com/AfsarAI',
        linkedin: 'https://www.linkedin.com/in/afsarai/',
        leetcode: 'https://leetcode.com/u/afsar_ai_/',
        email: 'mailto:23f2002023@ds.study.iitm.ac.in',
      };
      if (urls[platform]) {
        window.open(urls[platform], '_blank');
      }
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isStreaming) return;

    setLastUserMessage(text.trim());
    const userMessageId = `user-${Date.now()}`;
    const assistantMessageId = `asst-${Date.now()}`;

    const userMsg: MessageItem = { id: userMessageId, role: 'user', content: text.trim() };
    const currentMessages = [...messages, userMsg];

    setMessages([
      ...currentMessages,
      { id: assistantMessageId, role: 'assistant', content: '', isStreaming: true },
    ]);
    setIsStreaming(true);

    const historyPayload = currentMessages
      .slice(-6)
      .map((m) => ({ role: m.role, content: m.content }));

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), history: historyPayload }),
        signal: abortController.signal,
      });

      if (!response.ok) {
        const errorJson = await response.json().catch(() => ({}));
        throw new Error(errorJson.error || `Server responded with status ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No readable stream available');

      const decoder = new TextDecoder();
      let accumulatedText = '';
      let detectedToolCall: { name: string; arguments: Record<string, unknown> } | undefined;
      let detectedSources: MessageItem['sources'] = [];
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data: ')) continue;

          try {
            const parsed = JSON.parse(trimmed.slice(6));

            if (parsed.type === 'text' && parsed.content) {
              accumulatedText += parsed.content;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMessageId
                    ? { ...m, content: accumulatedText, isStreaming: true }
                    : m
                )
              );
            } else if (parsed.type === 'tool_call' && parsed.toolCall) {
              detectedToolCall = parsed.toolCall;
              handleToolCall(parsed.toolCall);
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMessageId ? { ...m, toolCall: detectedToolCall } : m
                )
              );
            } else if (parsed.type === 'sources' && parsed.sources) {
              detectedSources = parsed.sources;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMessageId ? { ...m, sources: detectedSources } : m
                )
              );
            }
          } catch {
            // Ignore partial chunk JSON errors
          }
        }
      }

      // Generate context-aware followups
      const suggestedFollowups: string[] = [];
      const lower = text.toLowerCase();
      if (lower.includes('project') || lower.includes('build')) {
        suggestedFollowups.push('Open Projects Section', 'Tell me about RedactVision Agent');
      } else if (lower.includes('who') || lower.includes('about')) {
        suggestedFollowups.push('What projects has he built?', 'What is his education?');
      } else if (lower.includes('skill') || lower.includes('technolog')) {
        suggestedFollowups.push('Tell me about RedactVision Agent', 'What did he do at SGBC?');
      } else {
        suggestedFollowups.push('What projects has he built?', 'What technologies does he use?');
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessageId
            ? { ...m, isStreaming: false, suggestedFollowups }
            : m
        )
      );
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessageId
              ? { ...m, content: m.content + ' *(Response stopped)*', isStreaming: false }
              : m
          )
        );
      } else {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessageId
              ? {
                  ...m,
                  content:
                    'The portfolio assistant is temporarily experiencing high demand or configuring services. Please click retry or ask another question.',
                  isStreaming: false,
                  isError: true,
                }
              : m
          )
        );
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const handleStopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const handleClearChat = () => {
    if (isStreaming) handleStopStreaming();
    setMessages([]);
    setLastUserMessage(null);
  };

  const handleRetry = () => {
    if (lastUserMessage) {
      // Remove the last assistant error message and retry
      setMessages((prev) => prev.slice(0, -1));
      handleSendMessage(lastUserMessage);
    }
  };

  // 1. MINIMAL ABOVE-THE-FOLD LANDING STATE (when no messages yet)
  if (!hasMessages) {
    return (
      <div className={`w-full max-w-2xl mx-auto px-4 py-20 sm:py-28 flex flex-col items-center text-center ${className}`}>
        {/* Subtle Greeting Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-2/90 border border-border text-xs text-muted mb-8 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="font-medium text-foreground">Afsar AI</span>
          <span className="text-border">·</span>
          <span>Interactive Portfolio Assistant</span>
        </div>

        {/* Hero Greeting */}
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-3">
          Hi, I&apos;m Afsar 👋
        </h1>
        <p className="text-base sm:text-lg text-muted mb-10 max-w-md mx-auto leading-relaxed">
          Ask anything about my projects, engineering background, skills, or portfolio.
        </p>

        {/* Central Chat Input */}
        <div className="w-full mb-8">
          <ChatInput
            onSendMessage={handleSendMessage}
            isStreaming={isStreaming}
            onStopStreaming={handleStopStreaming}
            placeholder="Ask anything about Afsar..."
            autoFocus
          />
        </div>

        {/* Suggested Prompts Grid */}
        <div className="w-full max-w-xl flex flex-col items-center gap-2.5 mb-14">
          <span className="text-xs text-muted font-medium uppercase tracking-wider font-mono">
            Try asking
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {VERIFIED_SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-3.5 py-2 rounded-xl bg-surface-2/80 hover:bg-surface-3 text-muted hover:text-foreground border border-border hover:border-border-hover transition-all text-xs font-medium active:scale-95 shadow-sm"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Subtle manual exploration hint */}
        <button
          onClick={onSwitchToExplore}
          className="inline-flex items-center gap-2 text-xs text-muted hover:text-foreground transition-colors group py-2 px-4 rounded-full hover:bg-surface-2 border border-transparent hover:border-border"
        >
          <span>Prefer browsing normally? Explore Portfolio</span>
          <ArrowDown className="h-3.5 w-3.5 group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>
    );
  }

  // 2. ACTIVE CONVERSATIONAL THREAD (when chat has started)
  return (
    <div className={`w-full max-w-3xl mx-auto px-4 flex flex-col min-h-[calc(100vh-5rem)] pb-36 ${className}`}>
      {/* Header bar for conversation controls */}
      <div className="flex items-center justify-between py-3 mb-2 border-b border-border/60">
        <div className="flex items-center gap-2 text-xs text-muted">
          <Sparkles className="h-3.5 w-3.5 text-accent-light" />
          <span className="font-medium text-foreground">Conversation with Afsar AI</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onSwitchToExplore}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-2 hover:bg-surface-3 border border-border text-xs text-muted hover:text-foreground transition-colors"
            title="Switch to manual portfolio exploration"
          >
            <Compass className="h-3 w-3" />
            <span className="hidden sm:inline">Explore Portfolio</span>
          </button>
          <button
            onClick={handleClearChat}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-surface-2 text-xs text-muted hover:text-foreground transition-colors"
            title="Reset conversation"
          >
            <Trash2 className="h-3 w-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 space-y-2 py-4">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            onNavigate={(url) => {
              if (url.startsWith('#projects?id=')) {
                const projId = url.split('=')[1];
                onOpenProject?.(projId);
              } else if (url.startsWith('#')) {
                const section = url.slice(1);
                onNavigateSection?.(section);
              }
            }}
            onSelectFollowup={(followup) => handleSendMessage(followup)}
            onRetry={handleRetry}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Sticky Input */}
      <div className="fixed bottom-0 left-0 right-0 z-30 px-4 py-4 bg-gradient-to-t from-background via-background/95 to-transparent backdrop-blur-md">
        <div className="max-w-3xl mx-auto">
          <ChatInput
            onSendMessage={handleSendMessage}
            isStreaming={isStreaming}
            onStopStreaming={handleStopStreaming}
            placeholder="Ask a follow-up question..."
          />
        </div>
      </div>
    </div>
  );
}
