"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { designPatterns, patternCategories } from "@/data/design-patterns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Blocks, ArrowRight, BookOpen } from "lucide-react";

export default function PatternsClientPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 mb-4">
          <Blocks className="h-8 w-8 text-[var(--color-dads-warning)]" />
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="text-[var(--color-dads-warning)]">デザインパターン</span> ガイド
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          GoF 23のデザインパターンをJavaのコード例と共に学習。
          生成・構造・振る舞いパターンを網羅的に解説
        </p>
        <div className="mt-3 text-sm text-muted-foreground">
          全 {designPatterns.length} パターン /{" "}
          {designPatterns.reduce((sum, p) => sum + p.sections.length, 0)} セクション
        </div>
      </motion.div>

      {/* Category Sections */}
      {patternCategories.map((category, catIndex) => {
        const patterns = designPatterns.filter((p) => p.category === category.id);
        if (patterns.length === 0) return null;

        return (
          <motion.section
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: catIndex * 0.05 }}
            viewport={{ once: true, margin: "-30px" }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-1.5 h-8 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <h2 className="text-xl font-bold">{category.name}</h2>
              <Badge
                variant="outline"
                className="text-xs"
                style={{ borderColor: category.color, color: category.color }}
              >
                {patterns.length} パターン
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {patterns.map((pattern) => (
                <Link key={pattern.id} href={`/patterns/${pattern.id}`}>
                  <Card className="group h-full cursor-pointer overflow-hidden border border-border transition-all hover:shadow-md hover:border-[var(--color-dads-warning)]">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg group-hover:text-[var(--color-dads-warning)] transition-colors">
                        {pattern.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {pattern.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <BookOpen className="h-3.5 w-3.5" />
                          {pattern.sections.length} セクション
                        </div>
                        <div className="flex items-center text-sm text-[var(--color-dads-warning)] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          学習する
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.section>
        );
      })}

      {/* Learning Path */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 mb-8"
      >
        <Card className="bg-muted">
          <CardContent className="pt-6">
            <h3 className="text-lg font-bold mb-4 text-center">
              推奨学習順序
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-2">
              {patternCategories.map((cat, index) => (
                <div key={cat.id} className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="font-medium"
                    style={{ borderColor: cat.color, color: cat.color }}
                  >
                    {index + 1}. {cat.name}
                  </Badge>
                  {index < patternCategories.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
}
