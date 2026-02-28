"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "java" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg border border-[#D9DBE0] bg-[#1A1A1C] text-[#F1F3F9] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#27272A] bg-[#27272A]">
        <span className="text-xs text-[#A1A1AA] font-mono">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-7 px-2 text-[#A1A1AA] hover:text-[#F1F3F9] hover:bg-[#3F3F46]"
        >
          {copied ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1">
              <Check className="h-3.5 w-3.5 text-[#259D63]" />
              <span className="text-xs text-[#259D63]">Copied</span>
            </motion.div>
          ) : (
            <div className="flex items-center gap-1">
              <Copy className="h-3.5 w-3.5" />
              <span className="text-xs">Copy</span>
            </div>
          )}
        </Button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
