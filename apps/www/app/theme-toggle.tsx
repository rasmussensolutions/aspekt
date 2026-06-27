"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { Toggle } from "@aspekt/components-source/toggle";
import { useTheme } from "next-themes";
import * as React from "react";

function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const darkMode = mounted && resolvedTheme === "dark";

  React.useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <Toggle
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      className={className}
      color="accent"
      pressed={darkMode}
      prefix={darkMode ? <MoonIcon /> : <SunIcon />}
      shape="round"
      size="small"
      title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      variant="soft"
      onPressedChange={(pressed) => setTheme(pressed ? "dark" : "light")}
    >
      Dark mode
    </Toggle>
  );
}

export { ThemeToggle };
