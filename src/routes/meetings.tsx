import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AIOutput } from "@/components/ai-output";
import { ResponsibleAI } from "@/components/responsible-ai";
import { addHistory } from "@/lib/history";
import { MEETING_DEFAULT_NOTES, MEETING_MOCK_SUMMARY, mockDelay } from "@/lib/mock-data";

export const Route = createFileRoute("/meetings")({
  head: () => ({ meta: [{ title: "Meeting Notes Summarizer — Workplace AI" }] }),
  component: MeetingsPage,
});

function MeetingsPage() {
  const [notes, setNotes] = useState(MEETING_DEFAULT_NOTES);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!notes.trim()) { toast.error("Paste your meeting notes first"); return; }
    setLoading(true);
    try {
      const text = await mockDelay(MEETING_MOCK_SUMMARY);
      setOutput(text);
      addHistory({ type: "meeting", title: "Meeting summary " + new Date().toLocaleDateString(), content: text });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally { setLoading(false); }
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
      <PageHeader title="Meeting Notes Summarizer" description="Turn raw notes into structured summaries." icon={<FileText className="h-5 w-5" />} />
      <Card>
        <CardContent className="space-y-3 p-5">
          <Textarea rows={10} placeholder="Paste your raw meeting notes here..." value={notes} onChange={(e) => setNotes(e.target.value)} />
          <div className="flex gap-2">
            <Button onClick={run} disabled={loading} className="bg-[image:var(--gradient-primary)] text-primary-foreground">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Summarize"}
            </Button>
            <Button variant="outline" onClick={() => { setNotes(""); setOutput(""); }}>Clear</Button>
          </div>
        </CardContent>
      </Card>
      {(output || loading) && (
        <div className="mt-6">
          {loading && !output ? (
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground shadow-[var(--shadow-card)]">
              <Loader2 className="h-4 w-4 animate-spin" /> Summarizing your notes…
            </div>
          ) : (
            <AIOutput value={output} onChange={setOutput} onRegenerate={run} loading={loading} filename="meeting-summary" markdown />
          )}
        </div>
      )}
      <ResponsibleAI />
    </div>
  );
}