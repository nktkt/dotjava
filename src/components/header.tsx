"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Coffee, Menu } from "lucide-react";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const navLinks = [
  { href: "/", label: "ホーム" },
  { href: "/#versions", label: "バージョン別" },
  { href: "/#topics", label: "トピック別" },
  { href: "/io", label: "入出力" },
  { href: "/web", label: "Web開発" },
  { href: "/excel", label: "Excel" },
  { href: "/oracle", label: "Oracle" },
  { href: "/glossary", label: "用語集" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 border-b border-[#D9DBE0] bg-white/90 backdrop-blur-md"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Coffee className="h-6 w-6 text-[var(--color-dads-blue)]" />
          <span className="text-lg font-bold tracking-tight">
            Java<span className="text-[var(--color-dads-blue)]">学習</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-[#626264] rounded-lg hover:text-[var(--color-dads-blue)] hover:bg-[var(--color-dads-blue-light)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://x.com/naokitakata"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 p-2 text-[#626264] rounded-lg hover:text-[var(--color-dads-blue)] hover:bg-[var(--color-dads-blue-light)] transition-colors"
          >
            <XIcon className="h-4 w-4" />
          </a>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="hover:bg-[var(--color-dads-blue-light)]">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="sr-only">ナビゲーション</SheetTitle>
            <div className="flex flex-col gap-1 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium px-4 py-3 rounded-lg hover:text-[var(--color-dads-blue)] hover:bg-[var(--color-dads-blue-light)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://x.com/naokitakata"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-base font-medium px-4 py-3 rounded-lg hover:text-[var(--color-dads-blue)] hover:bg-[var(--color-dads-blue-light)] transition-colors"
              >
                <XIcon className="h-4 w-4" />
                X
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
