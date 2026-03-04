"use client";

import { MessageCircle } from "lucide-react";

export function GrokButton() {
  return (
    <a
      href="https://grok.com"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl dark:bg-white dark:text-black"
      aria-label="Grokに聞く"
    >
      <MessageCircle className="h-5 w-5" />
      <span>Grokに聞く</span>
    </a>
  );
}
