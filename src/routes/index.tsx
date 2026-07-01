import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mail, FileText, ListChecks, Search, MessageSquare, LayoutDashboard, ArrowRight, Sparkles, Lightbulb, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getHistory, getStats, type HistoryItem } from "@/lib/history";
import { WEEKLY_PRODUCTIVITY, FEATURE_USAGE } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Workplace AI" },
      { name: "description", content: "Your AI-powered workplace productivity dashboard." },
    ],
  }),
  component: Dashboard,
});

const stats = [
  { key: "email", label: "Emails Generated", icon: Mail, color: "from-blue-500 to-indigo-500" },
  { key: "meeting", label: "Notes Summarized", icon: FileText, color: "from-purple-500 to-pink-500" },
  { key: "task", label: "Tasks Planned", icon: ListChecks, color: "from-emerald-500 to-teal-500" },
  { key: "research", label: "Research Requests", icon: Search, color: "from-amber-500 to-orange-500" },
  { key: "chat", label: "AI Chats", icon: MessageSquare, color: "from-fuchsia-500 to-violet-500" },
];

const quickActions = [
  { title: "Write an email", url: "/email", icon: Mail },
  { title: "Summarize notes", url: "/meetings", icon: FileText },
  { title: "Plan my day", url: "/tasks", icon: ListChecks },
  { title: "Research topic", url: "/research", icon: Search },
];

const tips = [
  "Batch similar tasks together to enter deep-focus mode faster.",
  "Ask the AI Chatbot to rephrase before sending sensitive messages.",
  "Summarize meeting notes right after the meeting for best recall.",
  "Use the Task Planner every morning to set 3 anchor priorities.",
];

function Dashboard() {
  const [statCounts, setStatCounts] = useState<Record<string, number>>({});
  const [recent, setRecent] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setStatCounts(getStats());
    setRecent(getHistory().slice(0, 5));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <PageHeader
        title="Good to see you"
        description="Your AI workplace productivity assistant is ready."
        icon={<LayoutDashboard className="h-5 w-5" />}
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.key} className="overflow-hidden transition-all hover:shadow-[var(--shadow-elegant)]">
              <CardContent className="p-4">
                <div className={`mb-3 grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br ${s.color} text-white`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="text-2xl font-bold">{statCounts[s.key] ?? 0}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><Sparkles className="h-4 w-4 text-primary" /> Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {recent.length === 0 ? (
              <div className="py-10 text-center text-sm text-muted-foreground">
                No activity yet. Try generating an email or planning your day.
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {recent.map((r) => (
                  <li key={r.id} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">{r.title}</div>
                      <div className="text-xs capitalize text-muted-foreground">{r.type} · {new Date(r.createdAt).toLocaleString()}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Quick Actions</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              {quickActions.map((a) => {
                const Icon = a.icon;
                return (
                  <Button key={a.url} asChild variant="outline" className="justify-start">
                    <Link to={a.url}>
                      <Icon className="h-4 w-4" />
                      <span className="truncate">{a.title}</span>
                    </Link>
                  </Button>
                );
              })}
            </CardContent>
          </Card>

          <Card className="bg-[image:var(--gradient-subtle)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base"><Lightbulb className="h-4 w-4 text-amber-500" /> Productivity Tip</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{tips[new Date().getDay() % tips.length]}</p>
              <Button asChild size="sm" variant="link" className="mt-2 px-0">
                <Link to="/chat">Ask AI for more <ArrowRight className="h-3.5 w-3.5" /></Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-primary" /> Weekly Productivity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={WEEKLY_PRODUCTIVITY} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="tasks" radius={[8, 8, 0, 0]} fill="url(#barGrad)" />
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-primary" /> Feature Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={FEATURE_USAGE}
                    dataKey="value"
                    nameKey="name"
                    cx="40%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={80}
                    paddingAngle={2}
                  >
                    {FEATURE_USAGE.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    formatter={(v: number) => `${v}%`}
                  />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    iconType="circle"
                    wrapperStyle={{ fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
