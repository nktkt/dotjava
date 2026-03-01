"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { javaErrors, errorCategories } from "@/data/java-errors";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertTriangle, Search, Lightbulb } from "lucide-react";

export default function ErrorsClientPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredErrors = useMemo(() => {
    return javaErrors.filter((error) => {
      const matchesSearch =
        search === "" ||
        error.title.toLowerCase().includes(search.toLowerCase()) ||
        error.description.toLowerCase().includes(search.toLowerCase()) ||
        error.cause.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        activeCategory === "all" || error.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 mb-4">
          <AlertTriangle className="h-8 w-8 text-[var(--color-dads-error)]" />
          <h1 className="text-3xl md:text-4xl font-bold">Java エラー集</h1>
        </div>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Javaでよく遭遇するエラー・例外を網羅的に解説。
          原因、修正方法、回避のコツをコード例付きで学習できます。
        </p>
        <div className="mt-2 text-sm text-muted-foreground">
          全 {javaErrors.length} 件のエラー・例外を収録
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
            placeholder="エラーを検索... (例: NullPointer、型変換、ファイル)"
            className="w-full h-11 pl-10 pr-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-dads-error)]/30 focus:border-[var(--color-dads-error)] transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-[var(--color-dads-error)]"
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
                ? "bg-[var(--color-dads-error)] text-white"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            全て ({javaErrors.length})
          </button>
          {errorCategories.map((cat) => {
            const count = javaErrors.filter(
              (e) => e.category === cat.id
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
          {filteredErrors.length} 件のエラーが見つかりました
        </motion.div>
      )}

      {/* Error List */}
      {filteredErrors.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 text-muted-foreground"
        >
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg">一致するエラーが見つかりません</p>
          <p className="text-sm mt-1">
            検索キーワードやカテゴリを変更してください
          </p>
        </motion.div>
      ) : (
        <Accordion type="multiple" className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredErrors.map((error, index) => {
              const category = errorCategories.find(
                (c) => c.id === error.category
              );
              return (
                <motion.div
                  key={error.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  layout
                >
                  <AccordionItem
                    value={error.id}
                    className="border border-border rounded-lg px-4 data-[state=open]:bg-muted"
                  >
                    <AccordionTrigger className="hover:no-underline py-3">
                      <div className="flex items-center gap-3 text-left min-w-0">
                        <span className="font-semibold text-base break-all">
                          {error.title}
                        </span>
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
                    <AccordionContent className="pb-5">
                      <div className="space-y-4">
                        {/* Description */}
                        <p className="text-sm leading-relaxed text-foreground">
                          {error.description}
                        </p>

                        {/* Cause */}
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-1">
                            原因
                          </h4>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {error.cause}
                          </p>
                        </div>

                        {/* Error Code */}
                        {error.errorCode && (
                          <div>
                            <h4 className="text-sm font-semibold text-[var(--color-dads-error)] mb-2">
                              エラーが発生するコード
                            </h4>
                            <CodeBlock code={error.errorCode} />
                          </div>
                        )}

                        {/* Fix Code */}
                        {error.fixCode && (
                          <div>
                            <h4 className="text-sm font-semibold text-[var(--color-dads-success)] mb-2">
                              修正後のコード
                            </h4>
                            <CodeBlock code={error.fixCode} />
                          </div>
                        )}

                        {/* Tips */}
                        {error.tips && error.tips.length > 0 && (
                          <div className="rounded-lg border border-border bg-background p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Lightbulb className="h-4 w-4 text-[var(--color-dads-warning)]" />
                              <h4 className="text-sm font-semibold text-foreground">
                                回避のコツ
                              </h4>
                            </div>
                            <ul className="space-y-1.5">
                              {error.tips.map((tip, i) => (
                                <li
                                  key={i}
                                  className="text-sm text-muted-foreground flex gap-2"
                                >
                                  <span className="text-[var(--color-dads-warning)] shrink-0">
                                    -
                                  </span>
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </Accordion>
      )}
    </div>
  );
}
