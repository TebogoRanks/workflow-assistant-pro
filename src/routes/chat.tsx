import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { MessageSquare, Send, Trash2, Loader2, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResponsibleAI } from "@/components/responsible-ai";
import { addHistory, bumpStat } from "@/lib/history";
import { toast } from "sonner";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "AI Chatbot — Workplace AI" }] }),
  component: ChatPage,
});

const suggested = [
  "Draft a professional out-of-office reply",
  "Give me 5 icebreakers for a team standup",
  "How do I say no to a meeting politely?",
  "Summarize the pros and cons of async work",
];

function ChatPage() {
  const { messages, sendMessage, status, setMessages, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onFinish: ({ message }) => {
      const text = message.parts.filter((p) => p.type === "text").map((p) => (p as { text: string }).text).join("");
      if (text) addHistory({ type: "chat", title: "Chat " + new Date().toLocaleTimeString(), content: text });
      bumpStat("chat");
    },
  });
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const submit = (text?: string) => {
    const t = (text ?? input).trim();
    if (!t) return;
    sendMessage({ text: t });
    setInput("");
  };

  const isLoading = status === "submitted" || status === "streaming";

  return (
    <div className="mx-auto flex max-w-5xl flex-col px-4 py-6 sm:px-6 sm:py-8" style={{ minHeight: "calc(100vh - 3.5rem)" }}>
      <div className="flex items-start justify-between gap-3">
        <PageHeader title="AI Chatbot" description="Ask anything about work, writing or research." icon={<MessageSquare className="h-5 w-5" />} />
        {messages.length > 0 && (
          <Button variant="outline" size="sm" onClick={() => setMessages([])}>
            <Trash2 className="h-4 w-4" /> Clear
          </Button>
        )}
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto rounded-2xl border border-border bg-card/40 p-4 shadow-[var(--shadow-card)]">
        {messages.length === 0 ? (
          <div className="grid h-full min-h-[300px] place-items-center">
            <div className="max-w-lg text-center">
              <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-elegant)]">
                <Sparkles className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-semibold">How can I help you today?</h2>
              <p className="mt-1 text-sm text-muted-foreground">Try one of these prompts to get started.</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {suggested.map((s) => (
                  <button
                    key={s}
                    onClick={() => submit(s)}
                    className="rounded-xl border border-border bg-background p-3 text-left text-sm transition-all hover:border-primary hover:shadow-[var(--shadow-elegant)]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          messages.map((m) => {
            const text = m.parts.filter((p) => p.type === "text").map((p) => (p as { text: string }).text).join("");
            const isUser = m.role === "user";
            return (
              <div key={m.id} className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"} animate-fade-in`}>
                {!isUser && (
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[image:var(--gradient-primary)] text-primary-foreground">
                    <Sparkles className="h-4 w-4" />
                  </div>
                )}
                <div className={isUser
                  ? "max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground shadow-sm"
                  : "max-w-[85%] rounded-2xl rounded-tl-sm text-sm leading-relaxed"}>
                  {isUser ? (
                    <div className="whitespace-pre-wrap">{text}</div>
                  ) : (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown>{text}</ReactMarkdown>
                    </div>
                  )}
                  <div className={`mt-1 text-[10px] opacity-60 ${isUser ? "text-primary-foreground" : "text-muted-foreground"}`}>
                    {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            );
          })
        )}
        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking...
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); submit(); }}
        className="mt-3 flex items-end gap-2 rounded-2xl border border-border bg-card p-2 shadow-[var(--shadow-card)]"
      >
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); }
          }}
          placeholder="Ask AI anything about work, productivity, writing or research..."
          rows={1}
          className="min-h-[44px] flex-1 resize-none border-0 bg-transparent focus-visible:ring-0"
        />
        <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="bg-[image:var(--gradient-primary)] text-primary-foreground">
          <Send className="h-4 w-4" />
        </Button>
      </form>
      <ResponsibleAI />
    </div>
  );
}