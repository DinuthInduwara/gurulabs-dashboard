import { motion } from "framer-motion";
import { Flame, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PastPaperCard = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="card-purple rounded-[2rem] p-6 md:p-8 relative overflow-hidden col-span-1 lg:col-span-2 min-h-[280px] flex flex-col"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      
      {/* Flame Icon */}
      <motion.div 
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-6 right-6 md:top-8 md:right-8"
      >
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <Flame className="w-8 h-8 md:w-10 md:h-10 text-white" />
        </div>
      </motion.div>

      <div className="relative z-10 flex flex-col h-full">
        <span className="text-white/70 text-sm font-medium uppercase tracking-wider mb-2">
          Featured Challenge
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Past Paper Challenge
        </h2>
        <p className="text-white/80 text-base md:text-lg mb-auto max-w-xs">
          Start the 2023 Mathematics Paper now and test your skills.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/quiz")}
          className="btn-glossy mt-6 self-start flex items-center gap-2 px-6 py-3 
                     bg-white/20 backdrop-blur-sm rounded-2xl text-white font-semibold
                     border border-white/30 hover:bg-white/30 transition-colors"
        >
          Start Now
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};
