"use client";

import { FinnTheHumanIcon } from "@phosphor-icons/react";
import { ThemeToggle } from "./theme-toggle";

export function NavigationBar({ shouldShow = true }: { shouldShow: boolean }) {
  if (shouldShow) {
      return (
    <nav className="w-full h-15 p-5 flex items-center">
      <div className="flex container mx-auto items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <FinnTheHumanIcon size={40} />
          <h1 className="text-2xl font-medium">MoodleCraft</h1>
        </div>
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
  } else {
    <></>
  }
}
