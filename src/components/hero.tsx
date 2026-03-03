"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Coffee, Sparkles, BookOpen, Layers } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-accent to-background">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm border-[var(--color-dads-blue)] text-[var(--color-dads-blue)] bg-background">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            Java 8 ~ Java 26 対応
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-foreground">
            <span className="text-[var(--color-dads-blue)]">Java</span>を
            <br className="sm:hidden" />
            理解する
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            基礎からバージョンごとの新機能まで、Javaプログラミングの全てを
            コード例と共に学習できるリファレンスサイト
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-8 md:gap-12"
        >
          <Stat icon={<Coffee className="h-5 w-5 text-[var(--color-dads-blue)]" />} value="10+" label="バージョン" />
          <Stat icon={<BookOpen className="h-5 w-5 text-[var(--color-dads-success)]" />} value="80+" label="機能解説" />
          <Stat icon={<Layers className="h-5 w-5 text-[var(--color-dads-warning)]" />} value="15+" label="基本トピック" />
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <div className="text-left">
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
