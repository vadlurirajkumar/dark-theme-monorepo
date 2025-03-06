"use client";

import { ThemeProvider } from "next-themes";
import ThemeSwitcher from "@/theme/ThemeSwitcher";
import useThemeEffect from "@/theme/useThemeEffect";

export default function ThemeClientProvider({ children }: { children: React.ReactNode }) {
  const mounted = useThemeEffect(); // Wait until theme is applied

  if (!mounted) {
    return <></>; // Prevent flicker by not rendering until theme is applied
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <ThemeSwitcher />
    </ThemeProvider>
  );
}