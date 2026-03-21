"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { exercisesChapters, exercisesCategories } from "@/data/exercises";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ArrowRight } from "lucide-react";

export default function ClientPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Java<span className="text-[#2563EB]">実践演習</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Javaの基礎文法からオブジェクト指向、Stream API、デザインパターンまで実践的な演習問題
        </p>
        <div className="mt-3 text-sm text-muted-foreground">
          全 {exercisesChapters.length} チャプター /{" "}
          {exercisesChapters.reduce((sum, c) => sum + c.sections.length, 0)} セクション
        </div>
      </motion.div>

      {exercisesCategories.map((category, catIndex) => {
        const chapters = exercisesChapters.filter((c) => c.category === category.id);
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
              <div className="w-1.5 h-8 rounded-full" style={{ backgroundColor: category.color }} />
              <h2 className="text-xl font-bold">{category.name}</h2>
              <Badge variant="outline" className="text-xs" style={{ borderColor: category.color, color: category.color }}>
                {chapters.length} チャプター
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {chapters.map((chapter) => (
                <Link key={chapter.id} href={"/exercises/" + chapter.id}>
                  <Card className="group h-full cursor-pointer overflow-hidden border border-border transition-all hover:shadow-md hover:border-[#2563EB]">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg group-hover:text-[#2563EB] transition-colors">{chapter.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{chapter.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <BookOpen className="h-3.5 w-3.5" />{chapter.sections.length} セクション
                        </div>
                        <div className="flex items-center text-sm text-[#2563EB] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          学習する<ArrowRight className="h-4 w-4 ml-1" />
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
    </div>
  );
}
