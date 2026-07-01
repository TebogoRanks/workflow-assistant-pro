import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { History as HistoryIcon, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getHistory, clearHistory, type HistoryItem } from "@/lib/history";
import { toast } from "sonner";

export const Route = createFileRoute("/history")({
  head: () => ({ meta: [{ title: "History — Workplace AI" }] }),
  component: HistoryPage,
});

function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  useEffect(() => setItems(getHistory()), []);

  const clear = () => { clearHistory(); setItems([]); toast.success("History cleared"); };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="flex items-start justify-between gap-3">
        <PageHeader title="History" description="Your recent AI generations." icon={<HistoryIcon className="h-5 w-5" />} />
        {items.length > 0 && (
          <Button variant="outline" size="sm" onClick={clear}><Trash2 className="h-4 w-4" /> Clear all</Button>
        )}
      </div>
      {items.length === 0 ? (
        <Card><CardContent className="py-14 text-center text-sm text-muted-foreground">Nothing here yet.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {items.map((it) => (
            <Card key={it.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate font-medium">{it.title}</div>
                    <div className="text-xs capitalize text-muted-foreground">{it.type} · {new Date(it.createdAt).toLocaleString()}</div>
                  </div>
                </div>
                <div className="mt-2 line-clamp-3 whitespace-pre-wrap text-sm text-muted-foreground">{it.content}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}