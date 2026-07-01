// Pre-generated mock content for the AI Workplace Productivity Assistant.
// All "AI" responses in the app are simulated locally — no backend calls.

export const DEFAULT_STATS: Record<string, number> = {
  email: 248,
  meeting: 84,
  task: 96,
  research: 58,
  chat: 173,
};

export interface MockActivity {
  id: string;
  type: "email" | "meeting" | "task" | "research" | "chat";
  title: string;
  content: string;
  createdAt: number;
}

const now = Date.now();
const H = 60 * 60 * 1000;

export const DEFAULT_ACTIVITY: MockActivity[] = [
  { id: "a1", type: "email", title: "Generated a formal email to HR", content: "", createdAt: now - 1 * H },
  { id: "a2", type: "meeting", title: "Summarized weekly team meeting", content: "", createdAt: now - 3 * H },
  { id: "a3", type: "task", title: "Created Monday work schedule", content: "", createdAt: now - 6 * H },
  { id: "a4", type: "research", title: "Researched Artificial Intelligence in Healthcare", content: "", createdAt: now - 22 * H },
  { id: "a5", type: "chat", title: "Chat conversation about project planning", content: "", createdAt: now - 30 * H },
];

export const WEEKLY_PRODUCTIVITY = [
  { day: "Mon", tasks: 8 },
  { day: "Tue", tasks: 10 },
  { day: "Wed", tasks: 6 },
  { day: "Thu", tasks: 12 },
  { day: "Fri", tasks: 9 },
];

export const FEATURE_USAGE = [
  { name: "Email Generator", value: 35, color: "#6366f1" },
  { name: "Task Planner", value: 25, color: "#8b5cf6" },
  { name: "Research Assistant", value: 20, color: "#ec4899" },
  { name: "Meeting Summary", value: 12, color: "#14b8a6" },
  { name: "AI Chat", value: 8, color: "#f59e0b" },
];

// Simulate "AI thinking" delay (1–2s).
export function mockDelay<T>(value: T): Promise<T> {
  const ms = 1000 + Math.floor(Math.random() * 1000);
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

// ─── Feature defaults ──────────────────────────────────────────────

export const EMAIL_DEFAULTS = {
  recipient: "Sarah Johnson",
  subject: "Project Status Update",
  purpose: "Provide an update on project progress.",
  tone: "Professional",
  points:
    "Completed UI design, backend 70% complete, testing starts next Monday.",
};

export function mockEmail(input: {
  recipient: string;
  subject: string;
  purpose: string;
  tone: string;
  points: string;
}): string {
  const name = (input.recipient || "there").split(" ")[0];
  return `Subject: ${input.subject || "Project Status Update"}

Hi ${name},

I wanted to share a quick update on where things stand with the project.

The UI design phase is now complete and the team is happy with the direction. On the backend side we're roughly 70% done — the remaining work is focused on integrations and performance tuning. We're on track to begin the testing phase next Monday, and I'll circulate the QA plan later this week so everyone knows what to expect.

Key highlights:
• UI design — complete and signed off
• Backend development — approximately 70% complete
• Testing — kicks off next Monday

Please let me know if you'd like a deeper walkthrough of any specific area, or if there's anything you'd like me to flag with the wider stakeholders. Happy to jump on a quick call as well.

Thanks for your continued support.

Best regards,
Alex`;
}

// ─── Meeting notes ────────────────────────────────────────────────

export const MEETING_DEFAULT_NOTES = `Weekly Team Meeting

Discussed project milestones.
Frontend completed.
Backend 70% complete.
Testing begins next Monday.
Marketing campaign launches next month.
John will prepare documentation.
Sarah will coordinate testing.`;

export const MEETING_MOCK_SUMMARY = `## Summary
The team reviewed project milestones during the weekly sync. The frontend is fully complete, backend development is progressing well at roughly 70%, and QA is scheduled to begin next Monday. Marketing plans to launch the campaign next month.

## Key Decisions
- Testing phase will start next Monday.
- Marketing campaign is confirmed for next month.
- Documentation will be owned by John.
- Testing coordination will be owned by Sarah.

## Action Items
- **John** — Prepare project documentation.
- **Sarah** — Coordinate testing with QA.
- **Backend team** — Complete the remaining 30% of backend work.
- **Marketing** — Finalize campaign creative ahead of launch.

## Deadlines
- Backend completion: before next Monday.
- Testing kick-off: next Monday.
- Marketing campaign launch: next month.

## Participants
- John (Documentation lead)
- Sarah (Testing coordinator)
- Frontend, backend and marketing team members`;

// ─── Task planner ────────────────────────────────────────────────

export const TASK_DEFAULTS = {
  goals: `Finish dashboard UI
Review pull requests
Team meeting
Respond to client emails
Prepare presentation`,
  deadlines: "All by end of day Friday",
  priority: "High",
  hours: "08:00 – 17:00",
};

export const TASK_MOCK_PLAN = `## Daily Schedule
| Time | Task | Priority |
| --- | --- | --- |
| 08:00 – 09:00 | Respond to client emails | High |
| 09:00 – 11:00 | Finish dashboard UI | High |
| 11:00 – 12:00 | Review pull requests | Medium |
| 12:00 – 13:00 | Lunch & recharge | — |
| 13:00 – 14:00 | Team meeting | High |
| 14:00 – 16:00 | Prepare presentation | High |
| 16:00 – 17:00 | Wrap-up, notes & tomorrow's plan | Low |

## Weekly Overview
- **Mon** — Dashboard UI polish, client email triage.
- **Tue** — PR reviews, backend sync.
- **Wed** — Presentation deep-work.
- **Thu** — Team meeting, stakeholder update.
- **Fri** — Buffer + wrap-up.

## Priority Order
1. Respond to client emails (blocking others)
2. Finish dashboard UI
3. Team meeting
4. Prepare presentation
5. Review pull requests

## Estimated Completion Times
- Finish dashboard UI — 2h
- Review pull requests — 1h
- Team meeting — 1h
- Respond to client emails — 1h
- Prepare presentation — 2h`;

// ─── Research assistant ─────────────────────────────────────────────

export const RESEARCH_DEFAULTS = {
  topic: "Artificial Intelligence in Healthcare",
  context: "",
  depth: "Detailed",
};

export const RESEARCH_MOCK = `## Overview
Artificial Intelligence (AI) in healthcare refers to the use of machine learning, natural language processing and computer vision to support clinical decision-making, streamline operations and personalize patient care. Adoption has accelerated across diagnostics, drug discovery, hospital operations and patient engagement.

## Key Concepts
- **Clinical decision support** — AI models help clinicians interpret imaging, lab results and patient histories.
- **Predictive analytics** — Models forecast readmission risk, sepsis onset and disease progression.
- **Natural language processing** — Extracts structured data from clinical notes and medical literature.
- **Generative AI** — Drafts documentation, summarizes charts and supports patient-facing assistants.

## Benefits
- Earlier and more accurate diagnosis (e.g. radiology, pathology, ophthalmology).
- Reduced administrative burden for clinicians through automated documentation.
- Personalized treatment plans based on genomics and patient history.
- Faster drug discovery and clinical trial matching.
- Improved access to care via AI-powered triage and virtual assistants.

## Challenges
- **Data privacy & security** — protecting sensitive patient information (HIPAA, GDPR).
- **Bias & fairness** — models can underperform for underrepresented populations.
- **Regulatory approval** — evolving frameworks for AI-based medical devices.
- **Clinical integration** — workflow fit and clinician trust remain barriers.
- **Explainability** — black-box models are hard to justify in life-critical settings.

## Recommendations
1. Start with narrow, high-value use cases (e.g. imaging triage, documentation).
2. Invest in high-quality, representative training data and rigorous validation.
3. Keep clinicians in the loop — AI should assist, not replace, expert judgment.
4. Build strong governance around privacy, bias monitoring and model updates.
5. Partner with regulators early to align on evidence requirements.

## Conclusion
AI has moved from pilot projects to real clinical impact, but the winning organizations are those that treat it as a socio-technical change — investing equally in data infrastructure, clinician workflows and responsible AI governance.

## Sources
*Indicative references — please verify before citing:*
- World Health Organization — "Ethics and governance of AI for health"
- Nature Medicine — reviews on clinical AI validation
- FDA — Artificial Intelligence / Machine Learning-based Software as a Medical Device`;

// ─── Chat ────────────────────────────────────────────────────────

export interface ChatMsg {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export const CHAT_DEFAULT_MESSAGES: ChatMsg[] = [
  {
    id: "c1",
    role: "user",
    content: "Help me write a professional email requesting leave.",
  },
  {
    id: "c2",
    role: "assistant",
    content: `Certainly! Here's a professional leave request email you can adapt:

**Subject:** Leave Request — [Your Name]

Dear [Manager's Name],

I hope you are doing well. I would like to formally request leave from **[start date]** to **[end date]**, returning to work on **[return date]**.

During my absence, I will ensure that all ongoing tasks are handed over and that key stakeholders know who to contact. I'm happy to prepare a short handover document ahead of my leave.

Please let me know if you need any additional information or would like to discuss.

Thank you for considering my request.

Best regards,
[Your Name]`,
  },
  {
    id: "c3",
    role: "user",
    content: "Can you make it friendlier?",
  },
  {
    id: "c4",
    role: "assistant",
    content: `Of course! Here's a warmer version:

**Subject:** Quick leave request

Hi [Manager's Name],

Hope you're having a good week! I wanted to check in about taking some time off from **[start date]** to **[end date]** — I'd be back at my desk on **[return date]**.

I'll make sure everything is in good shape before I go: I'll wrap up my open tasks, brief the team on anything in-flight, and leave a short handover note so nothing slips through the cracks.

Let me know if that works for you, or if you'd like me to adjust the dates. Really appreciate it!

Thanks so much,
[Your Name]`,
  },
];

export const CHAT_SUGGESTED = [
  "Write a project update email",
  "Summarize meeting notes",
  "Create today's work schedule",
  "Explain cloud computing",
  "Improve my resume",
];

export function mockChatReply(userText: string): string {
  const t = userText.toLowerCase();
  if (t.includes("email")) {
    return `Sure! Here's a draft you can adapt:

**Subject:** Project update — this week

Hi team,

Quick update on where we are: the frontend work is wrapped up, the backend is roughly 70% complete, and QA is kicking off on Monday. I'll share the detailed test plan later this week.

Let me know if you'd like a deeper walkthrough on any part.

Thanks,
[Your Name]`;
  }
  if (t.includes("meeting") || t.includes("summar")) {
    return `Here's a structured summary you can drop into your notes:

- **Summary:** Reviewed milestones — frontend done, backend at 70%, QA starts Monday.
- **Decisions:** Testing to begin next week; marketing launch confirmed for next month.
- **Action items:** John → documentation, Sarah → testing coordination.
- **Deadlines:** Backend wrap-up by Monday; campaign launch next month.`;
  }
  if (t.includes("schedule") || t.includes("today") || t.includes("plan")) {
    return `Here's a suggested schedule for today:

- **08:00 – 09:00** — Inbox triage & client responses
- **09:00 – 11:00** — Deep work on your top priority
- **11:00 – 12:00** — Code / doc review
- **12:00 – 13:00** — Lunch
- **13:00 – 14:00** — Team sync
- **14:00 – 16:00** — Presentation prep
- **16:00 – 17:00** — Wrap-up & tomorrow's plan`;
  }
  if (t.includes("cloud")) {
    return `**Cloud computing** is the on-demand delivery of computing resources — servers, storage, databases, networking, software — over the internet.

Instead of owning and maintaining physical infrastructure, you rent capacity from a provider (AWS, Azure, Google Cloud) and pay only for what you use. Common models:

- **IaaS** — raw infrastructure (VMs, storage).
- **PaaS** — managed platforms for building apps.
- **SaaS** — ready-to-use software delivered over the web.

The main benefits are elasticity, lower upfront cost, and faster time-to-market.`;
  }
  if (t.includes("resume") || t.includes("cv")) {
    return `A few quick wins to strengthen your resume:

1. Lead each bullet with a **strong verb** and a **measurable result**.
2. Tailor the top third to the target role — recruiters skim the first 6 seconds.
3. Cut anything older than ~10 years unless it's directly relevant.
4. Replace responsibilities with outcomes (e.g. "reduced load time by 40%").
5. Keep formatting simple so ATS systems parse it cleanly.

Want me to review a specific section?`;
  }
  return `Great question! Here's a concise take:

"${userText.trim()}" is a good area to think about. In a workplace setting I'd typically break it down into: (1) what outcome you want, (2) what constraints you're working with, and (3) who else needs to be involved.

If you share a bit more context I can turn this into an email, a plan, or a research brief for you.`;
}
