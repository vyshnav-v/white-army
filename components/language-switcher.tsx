"use client";

import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();

  return (
    <div className="flex items-center gap-1 rounded-md border border-border bg-muted/50 p-1">
      <Button
        variant={locale === "en" ? "secondary" : "ghost"}
        size="sm"
        className="h-8 px-2 text-xs font-medium"
        onClick={() => setLocale("en")}
      >
        EN
      </Button>
      <Button
        variant={locale === "ml" ? "secondary" : "ghost"}
        size="sm"
        className="h-8 px-2 text-xs font-medium"
        onClick={() => setLocale("ml")}
      >
        മലയാളം
      </Button>
    </div>
  );
}
