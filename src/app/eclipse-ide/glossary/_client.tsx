"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { eclipseGlossaryTerms, eclipseGlossaryCategories } from "@/data/eclipse-glossary";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, Code, Link2 } from "lucide-react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function EclipseGlossaryClientPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredTerms = useMemo(() => {
    return eclipseGlossaryTerms.filter((term) => {
      const matchesSearch =
        search === "" ||
        term.term.toLowerCase().includes(search.toLowerCase()) ||
        term.reading?.toLowerCase().includes(search.toLowerCase()) ||
        term.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        activeCategory === "all" || term.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const groupedTerms = useMemo(() => {
    const groups: Record<string, typeof filteredTerms> = {};
    for (const term of filteredTerms) {
      const initial = term.term.charAt(0).toUpperCase();
      if (!groups[initial]) groups[initial] = [];
      groups[initial].push(term);
    }
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredTerms]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/eclipse-ide"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-[var(--color-dads-purple)] transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Eclipse IDE ガイドに戻る
        </Link>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 mb-4">
          <Code className="h-8 w-8 text-[var(--color-dads-purple)]" />
          <h1 className="text-3xl md:text-4xl font-bold">Eclipse IDE 用語集</h1>
        </div>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Eclipse IDE に関する重要な用語を網羅的に解説。
          検索やカテゴリフィルターで素早く見つけられます。
        </p>
        <div className="mt-2 text-sm text-muted-foreground">
          全 {eclipseGlossaryTerms.length} 用語収録
        </div>
      </motion.div>

      {/* Search & Filter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-8 space-y-4"
      >
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="用語を検索... (例: ブレークポイント、パースペクティブ、EGit)"
            className="w-full h-11 pl-10 pr-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-dads-purple)]/30 focus:border-[var(--color-dads-purple)] transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-[var(--color-dads-purple)]"
            >
              クリア
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-[var(--color-dads-purple)] text-white"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            全て ({eclipseGlossaryTerms.length})
          </button>
          {eclipseGlossaryCategories.map((cat) => {
            const count = eclipseGlossaryTerms.filter(
              (t) => t.category === cat.id
            ).length;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? "text-white"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
                style={
                  activeCategory === cat.id
                    ? { backgroundColor: cat.color }
                    : undefined
                }
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Results Count */}
      {(search || activeCategory !== "all") && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-6 text-sm text-muted-foreground"
        >
          {filteredTerms.length} 件の用語が見つかりました
        </motion.div>
      )}

      {/* Terms List */}
      {filteredTerms.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 text-muted-foreground"
        >
          <Code className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg">一致する用語が見つかりません</p>
          <p className="text-sm mt-1">検索キーワードやカテゴリを変更してください</p>
        </motion.div>
      ) : (
        <div className="space-y-8">
          {groupedTerms.map(([initial, terms]) => (
            <motion.div
              key={initial}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true, margin: "-30px" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl font-bold text-[var(--color-dads-purple)] w-10 text-center">
                  {initial}
                </span>
                <div className="h-px flex-1 bg-[#D9DBE0]" />
                <span className="text-xs text-muted-foreground">
                  {terms.length}件
                </span>
              </div>

              <Accordion type="multiple" className="space-y-2">
                {terms.map((term) => {
                  const category = eclipseGlossaryCategories.find(
                    (c) => c.id === term.category
                  );
                  return (
                    <AccordionItem
                      key={term.term}
                      value={term.term}
                      className="border border-border rounded-lg px-4 data-[state=open]:bg-muted"
                    >
                      <AccordionTrigger className="hover:no-underline py-3">
                        <div className="flex items-center gap-3 text-left">
                          <span className="font-semibold text-base">
                            {term.term}
                          </span>
                          {term.reading && term.reading !== term.term && (
                            <span className="text-xs text-muted-foreground hidden sm:inline">
                              ({term.reading})
                            </span>
                          )}
                          <Badge
                            variant="outline"
                            className="text-xs shrink-0"
                            style={{
                              borderColor: category?.color,
                              color: category?.color,
                            }}
                          >
                            {category?.name}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4">
                        <div className="pl-0 space-y-3">
                          <p className="text-sm leading-relaxed text-foreground">
                            {term.description}
                          </p>

                          {term.code && <CodeBlock code={term.code} />}

                          {term.related && term.related.length > 0 && (
                            <div className="flex items-center gap-2 flex-wrap">
                              <Link2 className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                              <span className="text-xs text-muted-foreground">
                                関連:
                              </span>
                              {term.related.map((rel) => {
                                const exists = eclipseGlossaryTerms.some(
                                  (t) => t.term === rel
                                );
                                return (
                                  <Badge
                                    key={rel}
                                    variant="outline"
                                    className={`text-xs cursor-default ${
                                      exists
                                        ? "hover:bg-[var(--color-dads-blue-light)] hover:border-[var(--color-dads-purple)]"
                                        : ""
                                    }`}
                                    onClick={() => {
                                      if (exists) {
                                        setSearch(rel);
                                        setActiveCategory("all");
                                        window.scrollTo({
                                          top: 0,
                                          behavior: "smooth",
                                        });
                                      }
                                    }}
                                    style={exists ? { cursor: "pointer" } : undefined}
                                  >
                                    {rel}
                                  </Badge>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </motion.div>
          ))}
        </div>
      )}

      {/* Alphabet Jump */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="fixed right-2 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-0.5"
      >
        {groupedTerms.map(([initial]) => (
          <button
            key={initial}
            onClick={() => {
              const el = document.querySelector(
                `[data-initial="${initial}"]`
              );
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="w-6 h-6 text-xs text-muted-foreground hover:text-[var(--color-dads-purple)] hover:font-bold transition-all"
          >
            {initial}
          </button>
        ))}
      </motion.div>
    </div>
  );
}
