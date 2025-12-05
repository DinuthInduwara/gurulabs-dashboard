import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Flag, CheckCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { QuestionPalette } from "@/components/quiz/QuestionPalette";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// Mock Questions Data
const mockQuestions = [
  {
    id: 1,
    question: "Which logic gate is represented by the following truth table?",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop",
    options: [
      { id: "a", text: "AND Gate" },
      { id: "b", text: "OR Gate" },
      { id: "c", text: "NAND Gate" },
      { id: "d", text: "XOR Gate" },
    ],
    correctAnswer: "b",
    explanation:
      "The truth table shows high output when any input is high, which characterizes an OR gate. In an OR gate, the output is 1 if at least one of the inputs is 1.",
  },
  {
    id: 2,
    question: "Calculate the acceleration of the object given: Initial velocity = 0 m/s, Final velocity = 49 m/s, Time = 5 seconds.",
    options: [
      { id: "a", text: "5 m/s²" },
      { id: "b", text: "10 m/s²" },
      { id: "c", text: "9.8 m/s²" },
      { id: "d", text: "0 m/s²" },
    ],
    correctAnswer: "c",
  },
  {
    id: 3,
    question: "What is the chemical formula for sulfuric acid?",
    options: [
      { id: "a", text: "HCl" },
      { id: "b", text: "H₂SO₄" },
      { id: "c", text: "HNO₃" },
      { id: "d", text: "H₃PO₄" },
    ],
    correctAnswer: "b",
    explanation:
      "Sulfuric acid has the chemical formula H₂SO₄. It consists of 2 hydrogen atoms, 1 sulfur atom, and 4 oxygen atoms. It is a strong mineral acid with many industrial applications.",
  },
  {
    id: 4,
    question: "In the diagram below, what is the value of angle x?",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&h=400&fit=crop",
    options: [
      { id: "a", text: "30°" },
      { id: "b", text: "45°" },
      { id: "c", text: "60°" },
      { id: "d", text: "90°" },
    ],
    correctAnswer: "c",
    explanation:
      "Using the property of angles in a triangle, where the sum of all angles equals 180°, we can calculate that x = 60°.",
  },
  {
    id: 5,
    question: "Which of the following is NOT a renewable energy source?",
    options: [
      { id: "a", text: "Solar Power" },
      { id: "b", text: "Wind Energy" },
      { id: "c", text: "Natural Gas" },
      { id: "d", text: "Hydroelectric Power" },
    ],
    correctAnswer: "c",
    explanation:
      "Natural gas is a fossil fuel formed from decomposed organic matter over millions of years. Unlike solar, wind, and hydroelectric power, it cannot be replenished within a human lifetime.",
  },
];

const QuizPage = () => {
  const navigate = useNavigate();
  const [activeNavItem, setActiveNavItem] = useState("papers");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Map<number, string>>(new Map());
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [questionResults, setQuestionResults] = useState<Map<number, boolean>>(new Map());
  const [direction, setDirection] = useState(0);

  const answeredQuestions = new Set(answers.keys());

  const handleAnswerSelect = useCallback((answerId: string) => {
    if (isReviewMode) return;
    setAnswers((prev) => new Map(prev).set(currentQuestion, answerId));
  }, [currentQuestion, isReviewMode]);

  const goToQuestion = useCallback((index: number) => {
    setDirection(index > currentQuestion ? 1 : -1);
    setCurrentQuestion(index);
  }, [currentQuestion]);

  const goNext = useCallback(() => {
    if (currentQuestion < mockQuestions.length - 1) {
      setDirection(1);
      setCurrentQuestion((prev) => prev + 1);
    }
  }, [currentQuestion]);

  const goPrev = useCallback(() => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion((prev) => prev - 1);
    }
  }, [currentQuestion]);

  const handleSubmit = useCallback(() => {
    // Calculate results
    const results = new Map<number, boolean>();
    mockQuestions.forEach((q, index) => {
      const userAnswer = answers.get(index);
      results.set(index, userAnswer === q.correctAnswer);
    });
    setQuestionResults(results);
    setIsReviewMode(true);

    // Calculate score
    const correctCount = Array.from(results.values()).filter(Boolean).length;
    const percentage = Math.round((correctCount / mockQuestions.length) * 100);

    toast({
      title: "Quiz Submitted!",
      description: `You scored ${correctCount}/${mockQuestions.length} (${percentage}%)`,
    });
  }, [answers]);

  const handleRetry = useCallback(() => {
    setAnswers(new Map());
    setIsReviewMode(false);
    setQuestionResults(new Map());
    setCurrentQuestion(0);
    setDirection(0);
  }, []);

  const score = isReviewMode
    ? Array.from(questionResults.values()).filter(Boolean).length
    : 0;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar activeItem={activeNavItem} onItemClick={setActiveNavItem} />

      {/* Main Content */}
      <main className="flex-1 lg:ml-20 pb-24 lg:pb-6">
        <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
          >
            <div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="mb-2 -ml-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Dashboard
              </Button>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Mathematics Paper 2023
              </h1>
              <p className="text-muted-foreground mt-1">
                {isReviewMode
                  ? `Review Mode • Score: ${score}/${mockQuestions.length}`
                  : `${mockQuestions.length} Questions • 60 Minutes`}
              </p>
            </div>

            {/* Timer / Score Badge */}
            <div className="flex items-center gap-3">
              {isReviewMode ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/30"
                >
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {Math.round((score / mockQuestions.length) * 100)}%
                  </span>
                </motion.div>
              ) : (
                <div className="px-4 py-2 rounded-2xl glass-card">
                  <span className="font-mono font-semibold text-foreground">
                    59:45
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Quiz Content Area */}
          <div className="flex gap-6">
            {/* Question Card */}
            <div className="flex-1 min-w-0">
              <QuestionCard
                question={mockQuestions[currentQuestion]}
                questionNumber={currentQuestion + 1}
                totalQuestions={mockQuestions.length}
                selectedAnswer={answers.get(currentQuestion) || null}
                onAnswerSelect={handleAnswerSelect}
                isReviewMode={isReviewMode}
                direction={direction}
              />

              {/* Navigation Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-between mt-6 gap-4"
              >
                <Button
                  variant="outline"
                  onClick={goPrev}
                  disabled={currentQuestion === 0}
                  className="btn-glossy rounded-2xl h-12 px-6"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <div className="flex items-center gap-3">
                  {isReviewMode ? (
                    <Button
                      onClick={handleRetry}
                      className="btn-glossy rounded-2xl h-12 px-6 bg-primary hover:bg-primary/90"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Retry Quiz
                    </Button>
                  ) : (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="btn-glossy rounded-2xl h-12 px-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                          <Flag className="h-4 w-4 mr-2" />
                          Submit Quiz
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="rounded-3xl">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Submit Quiz?</AlertDialogTitle>
                          <AlertDialogDescription>
                            You have answered {answeredQuestions.size} out of{" "}
                            {mockQuestions.length} questions.
                            {answeredQuestions.size < mockQuestions.length && (
                              <span className="block mt-2 text-amber-600 dark:text-amber-400">
                                ⚠️ You have {mockQuestions.length - answeredQuestions.size}{" "}
                                unanswered questions.
                              </span>
                            )}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-xl">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleSubmit}
                            className="rounded-xl bg-primary"
                          >
                            Submit
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>

                <Button
                  variant="outline"
                  onClick={goNext}
                  disabled={currentQuestion === mockQuestions.length - 1}
                  className="btn-glossy rounded-2xl h-12 px-6"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </motion.div>
            </div>

            {/* Question Palette */}
            <QuestionPalette
              totalQuestions={mockQuestions.length}
              currentQuestion={currentQuestion}
              answeredQuestions={answeredQuestions}
              onQuestionSelect={goToQuestion}
              isReviewMode={isReviewMode}
              questionResults={questionResults}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizPage;
