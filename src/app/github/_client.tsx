"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { githubChapters, githubCategories } from "@/data/github";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, ArrowRight, BookOpen } from "lucide-react";

/** Return the dark-safe accent color for a category */
function getAccentColor(
  category: (typeof githubCategories)[number],
  isDark: boolean
) {
  if (isDark && "darkColor" in category) {
    return (category as { darkColor: string }).darkColor;
  }
  return category.color;
}

export default function GitHubClientPage() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.classList.contains("dark"));

    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains("dark"));
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
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
          <Github className="h-8 w-8 text-[#24292F] dark:text-white" />
          <h1 className="text-3xl md:text-4xl font-bold">
            GitHub <span className="text-[#24292F] dark:text-white">使い方</span>ガイド
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          GitHubの基礎からリポジトリ管理、コラボレーション、
          GitHub Actions、セキュリティまで体系的に学習
        </p>
        <div className="mt-3 text-sm text-muted-foreground">
          全 {githubChapters.length} チャプター /{" "}
          {githubChapters.reduce((sum, c) => sum + c.sections.length, 0)} セクション
        </div>
      </motion.div>

      {/* Category Sections */}
      {githubCategories.map((category, catIndex) => {
        const chapters = githubChapters.filter(
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
                  borderColor: getAccentColor(category, isDark),
                  color: getAccentColor(category, isDark),
                }}
              >
                {chapters.length} チャプター
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {chapters.map((chapter) => (
                <Link key={chapter.id} href={`/github/${chapter.id}`}>
                  <Card className="group h-full cursor-pointer overflow-hidden border border-border transition-all hover:shadow-md hover:border-[#24292F] dark:hover:border-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg group-hover:text-[#24292F] dark:group-hover:text-white transition-colors">
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
                        <div className="flex items-center text-sm text-[#24292F] dark:text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
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
              {githubCategories.map((cat, index) => (
                <div key={cat.id} className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="font-medium"
                    style={{
                      borderColor: getAccentColor(cat, isDark),
                      color: getAccentColor(cat, isDark),
                    }}
                  >
                    {index + 1}. {cat.name}
                  </Badge>
                  {index < githubCategories.length - 1 && (
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
