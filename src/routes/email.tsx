import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Mail, Loader2 } from "lucide-react";
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
import { EMAIL_DEFAULTS, mockEmail, mockDelay } from "@/lib/mock-data";

export const Route = createFileRoute("/email")({
  head: () => ({ meta: [{ title: "Smart Email Generator — Workplace AI" }] }),
  component: EmailPage,
});

function EmailPage() {
  const [purpose, setPurpose] = useState(EMAIL_DEFAULTS.purpose);
  const [recipient, setRecipient] = useState(EMAIL_DEFAULTS.recipient);
  const [subject, setSubject] = useState(EMAIL_DEFAULTS.subject);
  const [points, setPoints] = useState(EMAIL_DEFAULTS.points);
  const [tone, setTone] = useState(EMAIL_DEFAULTS.tone);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!purpose.trim()) { toast.error("Please describe the email purpose"); return; }
    setLoading(true);
    try {
      const text = await mockDelay(mockEmail({ recipient, subject, purpose, tone, points }));
      setOutput(text);
      addHistory({ type: "email", title: `Email: ${subject || purpose.slice(0, 40)}`, content: text });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to generate");
    } finally { setLoading(false); }
  };

  const clear = () => { setPurpose(""); setRecipient(""); setSubject(""); setPoints(""); setOutput(""); };

  // Auto-generate a sample email on first mount so the page never looks empty.
  const didAuto = useRef(false);
  useEffect(() => {
    if (didAuto.current) return;
    didAuto.current = true;
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      <PageHeader title="Smart Email Generator" description="Draft professional emails in seconds." icon={<Mail className="h-5 w-5" />} />
      <Card>
        <CardContent className="grid gap-4 p-5 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Recipient</Label>
            <Input placeholder="e.g. Sarah, Marketing Manager" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Subject</Label>
            <Input placeholder="e.g. Project Status Update" value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <Label>Purpose</Label>
            <Input placeholder="e.g. Provide an update on project progress" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <Label>Additional details / key points</Label>
            <Textarea rows={4} placeholder="- Timeline is slipping&#10;- Need Q3 numbers by Friday" value={points} onChange={(e) => setPoints(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Professional", "Friendly", "Persuasive", "Formal", "Casual"].map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end gap-2">
            <Button onClick={run} disabled={loading} className="bg-[image:var(--gradient-primary)] text-primary-foreground">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Generate Email"}
            </Button>
            <Button variant="outline" onClick={clear}>Clear</Button>
          </div>
        </CardContent>
      </Card>

      {(output || loading) && (
        <div className="mt-6">
          {loading && !output ? (
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground shadow-[var(--shadow-card)]">
              <Loader2 className="h-4 w-4 animate-spin" /> Drafting your email…
            </div>
          ) : (
            <AIOutput value={output} onChange={setOutput} onRegenerate={run} loading={loading} filename="email" />
          )}
        </div>
      )}
      <ResponsibleAI />
    </div>
  );
}