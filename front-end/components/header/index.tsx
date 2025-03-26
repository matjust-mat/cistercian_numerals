"use client";

import { Button } from "@heroui/button";
import ThemeToggle from "./themeToggle";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-light-white dark:bg-dark-black">
      <h1 className="text-blue dark:text-light-blue">V-KeyBoard</h1>
      <h2 className="font-bold">USERNAME</h2>
      <div className="flex justify-between items-center gap-5">
        <Button
          size="sm"
          radius="lg"
          color="danger"
          variant="flat"
          onPress={()=>alert("Logged out!")}
          className="font-medium"
        >
          Log out
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}