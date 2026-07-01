import { createFileRoute } from "@tanstack/react-router";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });
        const { messages }: { messages: UIMessage[] } = await request.json();
        const gateway = createLovableAiGatewayProvider(key);
        try {
          const result = streamText({
            model: gateway("google/gemini-3-flash-preview"),
            system:
              "You are a helpful AI workplace productivity assistant. Answer clearly and concisely using markdown when helpful. Help with work, writing, research, and productivity.",
            messages: await convertToModelMessages(messages),
          });
          return result.toUIMessageStreamResponse();
        } catch (err: unknown) {
          const e = err as { statusCode?: number; message?: string };
          const status = e.statusCode;
          if (status === 429) return new Response("Rate limit exceeded", { status: 429 });
          if (status === 402) return new Response("AI credits exhausted", { status: 402 });
          return new Response(e.message ?? "AI request failed", { status: 500 });
        }
      },
    },
  },
});