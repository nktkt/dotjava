"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { kotlinQuizQuestions } from "@/data/kotlin-quiz";
import { CodeBlock } from "@/components/code-block";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy } from "lucide-react";
import Link from "next/link";

export default function QuizClientPage() {
  const questions = useMemo(() => {
    const shuffled = [...kotlinQuizQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 15);
  }, []);

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[current];

  const handleSelect = (label: string) => {
    if (answered) return;
    setSelected(label);
    setAnswered(true);
    if (label === q.correctLabel) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const handleRetry = () => {
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
          <Trophy className="h-16 w-16 mx-auto mb-4 text-[#D97706]" />
          <h2 className="text-3xl font-bold mb-2">クイズ完了!</h2>
          <p className="text-xl text-muted-foreground mb-6">
            {score} / {questions.length} 問正解 ({pct}%)
          </p>
          <div className="w-full bg-muted rounded-full h-4 mb-8">
            <div
              className="h-4 rounded-full transition-all"
              style={{ width: `${pct}%`, backgroundColor: pct >= 80 ? "#059669" : pct >= 50 ? "#D97706" : "#DC2626" }}
            />
          </div>
          <div className="flex gap-4 justify-center">
            <Button onClick={handleRetry} variant="outline" className="gap-2">
              <RotateCcw className="h-4 w-4" /> もう一度
            </Button>
            <Link href="/kotlin">
              <Button className="gap-2">学習に戻る</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>問題 {current + 1} / {questions.length}</span>
          <span>正解 {score}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="h-2 rounded-full bg-[#2563EB] transition-all"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <p className="text-lg font-medium mb-4">{q.question}</p>
              {q.code && <div className="mb-4"><CodeBlock code={q.code} /></div>}

              <div className="space-y-3">
                {q.choices.map((choice) => {
                  const isCorrect = choice.label === q.correctLabel;
                  const isSelected = choice.label === selected;
                  let borderColor = "border-border";
                  let bg = "";
                  if (answered) {
                    if (isCorrect) { borderColor = "border-[#059669]"; bg = "bg-[#059669]/10"; }
                    else if (isSelected) { borderColor = "border-[#DC2626]"; bg = "bg-[#DC2626]/10"; }
                  } else if (isSelected) {
                    borderColor = "border-[#2563EB]"; bg = "bg-[#2563EB]/5";
                  }

                  return (
                    <button
                      key={choice.label}
                      onClick={() => handleSelect(choice.label)}
                      disabled={answered}
                      className={`w-full text-left p-4 rounded-lg border ${borderColor} ${bg} transition-all ${!answered ? "hover:border-[#2563EB] hover:bg-[#2563EB]/5 cursor-pointer" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="shrink-0">{choice.label}</Badge>
                        <span className="text-sm">{choice.text}</span>
                        {answered && isCorrect && <CheckCircle2 className="h-5 w-5 text-[#059669] ml-auto shrink-0" />}
                        {answered && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-[#DC2626] ml-auto shrink-0" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {answered && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 rounded-lg bg-muted">
                  <p className="text-sm">{q.explanation}</p>
                </motion.div>
              )}
            </CardContent>
          </Card>

          {answered && (
            <div className="flex justify-end">
              <Button onClick={handleNext} className="gap-2">
                {current + 1 >= questions.length ? "結果を見る" : "次の問題"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
