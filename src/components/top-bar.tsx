import { Bell, Moon, Search, Sun } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "@/components/theme-provider";

export function TopBar() {
  const { theme, toggle } = useTheme();
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-border bg-background/70 px-3 backdrop-blur-xl sm:gap-3 sm:px-4">
      <SidebarTrigger />
      <div className="relative hidden flex-1 max-w-md md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search workspace..." className="pl-9 bg-muted/50 border-transparent focus-visible:bg-background" />
      </div>
      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggle}>
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-[image:var(--gradient-primary)] text-primary-foreground text-xs font-semibold">AI</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}