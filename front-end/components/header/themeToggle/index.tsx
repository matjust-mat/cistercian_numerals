"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "lucide-react"; // Or any other icon library

export default function ThemeToggle() {
  const {setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('color-scheme', 'dark');
    }
    setMounted(true);
  }, []);
  

  if (!mounted) return null; // Prevents hydration mismatch

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full bg-tint-gray dark:bg-shade-black transition"
    >
      {resolvedTheme === "dark" ? <SunIcon size={20} /> : <MoonIcon size={20} />}
    </button>
  );
}
