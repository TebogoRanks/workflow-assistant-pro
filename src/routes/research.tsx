import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AIOutput } from "@/components/ai-output";
import { ResponsibleAI } from "@/components/responsible-ai";
import { generateAI } from "@/lib/ai.functions";
import { addHistory } from "@/lib/history";

export const Route = createFileRoute("/research")({
  head: () => ({ meta: [{ title: "AI Research Assistant — Workplace AI" }] }),
  component: ResearchPage,
});

function ResearchPage() {
  const gen = useServerFn(generateAI);
  const [topic, setTopic] = useState("");
  const [context, setContext] = useState("");
  const [depth, setDepth] = useState("Detailed");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!topic.trim()) { toast.error("Enter a research topic"); return; }
    setLoading(true);
    try {
      const res = await gen({
        data: {
          system: `You are an AI research assistant. Research the topic and provide an easy-to-understand professional summary. Depth level: ${depth}. Return markdown with sections: ## Overview, ## Key Insights, ## Important Facts, ## Recommendations, ## Sources (indicative references only — flag as unverified).`,
          prompt: `Topic: ${topic}\nContext: ${context || "none"}`,
        },
      });
      setOutput(res.text);
      addHistory({ type: "research", title: topic.slice(0, 60), content: res.text });
    } catch (e) { toast.error(e instanceof Error ? e.message : "Failed"); }
    finally { setLoading(false); }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      <PageHeader title="AI Research Assistant" description="Get a structured briefing on any topic." icon={<Search className="h-5 w-5" />} />
      <Card>
        <CardContent className="grid gap-4 p-5 md:grid-cols-2">
          <div className="space-y-1.5 md:col-span-2">
            <Label>Research topic</Label>
            <Input placeholder="e.g. Impact of AI on customer support" value={topic} onChange={(e) => setTopic(e.target.value)} />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <Label>Additional context (optional)</Label>
            <Textarea rows={3} placeholder="Any angle, audience, or constraints" value={context} onChange={(e) => setContext(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Research depth</Label>
            <Select value={depth} onValueChange={setDepth}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Quick Summary", "Detailed", "Comprehensive"].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end gap-2">
            <Button onClick={run} disabled={loading} className="bg-[image:var(--gradient-primary)] text-primary-foreground">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Research"}
            </Button>
            <Button variant="outline" onClick={() => { setTopic(""); setContext(""); setOutput(""); }}>Clear</Button>
          </div>
        </CardContent>
      </Card>
      {output && <div className="mt-6"><AIOutput value={output} onChange={setOutput} onRegenerate={run} loading={loading} filename="research" markdown /></div>}
      <ResponsibleAI />
    </div>
  );
}