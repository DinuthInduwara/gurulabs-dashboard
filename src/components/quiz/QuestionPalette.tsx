import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

interface QuestionPaletteProps {
  totalQuestions: number;
  currentQuestion: number;
  answeredQuestions: Set<number>;
  onQuestionSelect: (index: number) => void;
  isReviewMode: boolean;
  questionResults?: Map<number, boolean>; // true = correct, false = wrong
}

export const QuestionPalette = ({
  totalQuestions,
  currentQuestion,
  answeredQuestions,
  onQuestionSelect,
  isReviewMode,
  questionResults,
}: QuestionPaletteProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getButtonVariant = (index: number) => {
    if (isReviewMode && questionResults) {
      const isCorrect = questionResults.get(index);
      if (isCorrect === true) return "correct";
      if (isCorrect === false) return "wrong";
    }
    if (index === currentQuestion) return "current";
    if (answeredQuestions.has(index)) return "answered";
    return "unanswered";
  };

  const PaletteGrid = () => (
    <div className="grid grid-cols-5 gap-2">
      {Array.from({ length: totalQuestions }, (_, i) => {
        const variant = getButtonVariant(i);
        return (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onQuestionSelect(i)}
            className={cn(
              "w-10 h-10 rounded-xl font-semibold text-sm transition-all duration-200",
              variant === "unanswered" && "bg-muted text-muted-foreground hover:bg-muted/80",
              variant === "current" && "bg-primary/10 text-primary ring-2 ring-primary",
              variant === "answered" && "bg-primary text-primary-foreground",
              variant === "correct" && "bg-emerald-500 text-white",
              variant === "wrong" && "bg-destructive text-destructive-foreground"
            )}
          >
            {i + 1}
          </motion.button>
        );
      })}
    </div>
  );

  const Legend = () => (
    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-4">
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 rounded bg-muted" />
        <span>Unanswered</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 rounded bg-primary" />
        <span>Answered</span>
      </div>
      {isReviewMode && (
        <>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-emerald-500" />
            <span>Correct</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-destructive" />
            <span>Wrong</span>
          </div>
        </>
      )}
    </div>
  );

  // Mobile Sheet
  const MobilePalette = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden fixed bottom-24 right-4 z-40 rounded-full h-14 w-14 shadow-lg glass-card"
        >
          <Grid3X3 className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px]">
        <SheetHeader>
          <SheetTitle>Question Navigator</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <PaletteGrid />
          <Legend />
        </div>
      </SheetContent>
    </Sheet>
  );

  // Desktop Collapsible Panel
  const DesktopPalette = () => (
    <motion.div
      initial={{ width: 240 }}
      animate={{ width: isCollapsed ? 48 : 240 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="hidden lg:block h-fit sticky top-6"
    >
      <div className="glass-card rounded-3xl overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            {!isCollapsed && (
              <h3 className="font-semibold text-foreground">Questions</h3>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 w-8 rounded-lg"
            >
              {isCollapsed ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PaletteGrid />
              <Legend />
            </motion.div>
          )}
          
          {isCollapsed && (
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {currentQuestion + 1}/{totalQuestions}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      <MobilePalette />
      <DesktopPalette />
    </>
  );
};
