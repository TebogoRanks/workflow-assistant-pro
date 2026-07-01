import { AlertTriangle } from "lucide-react";

export function ResponsibleAI() {
  return (
    <div className="mt-8 flex gap-3 rounded-xl border border-border bg-muted/40 p-4 text-xs text-muted-foreground">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
      <div>
        <div className="font-semibold text-foreground">Responsible AI Disclaimer</div>
        <p className="mt-1">
          AI-generated content may contain inaccuracies. Always review, verify and edit important workplace
          communications before use. Do not share confidential or sensitive company information with AI systems.
        </p>
      </div>
    </div>
  );
}