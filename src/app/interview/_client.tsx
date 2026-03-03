"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  interviewQuestions,
  interviewLevels,
  interviewCategories,
} from "@/data/interview";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, MessageCircleQuestion } from "lucide-react";

export default function InterviewClientPage() {
  const [search, setSearch] = useState("");
  const [activeLevel, setActiveLevel] = useState<string>("all");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredQuestions = useMemo(() => {
    return interviewQuestions.filter((q) => {
      const matchesSearch =
        search === "" ||
        q.question.toLowerCase().includes(search.toLowerCase()) ||
        q.answer.toLowerCase().includes(search.toLowerCase());

      const matchesLevel = activeLevel === "all" || q.level === activeLevel;
      const matchesCategory =
        activeCategory === "all" || q.category === activeCategory;

      return matchesSearch && matchesLevel && matchesCategory;
    });
  }, [search, activeLevel, activeCategory]);

  const groupedByLevel = useMemo(() => {
    return interviewLevels.map((level) => ({
      ...level,
      questions: filteredQuestions.filter((q) => q.level === level.id),
    }));
  }, [filteredQuestions]);

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
          <MessageCircleQuestion className="h-8 w-8 text-[var(--color-dads-blue)]" />
          <h1 className="text-3xl md:text-4xl font-bold">
            Java 面接 <span className="text-[var(--color-dads-blue)]">質問100選</span>
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Java の面接でよく聞かれる質問を基礎・中級・上級に分けて解説。
          クリックして回答とコード例を確認できます。
        </p>
        <div className="flex justify-center gap-4 mt-3 text-sm text-muted-foreground">
          {interviewLevels.map((level) => {
            const count = interviewQuestions.filter(
              (q) => q.level === level.id
            ).length;
            return (
              <span key={level.id} className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: level.color }}
                />
                {level.name}: {count}問
              </span>
            );
          })}
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
            placeholder="質問を検索... (例: Stream、Spring、GC)"
            className="w-full h-11 pl-10 pr-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-dads-blue)]/30 focus:border-[var(--color-dads-blue)] transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-[var(--color-dads-blue)]"
            >
              クリア
            </button>
          )}
        </div>

        {/* Level Filter */}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveLevel("all")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeLevel === "all"
                ? "bg-[var(--color-dads-blue)] text-white"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            全レベル
          </button>
          {interviewLevels.map((level) => {
            const count = interviewQuestions.filter(
              (q) => q.level === level.id
            ).length;
            return (
              <button
                key={level.id}
                onClick={() => setActiveLevel(level.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeLevel === level.id
                    ? "text-white"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
                style={
                  activeLevel === level.id
                    ? { backgroundColor: level.color }
                    : undefined
                }
              >
                {level.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-1.5">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-foreground text-background"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            全カテゴリ
          </button>
          {interviewCategories.map((cat) => {
            const count = interviewQuestions.filter(
              (q) => q.category === cat.id
            ).length;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                  activeCategory === cat.id
                    ? "bg-foreground text-background"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Results Count */}
      {(search || activeLevel !== "all" || activeCategory !== "all") && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-6 text-sm text-muted-foreground"
        >
          {filteredQuestions.length} 件の質問が見つかりました
        </motion.div>
      )}

      {/* Questions */}
      {filteredQuestions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 text-muted-foreground"
        >
          <MessageCircleQuestion className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg">一致する質問が見つかりません</p>
          <p className="text-sm mt-1">
            検索キーワードやフィルターを変更してください
          </p>
        </motion.div>
      ) : (
        <div className="space-y-10">
          {groupedByLevel.map((level) => {
            if (level.questions.length === 0) return null;
            return (
              <motion.section
                key={level.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true, margin: "-30px" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-1.5 h-8 rounded-full"
                    style={{ backgroundColor: level.color }}
                  />
                  <h2 className="text-xl font-bold">{level.name}</h2>
                  <Badge
                    variant="outline"
                    className="text-xs"
                    style={{
                      borderColor: level.color,
                      color: level.color,
                    }}
                  >
                    {level.questions.length} 問
                  </Badge>
                  <span className="text-xs text-muted-foreground hidden sm:inline">
                    {level.description}
                  </span>
                </div>

                <Accordion type="multiple" className="space-y-2">
                  {level.questions.map((q) => {
                    const cat = interviewCategories.find(
                      (c) => c.id === q.category
                    );
                    return (
                      <AccordionItem
                        key={q.id}
                        value={`q-${q.id}`}
                        className="border border-border rounded-lg px-4 data-[state=open]:bg-muted"
                      >
                        <AccordionTrigger className="hover:no-underline py-3">
                          <div className="flex items-center gap-3 text-left">
                            <span
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                              style={{ backgroundColor: level.color }}
                            >
                              {q.id}
                            </span>
                            <span className="font-semibold text-sm sm:text-base">
                              {q.question}
                            </span>
                            <Badge
                              variant="outline"
                              className="text-xs shrink-0 hidden sm:inline-flex"
                            >
                              {cat?.name}
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          <div className="pl-10 space-y-3">
                            <p className="text-sm leading-relaxed text-foreground">
                              {q.answer}
                            </p>
                            {q.code && <CodeBlock code={q.code} />}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </motion.section>
            );
          })}
        </div>
      )}
    </div>
  );
}
