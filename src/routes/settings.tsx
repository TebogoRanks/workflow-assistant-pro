import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Settings as SettingsIcon } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Workplace AI" }] }),
  component: SettingsPage,
});

interface Prefs { tone: string; depth: string; notifications: boolean }
const DEFAULTS: Prefs = { tone: "Professional", depth: "Detailed", notifications: true };

function SettingsPage() {
  const { theme, toggle } = useTheme();
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("wai-prefs") ?? "null");
      if (s) setPrefs({ ...DEFAULTS, ...s });
    } catch { /* noop */ }
  }, []);

  const save = (p: Prefs) => { setPrefs(p); localStorage.setItem("wai-prefs", JSON.stringify(p)); toast.success("Saved"); };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
      <PageHeader title="Settings" description="Personalize your workspace." icon={<SettingsIcon className="h-5 w-5" />} />
      <Card>
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <Label>Theme</Label>
              <p className="text-xs text-muted-foreground">Switch between light and dark mode.</p>
            </div>
            <Button variant="outline" onClick={toggle}>{theme === "light" ? "Light" : "Dark"}</Button>
          </div>

          <div className="space-y-1.5">
            <Label>Preferred AI tone</Label>
            <Select value={prefs.tone} onValueChange={(v) => save({ ...prefs, tone: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Professional", "Friendly", "Persuasive", "Formal", "Casual"].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Default research depth</Label>
            <Select value={prefs.depth} onValueChange={(v) => save({ ...prefs, depth: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Quick Summary", "Detailed", "Comprehensive"].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Notifications</Label>
              <p className="text-xs text-muted-foreground">Show toast notifications for AI actions.</p>
            </div>
            <Switch checked={prefs.notifications} onCheckedChange={(v) => save({ ...prefs, notifications: v })} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}