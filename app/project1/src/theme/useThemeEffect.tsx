"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function useThemeEffect() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Ensure Bootstrap's theme is set before rendering
    const appliedTheme = theme === "system" ? resolvedTheme : theme;
    document.documentElement.setAttribute("data-bs-theme", appliedTheme || "light");
  }, [theme, resolvedTheme]);

  return mounted;
}