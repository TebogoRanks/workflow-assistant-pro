export interface HistoryItem {
  id: string;
  type: "email" | "meeting" | "task" | "research" | "chat";
  title: string;
  content: string;
  createdAt: number;
}

const KEY = "wai-history";

export function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function addHistory(item: Omit<HistoryItem, "id" | "createdAt">) {
  if (typeof window === "undefined") return;
  const all = getHistory();
  all.unshift({ ...item, id: crypto.randomUUID(), createdAt: Date.now() });
  localStorage.setItem(KEY, JSON.stringify(all.slice(0, 100)));
  bumpStat(item.type);
}

export function clearHistory() {
  localStorage.removeItem(KEY);
}

const STATS_KEY = "wai-stats";
export function getStats(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(STATS_KEY) ?? "{}"); } catch { return {}; }
}
export function bumpStat(type: string) {
  const s = getStats();
  s[type] = (s[type] ?? 0) + 1;
  localStorage.setItem(STATS_KEY, JSON.stringify(s));
}