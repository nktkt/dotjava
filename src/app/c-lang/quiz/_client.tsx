"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { clangQuizQuestions } from "@/data/c-lang-quiz";
import type {
  CLangQuizQuestion,
  CLangLevel,
} from "@/data/c-lang-quiz";
import { clangChapters } from "@/data/c-lang";
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
  ArrowLeft,
  ArrowRight,
  Heart,
  RotateCcw,
  Trophy,
  X,
  Zap,
  CheckCircle2,
  XCircle,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────

type Phase = "levelSelect" | "chapterSelect" | "quiz" | "result";

interface LessonProgress {
  completed: boolean;
  bestXp: number;
  attempts: number;
}

interface QuizProgress {
  lessons: Record<string, LessonProgress>;
  totalXp: Record<CLangLevel, number>;
}

const STORAGE_KEY = "c-lang-quiz-progress";

const LEVEL_COLORS: Record<CLangLevel, string> = {
  basics: "var(--color-dads-cyan)",
  intermediate: "var(--color-dads-blue)",
  advanced: "var(--color-dads-purple)",
  expert: "var(--color-dads-success)",
};

const LEVEL_LABELS: Record<CLangLevel, string> = {
  basics: "基礎文法",
  intermediate: "中級",
  advanced: "上級",
  expert: "実践・応用",
};

const LEVEL_EMOJI: Record<CLangLevel, string> = {
  basics: "\uD83D\uDCDD",
  intermediate: "\uD83D\uDD27",
  advanced: "\u26A1",
  expert: "\uD83C\uDFC6",
};

const MAX_HEARTS = 5;
const XP_PER_CORRECT = 10;
const STREAK_BONUS_XP = 5;
const STREAK_BONUS_THRESHOLD = 3;

// ── Helpers ────────────────────────────────────────────

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function loadProgress(): QuizProgress {
  if (typeof window === "undefined") {
    return {
      lessons: {},
      totalXp: {
        basics: 0,
        intermediate: 0,
        advanced: 0,
        expert: 0,
      },
    };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return {
    lessons: {},
    totalXp: {
      basics: 0,
      intermediate: 0,
      advanced: 0,
      expert: 0,
    },
  };
}

function saveProgress(progress: QuizProgress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // ignore
  }
}

// ── Celebration Particles ──────────────────────────────

function CelebrationParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      size: 6 + Math.random() * 8,
      color: [
        "var(--color-dads-success)",
        "var(--color-dads-blue)",
        "#FFC107",
        "#CD7F32",
        "var(--color-dads-purple)",
        "var(--color-dads-cyan)",
      ][Math.floor(Math.random() * 6)],
      rotation: Math.random() * 720 - 360,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{
            y: "110vh",
            opacity: [1, 1, 0],
            rotate: p.rotation,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeIn",
          }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────

export default function CLangQuizClientPage() {
  const [phase, setPhase] = useState<Phase>("levelSelect");
  const [selectedLevel, setSelectedLevel] =
    useState<CLangLevel>("basics");
  const [selectedChapterId, setSelectedChapterId] = useState<string>("");
  const [progress, setProgress] = useState<QuizProgress>(loadProgress);

  // Quiz state
  const [questions, setQuestions] = useState<CLangQuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [xpEarned, setXpEarned] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showStreakBonus, setShowStreakBonus] = useState(false);
  const [heartShake, setHeartShake] = useState(false);

  // Result state
  const [displayXp, setDisplayXp] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  // Computed data
  const chaptersForLevel = useMemo(
    () => clangChapters.filter((ch) => ch.category === selectedLevel),
    [selectedLevel]
  );

  const questionsForChapter = useCallback(
    (chapterId: string) =>
      clangQuizQuestions.filter((q) => q.chapter === chapterId),
    []
  );

  const completedCountForLevel = useCallback(
    (level: CLangLevel) => {
      const chapters = clangChapters.filter(
        (ch) => ch.category === level
      );
      return chapters.filter((ch) => progress.lessons[ch.id]?.completed).length;
    },
    [progress]
  );

  // ── Quiz Actions ─────────────────────────────────────

  const startQuiz = useCallback((chapterId: string) => {
    const chapterQuestions = clangQuizQuestions.filter(
      (q) => q.chapter === chapterId
    );
    if (chapterQuestions.length === 0) return;
    setSelectedChapterId(chapterId);
    setQuestions(shuffleArray(chapterQuestions));
    setCurrentIndex(0);
    setAnswers({});
    setShowFeedback(false);
    setHearts(MAX_HEARTS);
    setXpEarned(0);
    setStreak(0);
    setMaxStreak(0);
    setIsGameOver(false);
    setShowStreakBonus(false);
    setHeartShake(false);
    setPhase("quiz");
  }, []);

  const selectAnswer = useCallback(
    (questionId: string, label: string) => {
      if (showFeedback || isGameOver) return;
      const currentQuestion = questions[currentIndex];
      const isCorrect = label === currentQuestion.correctLabel;

      setAnswers((prev) => ({ ...prev, [questionId]: label }));
      setShowFeedback(true);

      if (isCorrect) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        setMaxStreak((prev) => Math.max(prev, newStreak));
        let earned = XP_PER_CORRECT;
        if (newStreak >= STREAK_BONUS_THRESHOLD) {
          earned += STREAK_BONUS_XP;
          setShowStreakBonus(true);
          setTimeout(() => setShowStreakBonus(false), 1500);
        }
        setXpEarned((prev) => prev + earned);
      } else {
        setStreak(0);
        const newHearts = hearts - 1;
        setHearts(newHearts);
        setHeartShake(true);
        setTimeout(() => setHeartShake(false), 500);
        if (newHearts <= 0) {
          setIsGameOver(true);
        }
      }
    },
    [showFeedback, isGameOver, questions, currentIndex, streak, hearts]
  );

  const nextQuestion = useCallback(() => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setShowFeedback(false);
    } else {
      // Quiz complete - save progress
      setProgress((prev) => {
        const existing = prev.lessons[selectedChapterId];
        const newProgress: QuizProgress = {
          ...prev,
          lessons: {
            ...prev.lessons,
            [selectedChapterId]: {
              completed: true,
              bestXp: Math.max(existing?.bestXp ?? 0, xpEarned),
              attempts: (existing?.attempts ?? 0) + 1,
            },
          },
          totalXp: {
            ...prev.totalXp,
            [selectedLevel]:
              (prev.totalXp[selectedLevel] ?? 0) +
              Math.max(0, xpEarned - (existing?.bestXp ?? 0)),
          },
        };
        saveProgress(newProgress);
        return newProgress;
      });
      setPhase("result");
    }
  }, [
    currentIndex,
    questions,
    answers,
    selectedChapterId,
    selectedLevel,
    xpEarned,
  ]);

  const retryQuiz = useCallback(() => {
    startQuiz(selectedChapterId);
  }, [startQuiz, selectedChapterId]);

  const nextChapter = useCallback(() => {
    const currentChapterIndex = chaptersForLevel.findIndex(
      (ch) => ch.id === selectedChapterId
    );
    if (currentChapterIndex < chaptersForLevel.length - 1) {
      startQuiz(chaptersForLevel[currentChapterIndex + 1].id);
    } else {
      setPhase("levelSelect");
    }
  }, [chaptersForLevel, selectedChapterId, startQuiz]);

  const goToLevelSelect = useCallback(() => {
    setPhase("levelSelect");
  }, []);

  // ── Result XP count-up animation ────────────────────

  useEffect(() => {
    if (phase !== "result") {
      setDisplayXp(0);
      setShowCelebration(false);
      return;
    }
    if (xpEarned === 0) {
      setDisplayXp(0);
      return;
    }

    let current = 0;
    const step = Math.max(1, Math.floor(xpEarned / 30));
    const interval = setInterval(() => {
      current += step;
      if (current >= xpEarned) {
        current = xpEarned;
        clearInterval(interval);
      }
      setDisplayXp(current);
    }, 30);

    // Check if celebration should show
    const correctCount = questions.reduce(
      (acc, q) => acc + (answers[q.id] === q.correctLabel ? 1 : 0),
      0
    );
    const accuracy =
      questions.length > 0 ? correctCount / questions.length : 0;
    if (accuracy >= 0.7) {
      setTimeout(() => setShowCelebration(true), 500);
    }

    return () => clearInterval(interval);
  }, [phase, xpEarned, questions, answers]);

  // ── Computed quiz stats ──────────────────────────────

  const correctCount = useMemo(() => {
    return questions.reduce(
      (acc, q) => acc + (answers[q.id] === q.correctLabel ? 1 : 0),
      0
    );
  }, [questions, answers]);

  const accuracyPercent = useMemo(() => {
    if (questions.length === 0) return 0;
    return Math.round((correctCount / questions.length) * 100);
  }, [correctCount, questions.length]);

  // ── Phase 1: Level Select ────────────────────────────

  if (phase === "levelSelect") {
    const levels: CLangLevel[] = [
      "basics",
      "intermediate",
      "advanced",
      "expert",
    ];

    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Trophy className="h-8 w-8 text-[var(--color-dads-blue)]" />
            <h1 className="text-3xl md:text-4xl font-bold">
              C言語クイズ
            </h1>
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            C言語の基礎文法・中級・上級・実践の知識をクイズでテスト。レベルを選んで挑戦しましょう。
          </p>
          <div className="mt-2 text-sm text-muted-foreground">
            全 {clangQuizQuestions.length} 問収録
          </div>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {levels.map((level, index) => {
            const chapters = clangChapters.filter(
              (ch) => ch.category === level
            );
            const completed = completedCountForLevel(level);
            const total = chapters.length;
            const levelXp = progress.totalXp[level] ?? 0;
            const progressPercent =
              total > 0 ? Math.round((completed / total) * 100) : 0;

            return (
              <motion.div
                key={level}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <button
                  onClick={() => {
                    setSelectedLevel(level);
                    setPhase("chapterSelect");
                  }}
                  className="w-full text-left"
                >
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-current group overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="text-center">
                        <span className="text-4xl mb-2 block">
                          {LEVEL_EMOJI[level]}
                        </span>
                        <CardTitle
                          className="text-xl"
                          style={{ color: LEVEL_COLORS[level] }}
                        >
                          {LEVEL_LABELS[level]}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          チャプター
                        </span>
                        <span className="font-semibold">
                          {completed} / {total}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: LEVEL_COLORS[level] }}
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercent}%` }}
                          transition={{
                            duration: 0.6,
                            delay: index * 0.1 + 0.3,
                          }}
                        />
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">獲得XP</span>
                        <span className="font-semibold flex items-center gap-1">
                          <Zap className="h-3.5 w-3.5 text-[var(--color-dads-warning)]" />
                          {levelXp}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Phase 2: Chapter Select ──────────────────────────

  if (phase === "chapterSelect") {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={goToLevelSelect}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            レベル選択に戻る
          </button>

          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">{LEVEL_EMOJI[selectedLevel]}</span>
            <div>
              <h2
                className="text-2xl font-bold"
                style={{ color: LEVEL_COLORS[selectedLevel] }}
              >
                {LEVEL_LABELS[selectedLevel]}
              </h2>
              <p className="text-sm text-muted-foreground">
                チャプターを選んでクイズに挑戦
              </p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-3">
          {chaptersForLevel.map((chapter, index) => {
            const chapterQuestions = questionsForChapter(chapter.id);
            const lessonProgress = progress.lessons[chapter.id];
            const isCompleted = lessonProgress?.completed ?? false;

            return (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <button
                  onClick={() => startQuiz(chapter.id)}
                  disabled={chapterQuestions.length === 0}
                  className="w-full text-left"
                >
                  <Card
                    className={`transition-all hover:shadow-md cursor-pointer ${
                      chapterQuestions.length === 0
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    } ${
                      isCompleted
                        ? "border-[var(--color-dads-success)] bg-[var(--color-dads-success-light)]"
                        : ""
                    }`}
                  >
                    <CardContent className="flex items-center gap-4 py-4">
                      <div
                        className="flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-sm shrink-0"
                        style={{
                          backgroundColor: isCompleted
                            ? "var(--color-dads-success)"
                            : LEVEL_COLORS[selectedLevel],
                        }}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          index + 1
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm truncate">
                          {chapter.title}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {chapterQuestions.length} 問
                          {lessonProgress && (
                            <span className="ml-2">
                              ベスト: {lessonProgress.bestXp} XP
                            </span>
                          )}
                        </div>
                      </div>

                      {isCompleted && (
                        <Badge
                          variant="outline"
                          className="shrink-0 border-[var(--color-dads-success)] text-[var(--color-dads-success)]"
                        >
                          完了
                        </Badge>
                      )}

                      <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                    </CardContent>
                  </Card>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Phase 3: Quiz ────────────────────────────────────

  if (phase === "quiz") {
    // Game Over screen
    if (isGameOver) {
      return (
        <div className="container mx-auto px-4 py-8 max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="text-center space-y-6"
          >
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-2xl font-bold text-[var(--color-dads-error)]">
              ゲームオーバー
            </h2>
            <p className="text-muted-foreground">
              ハートがなくなりました。もう一度挑戦しましょう！
            </p>
            <div className="text-lg">
              獲得XP:{" "}
              <span className="font-bold text-[var(--color-dads-warning)]">
                {xpEarned}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={retryQuiz} size="lg">
                <RotateCcw className="h-4 w-4 mr-2" />
                もう一度
              </Button>
              <Button onClick={goToLevelSelect} variant="outline" size="lg">
                レベル選択に戻る
              </Button>
            </div>
          </motion.div>
        </div>
      );
    }

    const currentQuestion = questions[currentIndex];
    if (!currentQuestion) return null;

    const selectedAnswer = answers[currentQuestion.id];
    const isCorrect = selectedAnswer === currentQuestion.correctLabel;
    const progressPercent =
      ((currentIndex + (showFeedback ? 1 : 0)) / questions.length) * 100;

    return (
      <div className="min-h-screen flex flex-col">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
          <div className="container mx-auto px-4 py-3 max-w-3xl">
            <div className="flex items-center gap-4">
              {/* Close button */}
              <button
                onClick={() => setPhase("chapterSelect")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Progress bar */}
              <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: "var(--color-dads-success)" }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Hearts */}
              <motion.div
                className="flex items-center gap-1 shrink-0"
                animate={heartShake ? { x: [-4, 4, -4, 4, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                <Heart className="h-5 w-5 text-[var(--color-dads-error)] fill-[var(--color-dads-error)]" />
                <span className="font-bold text-[var(--color-dads-error)] text-sm">
                  {hearts}
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Question area */}
        <div className="flex-1 container mx-auto px-4 py-6 max-w-3xl">
          {/* Streak bonus floating text */}
          <AnimatePresence>
            {showStreakBonus && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: -10, scale: 1 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-2"
              >
                <span className="inline-block bg-[var(--color-dads-warning-light)] text-[var(--color-dads-warning)] px-3 py-1 rounded-full text-sm font-bold">
                  🔥 {streak}連続！+{STREAK_BONUS_XP} ボーナスXP
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Question text */}
              <div>
                <p className="text-xs text-muted-foreground mb-2">
                  問題 {currentIndex + 1} / {questions.length}
                </p>
                <h3 className="text-lg md:text-xl font-bold leading-relaxed">
                  {currentQuestion.question}
                </h3>
              </div>

              {/* Code block */}
              {currentQuestion.code && (
                <CodeBlock code={currentQuestion.code} />
              )}

              {/* Choice buttons */}
              <div className="space-y-3">
                {currentQuestion.choices.map((choice) => {
                  const isSelected = selectedAnswer === choice.label;
                  const isCorrectChoice =
                    choice.label === currentQuestion.correctLabel;

                  let borderColor = "border-border";
                  let bgColor = "bg-background";
                  let hoverClass =
                    "hover:bg-muted hover:border-muted-foreground/30";

                  if (showFeedback) {
                    hoverClass = "";
                    if (isCorrectChoice) {
                      borderColor = "border-[var(--color-dads-success)]";
                      bgColor = "bg-[var(--color-dads-success-light)]";
                    } else if (isSelected && !isCorrectChoice) {
                      borderColor = "border-[var(--color-dads-error)]";
                      bgColor = "bg-[var(--color-dads-error-light)]";
                    } else {
                      bgColor = "bg-background opacity-50";
                    }
                  }

                  return (
                    <button
                      key={choice.label}
                      onClick={() =>
                        selectAnswer(currentQuestion.id, choice.label)
                      }
                      disabled={showFeedback}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${borderColor} ${bgColor} ${hoverClass} ${
                        !showFeedback
                          ? "cursor-pointer active:scale-[0.98]"
                          : "cursor-default"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shrink-0 ${
                            showFeedback && isCorrectChoice
                              ? "bg-[var(--color-dads-success)] text-white"
                              : showFeedback && isSelected && !isCorrectChoice
                                ? "bg-[var(--color-dads-error)] text-white"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {choice.label}
                        </span>
                        <span className="text-sm pt-1 text-foreground flex-1">
                          {choice.text}
                        </span>
                        {showFeedback && isCorrectChoice && (
                          <CheckCircle2 className="h-5 w-5 text-[var(--color-dads-success)] shrink-0 mt-1" />
                        )}
                        {showFeedback && isSelected && !isCorrectChoice && (
                          <XCircle className="h-5 w-5 text-[var(--color-dads-error)] shrink-0 mt-1" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom feedback bar */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`sticky bottom-0 z-40 border-t-2 ${
                isCorrect
                  ? "bg-[var(--color-dads-success-light)] border-[var(--color-dads-success)]"
                  : "bg-[var(--color-dads-error-light)] border-[var(--color-dads-error)]"
              }`}
            >
              <div className="container mx-auto px-4 py-4 max-w-3xl">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="h-6 w-6 text-[var(--color-dads-success)] shrink-0" />
                          <span className="font-bold text-[var(--color-dads-success)] text-lg">
                            正解！
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-6 w-6 text-[var(--color-dads-error)] shrink-0" />
                          <span className="font-bold text-[var(--color-dads-error)] text-lg">
                            不正解
                          </span>
                        </>
                      )}
                    </div>
                    {!isCorrect && (
                      <p className="text-sm font-medium text-foreground mb-1">
                        正解:{" "}
                        {currentQuestion.correctLabel}.{" "}
                        {
                          currentQuestion.choices.find(
                            (c) => c.label === currentQuestion.correctLabel
                          )?.text
                        }
                      </p>
                    )}
                    <p className="text-sm text-foreground/80 leading-relaxed line-clamp-3">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                  <Button
                    onClick={nextQuestion}
                    size="lg"
                    className={`shrink-0 ${
                      isCorrect
                        ? "bg-[var(--color-dads-success)] hover:bg-[var(--color-dads-success)]/90 text-white"
                        : "bg-[var(--color-dads-error)] hover:bg-[var(--color-dads-error)]/90 text-white"
                    }`}
                  >
                    {currentIndex + 1 < questions.length
                      ? "続ける"
                      : "結果を見る"}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ── Phase 4: Results ─────────────────────────────────

  const answeredCount = Object.keys(answers).length;
  const chapterTitle =
    clangChapters.find((ch) => ch.id === selectedChapterId)?.title ?? "";
  const hasNextChapter = (() => {
    const idx = chaptersForLevel.findIndex(
      (ch) => ch.id === selectedChapterId
    );
    return idx < chaptersForLevel.length - 1;
  })();

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      {showCelebration && <CelebrationParticles />}

      {/* XP Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--color-dads-warning-light)] mb-4">
          <Zap className="h-10 w-10 text-[var(--color-dads-warning)]" />
        </div>
        <div className="text-5xl md:text-6xl font-bold text-[var(--color-dads-warning)] mb-1">
          {displayXp}
          <span className="text-xl ml-1">XP</span>
        </div>
        <p className="text-muted-foreground text-sm mt-1">{chapterTitle}</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="space-y-4 mb-8"
      >
        <Card>
          <CardContent className="py-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {accuracyPercent}%
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  正答率
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {maxStreak}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  最大連続
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1">
                  <Heart className="h-5 w-5 text-[var(--color-dads-error)] fill-[var(--color-dads-error)]" />
                  <span className="text-2xl font-bold text-foreground">
                    {hearts}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  残りハート
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          {correctCount} / {answeredCount} 問正解
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-3"
      >
        <Button
          onClick={retryQuiz}
          variant="outline"
          className="w-full"
          size="lg"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          もう一度
        </Button>
        {hasNextChapter && (
          <Button onClick={nextChapter} className="w-full" size="lg">
            次のチャプター
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
        <Button
          onClick={goToLevelSelect}
          variant="ghost"
          className="w-full"
          size="lg"
        >
          レベル選択に戻る
        </Button>
      </motion.div>
    </div>
  );
}
