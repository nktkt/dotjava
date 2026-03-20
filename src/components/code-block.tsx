"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { Check, Copy, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "java" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const el = preRef.current;
    if (!el) return;

    const checkScroll = () => {
      const scrollable = el.scrollWidth > el.clientWidth;
      setIsScrollable(scrollable);
      setIsScrolledToEnd(
        scrollable && el.scrollLeft + el.clientWidth >= el.scrollWidth - 2
      );
    };

    checkScroll();

    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(el);
    el.addEventListener("scroll", checkScroll, { passive: true });

    return () => {
      resizeObserver.disconnect();
      el.removeEventListener("scroll", checkScroll);
    };
  }, [code]);

  return (
    <div className="relative group rounded-lg border border-[#D9DBE0] bg-[#1A1A1C] text-[#F1F3F9] overflow-hidden">
      {/* Header with language label and action buttons */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-[#27272A] bg-[#27272A]">
        <span className="text-xs text-[#A1A1AA] font-mono">{language}</span>
        <div className="flex items-center gap-1">
          {language === "java" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const encoded = encodeURIComponent(code);
                window.open(`https://www.jdoodle.com/online-java-compiler?stdin=&arg=&rargs=&code=${encoded}`, "_blank");
              }}
              className="h-7 px-2 text-[#A1A1AA] hover:text-[#4ADE80] hover:bg-[#3F3F46] shrink-0"
            >
              <div className="flex items-center gap-1">
                <Play className="h-3.5 w-3.5" />
                <span className="text-xs">Run</span>
              </div>
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-7 px-2 text-[#A1A1AA] hover:text-[#F1F3F9] hover:bg-[#3F3F46] shrink-0"
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
      </div>

      {/* Code area with scroll handling */}
      <div className="relative">
        <pre
          ref={preRef}
          className="overflow-x-auto p-3 sm:p-4 text-xs sm:text-sm leading-relaxed scrollbar-thin"
        >
          <code>{code}</code>
        </pre>

        {/* Scroll fade indicator on the right edge */}
        {isScrollable && !isScrolledToEnd && (
          <div
            className="absolute top-0 right-0 bottom-0 w-8 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, transparent, #1A1A1C)",
            }}
          />
        )}
      </div>
    </div>
  );
}
