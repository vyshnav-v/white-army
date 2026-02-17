"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="w-9 h-9 rounded-full hover:bg-primary/15 hover:scale-110 hover:ring-2 hover:ring-primary/30 transition-all duration-200"
      >
        <Sun className="h-5 w-5 text-foreground" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="group w-9 h-9 rounded-full hover:bg-primary/15 hover:scale-110 hover:ring-2 hover:ring-primary/30 active:scale-95 transition-all duration-200"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-foreground transition-transform duration-200 group-hover:rotate-12" />
      ) : (
        <Moon className="h-5 w-5 text-foreground transition-transform duration-200 group-hover:rotate-12" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
