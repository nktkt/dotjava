"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { quizQuestions } from "@/data/quiz";
import type { QuizQuestion } from "@/data/quiz";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Brain,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  List,
} from "lucide-react";

type Phase = "select" | "quiz" | "result";
type Difficulty = "beginner" | "intermediate" | "advanced";

const difficultyLabels: Record<Difficulty, string> = {
  beginner: "初級",
  intermediate: "中級",
  advanced: "上級",
};

const difficultyColors: Record<Difficulty, string> = {
  beginner: "var(--color-dads-success)",
  intermediate: "var(--color-dads-warning)",
  advanced: "var(--color-dads-error)",
};

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const mosQuestions = quizQuestions.filter((q) => q.category === "mos");

export function MosQuiz() {
  const [phase, setPhase] = useState<Phase>("select");
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
    []
  );
  const [questionCount, setQuestionCount] = useState<number>(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showAnswer, setShowAnswer] = useState(false);

  const filteredQuestions = useMemo(() => {
    return mosQuestions.filter((q) => {
      return (
        selectedDifficulties.length === 0 ||
        selectedDifficulties.includes(q.difficulty)
      );
    });
  }, [selectedDifficulties]);

  const toggleDifficulty = useCallback((d: string) => {
    setSelectedDifficulties((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  }, []);

  const actualQuestionCount =
    questionCount === 0
      ? filteredQuestions.length
      : Math.min(questionCount, filteredQuestions.length);

  const startQuiz = useCallback(() => {
    if (filteredQuestions.length === 0) return;
    const shuffled = shuffleArray(filteredQuestions);
    const count =
      questionCount === 0
        ? shuffled.length
        : Math.min(questionCount, shuffled.length);
    setQuestions(shuffled.slice(0, count));
    setCurrentIndex(0);
    setAnswers({});
    setShowAnswer(false);
    setPhase("quiz");
  }, [filteredQuestions, questionCount]);

  const selectAnswer = useCallback(
    (questionId: string, label: string) => {
      if (showAnswer) return;
      setAnswers((prev) => ({ ...prev, [questionId]: label }));
      setShowAnswer(true);
    },
    [showAnswer]
  );

  const nextQuestion = useCallback(() => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setShowAnswer(false);
    } else {
      setPhase("result");
    }
  }, [currentIndex, questions.length]);

  const restart = useCallback(() => {
    setPhase("select");
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers({});
    setShowAnswer(false);
  }, []);

  const score = useMemo(() => {
    let correct = 0;
    for (const q of questions) {
      if (answers[q.id] === q.correctLabel) correct++;
    }
    return correct;
  }, [questions, answers]);

  const scorePercentage =
    questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  const ratingMessage = useMemo(() => {
    if (scorePercentage >= 90) return "素晴らしい！合格圏内です！";
    if (scorePercentage >= 70) return "あと少し！合格ラインに近づいています！";
    if (scorePercentage >= 50) return "よく頑張りました！苦手分野を復習しましょう！";
    return "上の解説を復習して再挑戦しましょう！";
  }, [scorePercentage]);

  // ── Phase 1: Selection ──
  if (phase === "select") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <Brain className="h-7 w-7 text-[var(--color-dads-success)]" />
            <h2 className="text-2xl font-bold">MOS 模擬クイズ</h2>
          </div>
          <p className="text-muted-foreground text-sm">
            全 {mosQuestions.length} 問から出題。難易度や出題数を選んで挑戦しましょう。
          </p>
        </div>

        <div className="max-w-lg mx-auto space-y-4">
          {/* Difficulty */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">難易度</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {(
                  ["beginner", "intermediate", "advanced"] as Difficulty[]
                ).map((d) => {
                  const count = mosQuestions.filter(
                    (q) => q.difficulty === d
                  ).length;
                  const isSelected = selectedDifficulties.includes(d);
                  return (
                    <button
                      key={d}
                      onClick={() => toggleDifficulty(d)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                        isSelected
                          ? "text-white border-transparent"
                          : "bg-background text-muted-foreground border-border hover:bg-secondary"
                      }`}
                      style={
                        isSelected
                          ? { backgroundColor: difficultyColors[d] }
                          : undefined
                      }
                    >
                      {difficultyLabels[d]} ({count})
                    </button>
                  );
                })}
              </div>
              {selectedDifficulties.length === 0 && (
                <p className="text-xs text-muted-foreground mt-2">
                  未選択の場合、全難易度が対象です
                </p>
              )}
            </CardContent>
          </Card>

          {/* Question Count */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">出題数</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {[10, 20, 30, 50, 0].map((n) => {
                  const label = n === 0 ? "全問" : `${n}問`;
                  const isSelected = questionCount === n;
                  const isDisabled =
                    n !== 0 && n > filteredQuestions.length;
                  return (
                    <button
                      key={n}
                      onClick={() => setQuestionCount(n)}
                      disabled={isDisabled}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        isDisabled
                          ? "bg-secondary text-muted-foreground/40 cursor-not-allowed"
                          : isSelected
                            ? "bg-[var(--color-dads-success)] text-white"
                            : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                対象問題数: {filteredQuestions.length} 問
              </p>
            </CardContent>
          </Card>

          {/* Start */}
          <div className="text-center space-y-3 pt-2">
            <p className="text-lg font-semibold text-foreground">
              出題数：
              <span className="text-[var(--color-dads-success)]">
                {actualQuestionCount}
              </span>{" "}
              問
            </p>
            <Button
              size="lg"
              onClick={startQuiz}
              disabled={filteredQuestions.length === 0}
              className="px-8 py-3 text-base bg-[var(--color-dads-success)] hover:bg-[var(--color-dads-success)]/90"
            >
              <Brain className="h-5 w-5 mr-2" />
              クイズを始める
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ── Phase 2: Quiz ──
  if (phase === "quiz") {
    const currentQuestion = questions[currentIndex];
    const selectedAnswer = answers[currentQuestion.id];
    const isCorrect = selectedAnswer === currentQuestion.correctLabel;
    const progress = ((currentIndex + 1) / questions.length) * 100;

    return (
      <div className="max-w-3xl mx-auto">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2 text-sm text-muted-foreground">
            <span>
              問題 {currentIndex + 1} / {questions.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[var(--color-dads-success)] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Badge
                    variant="outline"
                    style={{
                      borderColor:
                        difficultyColors[currentQuestion.difficulty],
                      color: difficultyColors[currentQuestion.difficulty],
                    }}
                  >
                    {difficultyLabels[currentQuestion.difficulty]}
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-relaxed">
                  Q{currentIndex + 1}. {currentQuestion.question}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {currentQuestion.code && (
                  <CodeBlock code={currentQuestion.code} />
                )}

                <div className="space-y-3">
                  {currentQuestion.choices.map((choice) => {
                    const isSelected = selectedAnswer === choice.label;
                    const isCorrectChoice =
                      choice.label === currentQuestion.correctLabel;

                    let borderClass = "border-border";
                    let bgClass = "bg-background hover:bg-muted";

                    if (showAnswer) {
                      if (isCorrectChoice) {
                        borderClass =
                          "border-[var(--color-dads-success)]";
                        bgClass =
                          "bg-[var(--color-dads-success-light)]";
                      } else if (isSelected && !isCorrectChoice) {
                        borderClass =
                          "border-[var(--color-dads-error)]";
                        bgClass =
                          "bg-[var(--color-dads-error-light)]";
                      } else {
                        bgClass = "bg-background opacity-60";
                      }
                    }

                    return (
                      <button
                        key={choice.label}
                        onClick={() =>
                          selectAnswer(
                            currentQuestion.id,
                            choice.label
                          )
                        }
                        disabled={showAnswer}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${borderClass} ${bgClass} ${
                          !showAnswer
                            ? "cursor-pointer active:scale-[0.99]"
                            : "cursor-default"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold shrink-0 ${
                              showAnswer && isCorrectChoice
                                ? "bg-[var(--color-dads-success)] text-white"
                                : showAnswer &&
                                    isSelected &&
                                    !isCorrectChoice
                                  ? "bg-[var(--color-dads-error)] text-white"
                                  : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {choice.label}
                          </span>
                          <span className="text-sm pt-0.5 text-foreground">
                            {choice.text}
                          </span>
                          {showAnswer && isCorrectChoice && (
                            <CheckCircle2 className="h-5 w-5 text-[var(--color-dads-success)] ml-auto shrink-0 mt-0.5" />
                          )}
                          {showAnswer &&
                            isSelected &&
                            !isCorrectChoice && (
                              <XCircle className="h-5 w-5 text-[var(--color-dads-error)] ml-auto shrink-0 mt-0.5" />
                            )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {showAnswer && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div
                      className={`p-4 rounded-lg ${
                        isCorrect
                          ? "bg-[var(--color-dads-success-light)] border border-[var(--color-dads-success)]"
                          : "bg-[var(--color-dads-error-light)] border border-[var(--color-dads-error)]"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="h-5 w-5 text-[var(--color-dads-success)]" />
                            <span className="font-semibold text-[var(--color-dads-success)]">
                              正解！
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-5 w-5 text-[var(--color-dads-error)]" />
                            <span className="font-semibold text-[var(--color-dads-error)]">
                              不正解（正解:{" "}
                              {currentQuestion.correctLabel}）
                            </span>
                          </>
                        )}
                      </div>
                      <p className="text-sm leading-relaxed text-foreground">
                        {currentQuestion.explanation}
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={nextQuestion}>
                        {currentIndex + 1 < questions.length ? (
                          <>
                            次の問題
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </>
                        ) : (
                          <>
                            結果を見る
                            <Trophy className="h-4 w-4 ml-1" />
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // ── Phase 3: Results ──
  return (
    <div className="max-w-3xl mx-auto">
      {/* Score */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color-dads-success-light)] mb-3">
          <Trophy className="h-7 w-7 text-[var(--color-dads-success)]" />
        </div>
        <h2 className="text-2xl font-bold mb-2">MOS模擬クイズ 結果</h2>
        <div className="text-5xl font-bold text-[var(--color-dads-success)] mb-1">
          {scorePercentage}
          <span className="text-2xl">%</span>
        </div>
        <p className="text-lg text-muted-foreground mb-1">
          {score} / {questions.length} 問正解
        </p>
        <p className="text-sm font-medium text-foreground">
          {ratingMessage}
        </p>
        {scorePercentage >= 70 && (
          <p className="text-xs text-muted-foreground mt-1">
            MOS試験の合格ラインは約700/1000点（約70%）です
          </p>
        )}
      </motion.div>

      {/* Restart */}
      <div className="text-center mb-6">
        <Button
          onClick={restart}
          variant="outline"
          size="lg"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          もう一度挑戦
        </Button>
      </div>

      {/* Review */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <h3 className="text-lg font-semibold mb-4">回答一覧</h3>
        <Accordion type="multiple" className="space-y-2">
          {questions.map((q, idx) => {
            const userAnswer = answers[q.id];
            const qIsCorrect = userAnswer === q.correctLabel;

            return (
              <AccordionItem
                key={q.id}
                value={q.id}
                className="border border-border rounded-lg px-4 data-[state=open]:bg-muted"
              >
                <AccordionTrigger className="hover:no-underline py-3">
                  <div className="flex items-center gap-3 text-left">
                    {qIsCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-[var(--color-dads-success)] shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-[var(--color-dads-error)] shrink-0" />
                    )}
                    <span className="text-sm text-muted-foreground shrink-0">
                      Q{idx + 1}
                    </span>
                    <span className="font-medium text-sm line-clamp-1">
                      {q.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-1">
                    {q.code && <CodeBlock code={q.code} />}
                    <div className="space-y-1.5">
                      {q.choices.map((choice) => {
                        const isUserChoice =
                          userAnswer === choice.label;
                        const isCorrectChoice =
                          choice.label === q.correctLabel;
                        return (
                          <div
                            key={choice.label}
                            className={`flex items-center gap-2 text-sm p-2 rounded ${
                              isCorrectChoice
                                ? "bg-[var(--color-dads-success-light)] font-medium"
                                : isUserChoice
                                  ? "bg-[var(--color-dads-error-light)]"
                                  : ""
                            }`}
                          >
                            <span className="font-bold text-muted-foreground w-5">
                              {choice.label}.
                            </span>
                            <span className="text-foreground">
                              {choice.text}
                            </span>
                            {isCorrectChoice && (
                              <CheckCircle2 className="h-4 w-4 text-[var(--color-dads-success)] ml-auto shrink-0" />
                            )}
                            {isUserChoice &&
                              !isCorrectChoice && (
                                <XCircle className="h-4 w-4 text-[var(--color-dads-error)] ml-auto shrink-0" />
                              )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="p-3 rounded-lg bg-background border border-border">
                      <p className="text-sm leading-relaxed text-foreground">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </motion.div>

      {/* Bottom Restart */}
      <div className="text-center mt-8">
        <Button onClick={restart} size="lg" className="bg-[var(--color-dads-success)] hover:bg-[var(--color-dads-success)]/90">
          <RotateCcw className="h-4 w-4 mr-2" />
          もう一度挑戦
        </Button>
      </div>
    </div>
  );
}

export function MosQuestionList() {
  const [filterDifficulty, setFilterDifficulty] = useState<string>("");

  const displayQuestions = filterDifficulty
    ? mosQuestions.filter((q) => q.difficulty === filterDifficulty)
    : mosQuestions;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <List className="h-7 w-7 text-[var(--color-dads-success)]" />
          <h2 className="text-2xl font-bold">問題一覧</h2>
        </div>
        <p className="text-muted-foreground text-sm">
          全 {mosQuestions.length} 問の問題と解答・解説を確認できます
        </p>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setFilterDifficulty("")}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            filterDifficulty === ""
              ? "bg-[var(--color-dads-success)] text-white"
              : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          }`}
        >
          すべて ({mosQuestions.length})
        </button>
        {(["beginner", "intermediate", "advanced"] as Difficulty[]).map(
          (d) => {
            const count = mosQuestions.filter(
              (q) => q.difficulty === d
            ).length;
            return (
              <button
                key={d}
                onClick={() =>
                  setFilterDifficulty(filterDifficulty === d ? "" : d)
                }
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  filterDifficulty === d
                    ? "text-white border-transparent"
                    : "bg-background text-muted-foreground border-border hover:bg-secondary"
                }`}
                style={
                  filterDifficulty === d
                    ? { backgroundColor: difficultyColors[d] }
                    : undefined
                }
              >
                {difficultyLabels[d]} ({count})
              </button>
            );
          }
        )}
      </div>

      <p className="text-center text-sm text-muted-foreground">
        表示中: {displayQuestions.length} 問
      </p>

      {/* Question List */}
      <Accordion type="multiple" className="space-y-2">
        {displayQuestions.map((q, idx) => (
          <AccordionItem
            key={q.id}
            value={q.id}
            className="border border-border rounded-lg px-4 data-[state=open]:bg-muted"
          >
            <AccordionTrigger className="hover:no-underline py-3">
              <div className="flex items-center gap-3 text-left min-w-0">
                <span className="text-sm text-muted-foreground shrink-0">
                  {idx + 1}
                </span>
                <Badge
                  variant="outline"
                  className="shrink-0 text-xs"
                  style={{
                    borderColor: difficultyColors[q.difficulty],
                    color: difficultyColors[q.difficulty],
                  }}
                >
                  {difficultyLabels[q.difficulty]}
                </Badge>
                <span className="font-medium text-sm min-w-0">
                  {q.question}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-1">
                {q.code && <CodeBlock code={q.code} />}
                <div className="space-y-1.5">
                  {q.choices.map((choice) => {
                    const isCorrectChoice =
                      choice.label === q.correctLabel;
                    return (
                      <div
                        key={choice.label}
                        className={`flex items-center gap-2 text-sm p-2 rounded ${
                          isCorrectChoice
                            ? "bg-[var(--color-dads-success-light)] font-medium"
                            : ""
                        }`}
                      >
                        <span className="font-bold text-muted-foreground w-5">
                          {choice.label}.
                        </span>
                        <span className="text-foreground">
                          {choice.text}
                        </span>
                        {isCorrectChoice && (
                          <CheckCircle2 className="h-4 w-4 text-[var(--color-dads-success)] ml-auto shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="p-3 rounded-lg bg-background border border-border">
                  <p className="text-sm leading-relaxed text-foreground">
                    {q.explanation}
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
