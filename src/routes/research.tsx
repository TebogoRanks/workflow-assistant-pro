import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Search, Loader2 } from "lucide-react";
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
import { addHistory } from "@/lib/history";
import { RESEARCH_DEFAULTS, RESEARCH_MOCK, mockDelay } from "@/lib/mock-data";

export const Route = createFileRoute("/research")({
  head: () => ({ meta: [{ title: "AI Research Assistant — Workplace AI" }] }),
  component: ResearchPage,
});

function ResearchPage() {
  const [topic, setTopic] = useState(RESEARCH_DEFAULTS.topic);
  const [context, setContext] = useState(RESEARCH_DEFAULTS.context);
  const [depth, setDepth] = useState(RESEARCH_DEFAULTS.depth);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!topic.trim()) { toast.error("Enter a research topic"); return; }
    setLoading(true);
    try {
      const text = await mockDelay(RESEARCH_MOCK);
      setOutput(text);
      addHistory({ type: "research", title: topic.slice(0, 60), content: text });
    } catch (e) { toast.error(e instanceof Error ? e.message : "Failed"); }
    finally { setLoading(false); }
  };

  const didAuto = useRef(false);
  useEffect(() => {
    if (didAuto.current) return;
    didAuto.current = true;
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      {(output || loading) && (
        <div className="mt-6">
          {loading && !output ? (
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground shadow-[var(--shadow-card)]">
              <Loader2 className="h-4 w-4 animate-spin" /> Researching {topic}…
            </div>
          ) : (
            <AIOutput value={output} onChange={setOutput} onRegenerate={run} loading={loading} filename="research" markdown />
          )}
        </div>
      )}
      <ResponsibleAI />
    </div>
  );
}