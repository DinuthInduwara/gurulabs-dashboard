import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, X, ZoomIn, ChevronDown } from "lucide-react";
import { Highlighter } from "@/components/ui/highlighter";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

interface Option {
  id: string;
  text: string;
  image?: string;
}

interface Question {
  id: number;
  question: string;
  image?: string;
  options: Option[];
  correctAnswer: string;
  explanation?: string;
  explanationImage?: string;
}

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  onAnswerSelect: (answerId: string) => void;
  isReviewMode: boolean;
  direction: number;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  isReviewMode,
  direction,
}: QuestionCardProps) => {
  const [explanationOpen, setExplanationOpen] = useState(false);
  const hasImageOptions = question.options.some((opt) => opt.image);

  const getOptionState = (optionId: string) => {
    if (!isReviewMode) {
      return selectedAnswer === optionId ? "selected" : "default";
    }
    
    if (optionId === question.correctAnswer) return "correct";
    if (selectedAnswer === optionId && optionId !== question.correctAnswer) return "wrong";
    return "default";
  };

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={question.id}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
        className="glass-card rounded-3xl p-6 md:p-8"
      >
        {/* Question Header */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-medium text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {question.id} marks
          </span>
        </div>

        {/* Question Text */}
        <h2 className="text-xl md:text-2xl font-semibold text-foreground leading-relaxed mb-6">
          {question.question}
        </h2>

        {/* Question Image */}
        {question.image && (
          <Dialog>
            <DialogTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative mb-8 cursor-pointer group"
              >
                <img
                  src={question.image}
                  alt="Question diagram"
                  className="w-full max-h-64 object-contain rounded-2xl shadow-lg"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-2xl flex items-center justify-center">
                  <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-2">
              <img
                src={question.image}
                alt="Question diagram"
                className="w-full h-auto rounded-xl"
              />
            </DialogContent>
          </Dialog>
        )}

        {/* Answer Options */}
        <RadioGroup
          value={selectedAnswer || ""}
          onValueChange={onAnswerSelect}
          disabled={isReviewMode}
          className={cn(
            "gap-4",
            hasImageOptions ? "grid grid-cols-2 md:grid-cols-4" : "flex flex-col"
          )}
        >
          {question.options.map((option, index) => {
            const state = getOptionState(option.id);
            const optionLabel = String.fromCharCode(65 + index); // A, B, C, D

            return (
              <motion.div
                key={option.id}
                whileHover={!isReviewMode ? { scale: 1.02 } : {}}
                whileTap={!isReviewMode ? { scale: 0.98 } : {}}
              >
                <Label
                  htmlFor={option.id}
                  className={cn(
                    "flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200",
                    hasImageOptions && "flex-col items-center text-center",
                    state === "default" && "border-border bg-card hover:border-primary/50 hover:bg-primary/5",
                    state === "selected" && "border-primary bg-primary/10",
                    state === "correct" && "border-emerald-500 bg-emerald-500/10",
                    state === "wrong" && "border-destructive bg-destructive/10",
                    isReviewMode && "cursor-default"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem
                      value={option.id}
                      id={option.id}
                      className={cn(
                        state === "correct" && "border-emerald-500 text-emerald-500",
                        state === "wrong" && "border-destructive text-destructive"
                      )}
                    />
                    <span className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold",
                      state === "default" && "bg-muted text-muted-foreground",
                      state === "selected" && "bg-primary text-primary-foreground",
                      state === "correct" && "bg-emerald-500 text-white",
                      state === "wrong" && "bg-destructive text-destructive-foreground"
                    )}>
                      {optionLabel}
                    </span>
                  </div>

                  {option.image && (
                    <img
                      src={option.image}
                      alt={`Option ${optionLabel}`}
                      className="w-full h-24 object-contain rounded-lg mb-2"
                    />
                  )}

                  <div className="flex-1">
                    {state === "correct" ? (
                      <div className="flex items-center gap-2">
                        <Highlighter action="underline" color="#22c55e">
                          <span className="text-base text-emerald-600 dark:text-emerald-400 font-medium">
                            {option.text}
                          </span>
                        </Highlighter>
                        <Check className="h-5 w-5 text-emerald-500" />
                      </div>
                    ) : state === "wrong" ? (
                      <div className="flex items-center gap-2">
                        <span className="text-base text-destructive font-medium line-through">
                          {option.text}
                        </span>
                        <X className="h-5 w-5 text-destructive" />
                      </div>
                    ) : (
                      <span className="text-base text-foreground">{option.text}</span>
                    )}
                  </div>
                </Label>
              </motion.div>
            );
          })}
        </RadioGroup>

        {/* Explanation Section */}
        {isReviewMode && question.explanation && (
          <Collapsible
            open={explanationOpen}
            onOpenChange={setExplanationOpen}
            className="mt-6"
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between rounded-2xl h-12"
              >
                <span className="font-medium">Show Explanation</span>
                <motion.div
                  animate={{ rotate: explanationOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-5 w-5" />
                </motion.div>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-5 rounded-2xl bg-muted/50 border border-border"
              >
                <p className="text-muted-foreground leading-relaxed">
                  {question.explanation}
                </p>
                {question.explanationImage && (
                  <img
                    src={question.explanationImage}
                    alt="Explanation diagram"
                    className="mt-4 rounded-xl max-h-48 object-contain"
                  />
                )}
              </motion.div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
