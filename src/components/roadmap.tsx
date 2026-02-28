"use client";

import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

const roadmapSteps = [
  {
    level: "入門",
    color: "#259D63",
    items: [
      "変数とデータ型",
      "制御構文 (if, for, while)",
      "メソッドの定義と呼び出し",
      "文字列操作",
      "配列の基本",
    ],
  },
  {
    level: "基礎",
    color: "#0017C1",
    items: [
      "クラスとオブジェクト",
      "継承とポリモーフィズム",
      "インターフェース",
      "例外処理",
      "コレクション (List, Map, Set)",
    ],
  },
  {
    level: "中級",
    color: "#C26A00",
    items: [
      "ジェネリクス",
      "列挙型 (Enum)",
      "ラムダ式と Stream API (Java 8)",
      "Optional (Java 8)",
      "新しい日時 API (Java 8)",
    ],
  },
  {
    level: "上級",
    color: "#6B21A8",
    items: [
      "並行処理 (Thread, ExecutorService)",
      "CompletableFuture",
      "Virtual Threads (Java 21)",
      "モジュールシステム (Java 9)",
      "Records と Sealed Classes (Java 17)",
    ],
  },
  {
    level: "エキスパート",
    color: "#EC0000",
    items: [
      "パターンマッチング (Java 21)",
      "Stream Gatherers (Java 24)",
      "Structured Concurrency",
      "デザインパターン",
      "パフォーマンスチューニング",
    ],
  },
];

export function Roadmap() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {roadmapSteps.map((step, index) => (
        <motion.div
          key={step.level}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="h-full border border-[#D9DBE0]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: step.color }}
                >
                  {index + 1}
                </div>
                <Badge
                  variant="outline"
                  className="font-semibold"
                  style={{ borderColor: step.color, color: step.color }}
                >
                  {step.level}
                </Badge>
              </div>
              <ul className="space-y-2">
                {step.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle2
                      className="h-4 w-4 mt-0.5 shrink-0"
                      style={{ color: step.color }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
