import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ListChecks, Loader2 } from "lucide-react";
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
import { TASK_DEFAULTS, TASK_MOCK_PLAN, mockDelay } from "@/lib/mock-data";

export const Route = createFileRoute("/tasks")({
  head: () => ({ meta: [{ title: "AI Task Planner — Workplace AI" }] }),
  component: TasksPage,
});

function TasksPage() {
  const [goals, setGoals] = useState(TASK_DEFAULTS.goals);
  const [deadlines, setDeadlines] = useState(TASK_DEFAULTS.deadlines);
  const [priority, setPriority] = useState(TASK_DEFAULTS.priority);
  const [hours, setHours] = useState(TASK_DEFAULTS.hours);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!goals.trim()) { toast.error("List at least one goal"); return; }
    setLoading(true);
    try {
      const text = await mockDelay(TASK_MOCK_PLAN);
      setOutput(text);
      addHistory({ type: "task", title: "Plan " + new Date().toLocaleDateString(), content: text });
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
      <PageHeader title="AI Task Planner" description="Build a smart, prioritized schedule." icon={<ListChecks className="h-5 w-5" />} />
      <Card>
        <CardContent className="grid gap-4 p-5 md:grid-cols-2">
          <div className="space-y-1.5 md:col-span-2">
            <Label>Goals</Label>
            <Textarea rows={4} placeholder="- Ship v2 launch&#10;- Prepare board deck" value={goals} onChange={(e) => setGoals(e.target.value)} />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <Label>Deadlines</Label>
            <Textarea rows={3} placeholder="- Board deck by Thu&#10;- Launch on Friday" value={deadlines} onChange={(e) => setDeadlines(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Priority level</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["High", "Medium", "Low"].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Working hours</Label>
            <Input value={hours} onChange={(e) => setHours(e.target.value)} />
          </div>
          <div className="flex gap-2 md:col-span-2">
            <Button onClick={run} disabled={loading} className="bg-[image:var(--gradient-primary)] text-primary-foreground">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Generate Plan"}
            </Button>
            <Button variant="outline" onClick={() => { setGoals(""); setDeadlines(""); setOutput(""); }}>Clear</Button>
          </div>
        </CardContent>
      </Card>
      {(output || loading) && (
        <div className="mt-6">
          {loading && !output ? (
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground shadow-[var(--shadow-card)]">
              <Loader2 className="h-4 w-4 animate-spin" /> Building your schedule…
            </div>
          ) : (
            <AIOutput value={output} onChange={setOutput} onRegenerate={run} loading={loading} filename="task-plan" markdown />
          )}
        </div>
      )}
      <ResponsibleAI />
    </div>
  );
}