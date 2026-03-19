"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Coffee, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="inline-block mb-6"
        >
          <Coffee className="w-16 h-16 text-dads-blue mx-auto" strokeWidth={1.5} />
        </motion.div>

        <h1 className="text-8xl font-bold text-dads-blue mb-4">404</h1>

        <h2 className="text-2xl font-bold mb-3">ページが見つかりません</h2>

        <p className="text-muted-foreground mb-8">
          お探しのページは存在しないか、移動した可能性があります。
          <br />
          URLをご確認のうえ、もう一度お試しください。
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-dads-blue text-white font-medium hover:bg-dads-blue-hover transition-colors"
        >
          <Home className="w-4 h-4" />
          ホームに戻る
        </Link>
      </motion.div>
    </div>
  );
}
