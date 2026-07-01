import type { ReactNode } from "react";

export function PageHeader({ title, description, icon }: { title: string; description?: string; icon?: ReactNode }) {
  return (
    <div className="mb-6 flex items-start gap-3">
      {icon && (
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-elegant)]">
          {icon}
        </div>
      )}
      <div className="min-w-0">
        <h1 className="truncate text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
    </div>
  );
}