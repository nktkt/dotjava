"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Coffee, Menu, Sun, Moon, ChevronDown } from "lucide-react";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const navGroups = [
  {
    label: "Java学習",
    items: [
      { href: "/#versions", label: "バージョン別" },
      { href: "/#topics", label: "トピック別" },
    ],
  },
  {
    label: "実践ガイド",
    items: [
      { href: "/io", label: "入出力" },
      { href: "/web", label: "Web開発" },
      { href: "/excel", label: "Excel" },
      { href: "/oracle", label: "Oracle" },
      { href: "/security", label: "セキュリティ" },
      { href: "/eclipse-ide", label: "Eclipse" },
      { href: "/algorithm", label: "アルゴリズム" },
      { href: "/javascript", label: "JavaScript" },
      { href: "/html", label: "HTML" },
      { href: "/htmx", label: "HTMX" },
      { href: "/css", label: "CSS" },
      { href: "/bootstrap", label: "Bootstrap" },
      { href: "/postgresql", label: "PostgreSQL" },
      { href: "/aws", label: "AWS" },
      { href: "/java-cert", label: "Java資格" },
      { href: "/oracle-cert", label: "Oracle資格" },
      { href: "/c-lang", label: "C言語" },
      { href: "/cpp-lang", label: "C++" },
    ],
  },
  {
    label: "学習ツール",
    items: [
      { href: "/glossary", label: "用語集" },
      { href: "/patterns", label: "デザインパターン" },
      { href: "/errors", label: "エラー集" },
      { href: "/interview", label: "面接対策" },
      { href: "/quiz", label: "クイズ" },
    ],
  },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const toggleMobileGroup = (label: string) => {
    setMobileExpanded((prev) => (prev === label ? null : label));
  };

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Coffee className="h-6 w-6 text-[var(--color-dads-blue)]" />
          <span className="text-lg font-bold tracking-tight">
            Java<span className="text-[var(--color-dads-blue)]">学習</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className="px-3 py-2 text-sm font-medium text-muted-foreground rounded-lg hover:text-[var(--color-dads-blue)] hover:bg-[var(--color-dads-blue-light)] transition-colors"
          >
            ホーム
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              {navGroups.map((group) => (
                <NavigationMenuItem key={group.label}>
                  <NavigationMenuTrigger className="px-3 py-2 text-sm font-medium text-muted-foreground bg-transparent hover:text-[var(--color-dads-blue)] hover:bg-[var(--color-dads-blue-light)] data-[state=open]:bg-[var(--color-dads-blue-light)] data-[state=open]:text-[var(--color-dads-blue)]">
                    {group.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-48 gap-1 p-2">
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              className="block select-none rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-[var(--color-dads-blue)] hover:bg-[var(--color-dads-blue-light)] transition-colors"
                            >
                              {item.label}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <a
            href="https://x.com/naokitakata"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 p-2 text-muted-foreground rounded-lg hover:text-[var(--color-dads-blue)] hover:bg-[var(--color-dads-blue-light)] transition-colors"
          >
            <XIcon className="h-4 w-4" />
          </a>
          <button
            onClick={toggleTheme}
            className="ml-1 p-2 text-muted-foreground rounded-lg hover:text-[var(--color-dads-blue)] hover:bg-[var(--color-dads-blue-light)] transition-colors"
            aria-label="テーマ切替"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-1 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 text-muted-foreground rounded-lg hover:text-[var(--color-dads-blue)] hover:bg-[var(--color-dads-blue-light)] transition-colors"
            aria-label="テーマ切替"
          >
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-[var(--color-dads-blue-light)]">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">ナビゲーション</SheetTitle>
              <div className="flex flex-col gap-1 mt-8 overflow-y-auto max-h-[calc(100vh-6rem)]">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="text-base font-medium px-4 py-3 rounded-lg hover:text-[var(--color-dads-blue)] hover:bg-[var(--color-dads-blue-light)] transition-colors"
                >
                  ホーム
                </Link>

                {navGroups.map((group) => (
                  <div key={group.label}>
                    <button
                      onClick={() => toggleMobileGroup(group.label)}
                      className="flex items-center justify-between w-full text-base font-medium px-4 py-3 rounded-lg hover:text-[var(--color-dads-blue)] hover:bg-[var(--color-dads-blue-light)] transition-colors"
                    >
                      {group.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          mobileExpanded === group.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {mobileExpanded === group.label && (
                      <div className="ml-4 flex flex-col gap-0.5">
                        {group.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="text-sm font-medium px-4 py-2.5 rounded-lg text-muted-foreground hover:text-[var(--color-dads-blue)] hover:bg-[var(--color-dads-blue-light)] transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <a
                  href="https://x.com/naokitakata"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center px-4 py-3 rounded-lg text-muted-foreground hover:text-[var(--color-dads-blue)] hover:bg-[var(--color-dads-blue-light)] transition-colors"
                  aria-label="X"
                >
                  <XIcon className="h-4 w-4" />
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
