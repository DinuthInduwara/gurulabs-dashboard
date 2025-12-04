import { motion } from "framer-motion";
import { Crown, Sparkles } from "lucide-react";

export const PremiumCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="card-dark rounded-[2rem] p-6 relative overflow-hidden min-h-[200px] flex flex-col"
    >
      {/* Gradient accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-2xl" />
      
      <div className="flex items-start justify-between mb-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
          <Crown className="w-6 h-6 text-white" />
        </div>
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-5 h-5 text-primary" />
        </motion.div>
      </div>

      <h3 className="text-white text-lg font-bold mb-2">
        Upgrade to Pro
      </h3>
      <p className="text-white/60 text-sm mb-auto">
        Unlock all A/L Science stream papers and advanced analytics.
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn-glossy mt-4 w-full py-3 bg-gradient-to-r from-primary to-primary/80 
                   rounded-xl text-white font-semibold shadow-lg"
      >
        Upgrade Now
      </motion.button>
    </motion.div>
  );
};
