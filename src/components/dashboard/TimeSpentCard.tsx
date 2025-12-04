import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export const TimeSpentCard = () => {
  const barHeights = [40, 65, 45, 80, 55, 70, 90];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="card-blue rounded-[2rem] p-6 relative overflow-hidden min-h-[200px]"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-secondary-foreground/60 text-sm font-medium uppercase tracking-wider">
            This Week
          </span>
          <h3 className="text-secondary-foreground text-lg font-semibold mt-1">
            Time Spent
          </h3>
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center">
          <Clock className="w-5 h-5 text-secondary-foreground" />
        </div>
      </div>

      <div className="text-4xl font-bold text-secondary-foreground mb-4">
        32h
      </div>

      {/* Mini Bar Chart */}
      <div className="flex items-end gap-2 h-16">
        {barHeights.map((height, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            className="flex-1 bg-secondary-foreground/20 rounded-t-lg"
          />
        ))}
      </div>
    </motion.div>
  );
};
