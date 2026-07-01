import { useState } from "react";
import { toast } from "sonner";
import { Copy, Download, FileDown, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";
import { jsPDF } from "jspdf";

interface AIOutputProps {
  value: string;
  onChange: (v: string) => void;
  onRegenerate?: () => void;
  loading?: boolean;
  filename?: string;
  markdown?: boolean;
}

export function AIOutput({ value, onChange, onRegenerate, loading, filename = "output", markdown }: AIOutputProps) {
  const [editing, setEditing] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard");
  };
  const downloadTxt = () => {
    const blob = new Blob([value], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const downloadPdf = () => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(value, 180);
    doc.text(lines, 15, 20);
    doc.save(`${filename}.pdf`);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant="outline" onClick={() => setEditing((e) => !e)}>
          {editing ? "Preview" : "Edit"}
        </Button>
        <Button size="sm" variant="outline" onClick={copy}><Copy className="h-3.5 w-3.5" /> Copy</Button>
        <Button size="sm" variant="outline" onClick={downloadTxt}><Download className="h-3.5 w-3.5" /> TXT</Button>
        <Button size="sm" variant="outline" onClick={downloadPdf}><FileDown className="h-3.5 w-3.5" /> PDF</Button>
        {onRegenerate && (
          <Button size="sm" variant="outline" onClick={onRegenerate} disabled={loading}>
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Regenerate
          </Button>
        )}
      </div>
      {editing ? (
        <Textarea value={value} onChange={(e) => onChange(e.target.value)} className="min-h-[300px] font-mono text-sm" />
      ) : (
        <div className="min-h-[300px] whitespace-pre-wrap rounded-lg border border-border bg-card p-4 text-sm leading-relaxed shadow-[var(--shadow-card)]">
          {markdown ? (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{value}</ReactMarkdown>
            </div>
          ) : (
            value
          )}
        </div>
      )}
    </div>
  );
}