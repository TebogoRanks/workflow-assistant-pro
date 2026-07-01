export interface HistoryItem {
  id: string;
  type: "email" | "meeting" | "task" | "research" | "chat";
  title: string;
  content: string;
  createdAt: number;
}

const KEY = "wai-history";

import { DEFAULT_ACTIVITY, DEFAULT_STATS } from "./mock-data";

const SEED_KEY = "wai-seeded";

function ensureSeeded() {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(SEED_KEY)) return;
  localStorage.setItem(KEY, JSON.stringify(DEFAULT_ACTIVITY));
  localStorage.setItem(STATS_KEY, JSON.stringify(DEFAULT_STATS));
  localStorage.setItem(SEED_KEY, "1");
}

export function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  ensureSeeded();
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function addHistory(item: Omit<HistoryItem, "id" | "createdAt">) {
  if (typeof window === "undefined") return;
  ensureSeeded();
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
  ensureSeeded();
  try { return JSON.parse(localStorage.getItem(STATS_KEY) ?? "{}"); } catch { return {}; }
}
export function bumpStat(type: string) {
  ensureSeeded();
  const s = getStats();
  s[type] = (s[type] ?? 0) + 1;
  localStorage.setItem(STATS_KEY, JSON.stringify(s));
}