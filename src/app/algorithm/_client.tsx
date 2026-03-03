"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { algorithmChapters, algorithmCategories } from "@/data/algorithm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Binary, ArrowRight, BookOpen } from "lucide-react";

export default function AlgorithmClientPage() {
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
          <Binary className="h-8 w-8 text-[var(--color-dads-cyan)]" />
          <h1 className="text-3xl md:text-4xl font-bold">
            Java <span className="text-[var(--color-dads-cyan)]">アルゴリズム</span>学習
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          計算量の基礎からソート、探索、データ構造、グラフ、動的計画法まで
          Java コード例で体系的に学習
        </p>
        <div className="mt-3 text-sm text-muted-foreground">
          全 {algorithmChapters.length} チャプター /{" "}
          {algorithmChapters.reduce((sum, c) => sum + c.sections.length, 0)} セクション
        </div>
      </motion.div>

      {/* Category Sections */}
      {algorithmCategories.map((category, catIndex) => {
        const chapters = algorithmChapters.filter(
          (c) => c.category === category.id
        );
        if (chapters.length === 0) return null;

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
                style={{
                  borderColor: category.color,
                  color: category.color,
                }}
              >
                {chapters.length} チャプター
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {chapters.map((chapter) => (
                <Link key={chapter.id} href={`/algorithm/${chapter.id}`}>
                  <Card className="group h-full cursor-pointer overflow-hidden border border-border transition-all hover:shadow-md hover:border-[var(--color-dads-cyan)]">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg group-hover:text-[var(--color-dads-cyan)] transition-colors">
                        {chapter.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {chapter.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <BookOpen className="h-3.5 w-3.5" />
                          {chapter.sections.length} セクション
                        </div>
                        <div className="flex items-center text-sm text-[var(--color-dads-cyan)] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
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
              {algorithmCategories.map((cat, index) => (
                <div key={cat.id} className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="font-medium"
                    style={{
                      borderColor: cat.color,
                      color: cat.color,
                    }}
                  >
                    {index + 1}. {cat.name}
                  </Badge>
                  {index < algorithmCategories.length - 1 && (
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
