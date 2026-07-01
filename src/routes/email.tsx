import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Loader2 } from "lucide-react";
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

export const Route = createFileRoute("/email")({
  head: () => ({ meta: [{ title: "Smart Email Generator — Workplace AI" }] }),
  component: EmailPage,
});

function EmailPage() {
  const gen = useServerFn(generateAI);
  const [purpose, setPurpose] = useState("");
  const [recipient, setRecipient] = useState("");
  const [points, setPoints] = useState("");
  const [tone, setTone] = useState("Professional");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!purpose.trim()) { toast.error("Please describe the email purpose"); return; }
    setLoading(true);
    try {
      const res = await gen({
        data: {
          system: "You are an expert business communication assistant. Generate a well-written email using the following information. Maintain the selected tone while remaining clear, concise and professional. Return only the email with a subject line.",
          prompt: `Purpose: ${purpose}\nRecipient: ${recipient || "colleague"}\nKey points:\n${points}\nTone: ${tone}`,
        },
      });
      setOutput(res.text);
      addHistory({ type: "email", title: purpose.slice(0, 60), content: res.text });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to generate");
    } finally { setLoading(false); }
  };

  const clear = () => { setPurpose(""); setRecipient(""); setPoints(""); setOutput(""); };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      <PageHeader title="Smart Email Generator" description="Draft professional emails in seconds." icon={<Mail className="h-5 w-5" />} />
      <Card>
        <CardContent className="grid gap-4 p-5 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Email purpose</Label>
            <Input placeholder="e.g. Ask for a project update" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Recipient</Label>
            <Input placeholder="e.g. Sarah, Marketing Manager" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <Label>Key points</Label>
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

      {output && (
        <div className="mt-6">
          <AIOutput value={output} onChange={setOutput} onRegenerate={run} loading={loading} filename="email" />
        </div>
      )}
      <ResponsibleAI />
    </div>
  );
}