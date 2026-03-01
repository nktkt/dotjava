"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { designPatterns, patternCategories } from "@/data/design-patterns";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PatternDetailClientPage({
  patternId,
}: {
  patternId: string;
}) {
  const patternIndex = designPatterns.findIndex((p) => p.id === patternId);

  if (patternIndex === -1) {
    notFound();
  }

  const pattern = designPatterns[patternIndex];
  const category = patternCategories.find((c) => c.id === pattern.category);

  const sameCategoryPatterns = designPatterns.filter(
    (p) => p.category === pattern.category && p.id !== pattern.id
  );

  const prevPattern =
    patternIndex > 0 ? designPatterns[patternIndex - 1] : null;
  const nextPattern =
    patternIndex < designPatterns.length - 1
      ? designPatterns[patternIndex + 1]
      : null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/patterns"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-[var(--color-dads-warning)] transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          デザインパターン ガイドに戻る
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-3xl md:text-4xl font-bold">
                {pattern.title}
              </h1>
              <Badge
                variant="outline"
                style={{
                  borderColor: category?.color,
                  color: category?.color,
                }}
              >
                {category?.name}
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground">
              {pattern.description}
            </p>
          </motion.div>

          <div className="space-y-8 mb-12">
            {pattern.sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                        style={{ backgroundColor: category?.color }}
                      >
                        {index + 1}
                      </div>
                      <CardTitle className="text-xl">
                        {section.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {section.content}
                    </p>
                    {section.code && <CodeBlock code={section.code} language="java" />}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Separator className="mb-8" />

          {/* Navigation */}
          <div className="flex justify-between items-center">
            {prevPattern ? (
              <Link href={`/patterns/${prevPattern.id}`}>
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {prevPattern.title}
                  </span>
                  <span className="sm:hidden">前へ</span>
                </Button>
              </Link>
            ) : (
              <div />
            )}
            {nextPattern ? (
              <Link href={`/patterns/${nextPattern.id}`}>
                <Button variant="outline" className="gap-2">
                  <span className="hidden sm:inline">
                    {nextPattern.title}
                  </span>
                  <span className="sm:hidden">次へ</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-64 shrink-0">
          <div className="sticky top-24 space-y-6">
            {sameCategoryPatterns.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
                  {category?.name}の他のパターン
                </h3>
                <div className="space-y-1">
                  {sameCategoryPatterns.map((p) => (
                    <Link
                      key={p.id}
                      href={`/patterns/${p.id}`}
                      className="block px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors"
                    >
                      {p.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
                このページの内容
              </h3>
              <div className="space-y-1">
                {pattern.sections.map((section, index) => (
                  <div
                    key={section.title}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground"
                  >
                    <span
                      className="w-5 h-5 rounded text-xs flex items-center justify-center text-white shrink-0"
                      style={{ backgroundColor: category?.color }}
                    >
                      {index + 1}
                    </span>
                    <span className="line-clamp-1">{section.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
