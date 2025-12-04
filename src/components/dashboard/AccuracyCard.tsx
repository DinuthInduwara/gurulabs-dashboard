import { motion } from "framer-motion";
import { Target, TrendingUp } from "lucide-react";

export const AccuracyCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="card-yellow rounded-[2rem] p-6 relative overflow-hidden min-h-[200px]"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-accent-foreground/60 text-sm font-medium uppercase tracking-wider">
            MCQ Performance
          </span>
          <h3 className="text-accent-foreground text-lg font-semibold mt-1">
            Accuracy Rate
          </h3>
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center">
          <Target className="w-5 h-5 text-accent-foreground" />
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold text-accent-foreground">+80%</span>
        <div className="flex items-center gap-1 text-accent-foreground/70">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">+5%</span>
        </div>
      </div>

      {/* Progress Ring Visual */}
      <div className="absolute bottom-4 right-4 w-20 h-20">
        <svg viewBox="0 0 100 100" className="transform -rotate-90">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="12"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="rgba(120,80,20,0.6)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray="251.2"
            initial={{ strokeDashoffset: 251.2 }}
            animate={{ strokeDashoffset: 251.2 * 0.2 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </svg>
      </div>
    </motion.div>
  );
};
