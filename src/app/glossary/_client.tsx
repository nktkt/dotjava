"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { glossaryTerms, glossaryCategories } from "@/data/glossary";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, BookOpenText, Tag, Link2 } from "lucide-react";

export default function GlossaryClientPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter((term) => {
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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 mb-4">
          <BookOpenText className="h-8 w-8 text-[var(--color-dads-blue)]" />
          <h1 className="text-3xl md:text-4xl font-bold">Java 用語集</h1>
        </div>
        <p className="text-[#626264] max-w-xl mx-auto">
          Javaプログラミングに関する重要な用語を網羅的に解説。
          検索やカテゴリフィルターで素早く見つけられます。
        </p>
        <div className="mt-2 text-sm text-[#626264]">
          全 {glossaryTerms.length} 用語収録
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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#626264]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="用語を検索... (例: ラムダ、Stream、JVM)"
            className="w-full h-11 pl-10 pr-4 rounded-lg border border-[#D9DBE0] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-dads-blue)]/30 focus:border-[var(--color-dads-blue)] transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#626264] hover:text-[var(--color-dads-blue)]"
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
                ? "bg-[var(--color-dads-blue)] text-white"
                : "bg-[#F1F3F9] text-[#626264] hover:bg-[#E8EAF0]"
            }`}
          >
            全て ({glossaryTerms.length})
          </button>
          {glossaryCategories.map((cat) => {
            const count = glossaryTerms.filter(
              (t) => t.category === cat.id
            ).length;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? "text-white"
                    : "bg-[#F1F3F9] text-[#626264] hover:bg-[#E8EAF0]"
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
          className="text-center mb-6 text-sm text-[#626264]"
        >
          {filteredTerms.length} 件の用語が見つかりました
        </motion.div>
      )}

      {/* Terms List */}
      {filteredTerms.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 text-[#626264]"
        >
          <BookOpenText className="h-12 w-12 mx-auto mb-4 opacity-30" />
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
                <span className="text-2xl font-bold text-[var(--color-dads-blue)] w-10 text-center">
                  {initial}
                </span>
                <div className="h-px flex-1 bg-[#D9DBE0]" />
                <span className="text-xs text-[#626264]">
                  {terms.length}件
                </span>
              </div>

              <Accordion type="multiple" className="space-y-2">
                {terms.map((term) => {
                  const category = glossaryCategories.find(
                    (c) => c.id === term.category
                  );
                  return (
                    <AccordionItem
                      key={term.term}
                      value={term.term}
                      className="border border-[#D9DBE0] rounded-lg px-4 data-[state=open]:bg-[#F8F9FB]"
                    >
                      <AccordionTrigger className="hover:no-underline py-3">
                        <div className="flex items-center gap-3 text-left">
                          <span className="font-semibold text-base">
                            {term.term}
                          </span>
                          {term.reading && term.reading !== term.term && (
                            <span className="text-xs text-[#626264] hidden sm:inline">
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
                          {term.since && (
                            <Badge
                              variant="secondary"
                              className="text-xs shrink-0 hidden sm:inline-flex"
                            >
                              {term.since}
                            </Badge>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4">
                        <div className="pl-0 space-y-3">
                          <p className="text-sm leading-relaxed text-[#1A1A1C]">
                            {term.description}
                          </p>

                          {term.code && <CodeBlock code={term.code} />}

                          {term.related && term.related.length > 0 && (
                            <div className="flex items-center gap-2 flex-wrap">
                              <Link2 className="h-3.5 w-3.5 text-[#626264] shrink-0" />
                              <span className="text-xs text-[#626264]">
                                関連:
                              </span>
                              {term.related.map((rel) => {
                                const exists = glossaryTerms.some(
                                  (t) => t.term === rel
                                );
                                return (
                                  <Badge
                                    key={rel}
                                    variant="outline"
                                    className={`text-xs cursor-default ${
                                      exists
                                        ? "hover:bg-[var(--color-dads-blue-light)] hover:border-[var(--color-dads-blue)]"
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
            className="w-6 h-6 text-xs text-[#626264] hover:text-[var(--color-dads-blue)] hover:font-bold transition-all"
          >
            {initial}
          </button>
        ))}
      </motion.div>
    </div>
  );
}
