"use client";

import { useMemo, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, FileText, Bug, BookOpen, GitPullRequest, GitBranch, Coffee, Layers, Puzzle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { interviewQuestions } from "@/data/interview";
import { javaErrors } from "@/data/java-errors";
import { docsChapters } from "@/data/java-docs";
import { githubPRChapters } from "@/data/github-pr";
import { githubChapters } from "@/data/github";
import { javaVersions } from "@/data/java-versions";
import { javaTopics } from "@/data/java-topics";
import { designPatterns } from "@/data/design-patterns";

interface SearchResult {
  title: string;
  description: string;
  href: string;
  section: string;
  sectionIcon: React.ReactNode;
  sectionColor: string;
}

function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-[var(--color-dads-blue-light)] text-[var(--color-dads-blue)] rounded-sm px-0.5 font-semibold">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

function truncateAround(text: string, query: string, maxLen: number = 120): string {
  if (text.length <= maxLen) return text;
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const idx = lowerText.indexOf(lowerQuery);
  if (idx === -1) return text.slice(0, maxLen) + "...";
  const start = Math.max(0, idx - 40);
  const end = Math.min(text.length, idx + query.length + 80);
  let result = text.slice(start, end);
  if (start > 0) result = "..." + result;
  if (end < text.length) result = result + "...";
  return result;
}

export default function SearchClientPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const query = searchParams.get("q") ?? "";

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInput = (value: string) => {
    const params = new URLSearchParams();
    if (value) params.set("q", value);
    router.replace(`/search${value ? `?${params.toString()}` : ""}`, { scroll: false });
  };

  const clearSearch = () => {
    handleInput("");
    inputRef.current?.focus();
  };

  const results = useMemo<SearchResult[]>(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const matches: SearchResult[] = [];

    // Interview Questions
    for (const item of interviewQuestions) {
      if (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
      ) {
        matches.push({
          title: item.question,
          description: truncateAround(item.answer, q),
          href: "/interview",
          section: "面接質問",
          sectionIcon: <FileText className="h-4 w-4" />,
          sectionColor: "var(--color-dads-blue)",
        });
      }
    }

    // Java Errors
    for (const item of javaErrors) {
      if (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.cause.toLowerCase().includes(q)
      ) {
        matches.push({
          title: item.title,
          description: truncateAround(item.description || item.cause, q),
          href: "/errors",
          section: "エラー集",
          sectionIcon: <Bug className="h-4 w-4" />,
          sectionColor: "var(--color-dads-error)",
        });
      }
    }

    // Docs Chapters
    for (const item of docsChapters) {
      if (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      ) {
        matches.push({
          title: item.title,
          description: truncateAround(item.description, q),
          href: `/docs/${item.id}`,
          section: "APIリファレンス",
          sectionIcon: <BookOpen className="h-4 w-4" />,
          sectionColor: "var(--color-dads-purple)",
        });
      }
    }

    // GitHub PR Chapters
    for (const item of githubPRChapters) {
      if (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      ) {
        matches.push({
          title: item.title,
          description: truncateAround(item.description, q),
          href: `/github-pr/${item.id}`,
          section: "GitHub PR",
          sectionIcon: <GitPullRequest className="h-4 w-4" />,
          sectionColor: "var(--color-dads-success)",
        });
      }
    }

    // GitHub Chapters
    for (const item of githubChapters) {
      if (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      ) {
        matches.push({
          title: item.title,
          description: truncateAround(item.description, q),
          href: `/github/${item.id}`,
          section: "GitHub",
          sectionIcon: <GitBranch className="h-4 w-4" />,
          sectionColor: "var(--color-dads-success)",
        });
      }
    }

    // Java Versions
    for (const item of javaVersions) {
      const versionStr = `Java ${item.version}`;
      if (
        versionStr.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q)
      ) {
        matches.push({
          title: `${item.name} (Java ${item.version})`,
          description: truncateAround(item.summary, q),
          href: `/version/${item.id}`,
          section: "Javaバージョン",
          sectionIcon: <Coffee className="h-4 w-4" />,
          sectionColor: item.color,
        });
      }
    }

    // Java Topics
    for (const item of javaTopics) {
      if (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      ) {
        matches.push({
          title: item.title,
          description: truncateAround(item.description, q),
          href: `/topic/${item.id}`,
          section: "トピック",
          sectionIcon: <Layers className="h-4 w-4" />,
          sectionColor: "var(--color-dads-blue)",
        });
      }
    }

    // Design Patterns
    for (const item of designPatterns) {
      if (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      ) {
        matches.push({
          title: item.title,
          description: truncateAround(item.description, q),
          href: `/patterns/${item.id}`,
          section: "デザインパターン",
          sectionIcon: <Puzzle className="h-4 w-4" />,
          sectionColor: "var(--color-dads-warning)",
        });
      }
    }

    return matches;
  }, [query]);

  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};
    for (const result of results) {
      if (!groups[result.section]) groups[result.section] = [];
      groups[result.section].push(result);
    }
    return groups;
  }, [results]);

  const sectionOrder = [
    "面接質問",
    "エラー集",
    "APIリファレンス",
    "GitHub PR",
    "GitHub",
    "Javaバージョン",
    "トピック",
    "デザインパターン",
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 mb-4">
          <Search className="h-8 w-8 text-[var(--color-dads-blue)]" />
          <h1 className="text-3xl md:text-4xl font-bold">
            サイト内<span className="text-[var(--color-dads-blue)]">検索</span>
          </h1>
        </div>
        <p className="text-muted-foreground">
          面接質問、エラー集、APIリファレンス、バージョン情報などを横断検索
        </p>
      </motion.div>

      {/* Search Input */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative mb-8"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleInput(e.target.value)}
          placeholder="キーワードを入力して検索..."
          className="w-full rounded-xl border border-border bg-background pl-12 pr-12 py-4 text-lg shadow-sm outline-none transition-all focus:border-[var(--color-dads-blue)] focus:ring-2 focus:ring-[var(--color-dads-blue)]/20 placeholder:text-muted-foreground/60"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="検索をクリア"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </motion.div>

      {/* Result Count */}
      {query.trim() && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-sm text-muted-foreground"
        >
          <span className="font-semibold text-foreground">{results.length}</span> 件の検索結果
          {results.length > 0 && (
            <span className="ml-1">
              ({Object.keys(groupedResults).length} カテゴリ)
            </span>
          )}
        </motion.div>
      )}

      {/* Empty State - No Query */}
      {!query.trim() && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center py-16"
        >
          <Search className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">
            検索キーワードを入力してください
          </p>
          <p className="text-muted-foreground/60 text-sm mt-2">
            例: NullPointerException、Stream API、Singleton、面接
          </p>
        </motion.div>
      )}

      {/* No Results */}
      {query.trim() && results.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <Search className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">
            「{query}」に一致する結果が見つかりませんでした
          </p>
          <p className="text-muted-foreground/60 text-sm mt-2">
            別のキーワードで検索してみてください
          </p>
        </motion.div>
      )}

      {/* Grouped Results */}
      <AnimatePresence mode="wait">
        {query.trim() && results.length > 0 && (
          <motion.div
            key={query}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {sectionOrder
              .filter((section) => groupedResults[section])
              .map((section, sectionIndex) => {
                const items = groupedResults[section];
                const firstItem = items[0];
                return (
                  <motion.div
                    key={section}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: sectionIndex * 0.05 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="flex items-center justify-center h-7 w-7 rounded-lg"
                        style={{
                          backgroundColor: `color-mix(in srgb, ${firstItem.sectionColor} 15%, transparent)`,
                          color: firstItem.sectionColor,
                        }}
                      >
                        {firstItem.sectionIcon}
                      </span>
                      <h2 className="text-lg font-bold">{section}</h2>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                        {items.length}
                      </span>
                    </div>
                    <div className="grid gap-2">
                      {items.map((result, i) => (
                        <Link key={`${result.href}-${i}`} href={result.href}>
                          <Card className="py-0 hover:border-[var(--color-dads-blue)]/40 hover:shadow-md transition-all duration-200 group cursor-pointer">
                            <CardContent className="px-4 py-3">
                              <div className="font-medium text-sm group-hover:text-[var(--color-dads-blue)] transition-colors">
                                {highlightText(result.title, query)}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                                {highlightText(result.description, query)}
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
