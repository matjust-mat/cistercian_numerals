"use client";

import { Button } from "@heroui/button";
import ThemeToggle from "./themeToggle";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-light-white dark:bg-dark-black">
      <h1 className="text-blue dark:text-light-blue font-bold text-2xl flex justify-center w-full ml-16 italic">Aviadador 2000</h1>
      <div className="flex justify-between items-center gap-5">
        <ThemeToggle />
      </div>
    </header>
  );
}