import { motion } from "framer-motion";
import { Search, Bell, User } from "lucide-react";

export const TopBar = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between gap-4 mb-8"
    >
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search papers, subjects..."
            className="w-full h-12 pl-12 pr-4 rounded-2xl bg-card border border-border/50 
                       text-foreground placeholder:text-muted-foreground
                       focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50
                       transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-11 h-11 rounded-2xl bg-card border border-border/50 
                     flex items-center justify-center text-muted-foreground 
                     hover:text-foreground hover:border-primary/30 transition-all shadow-sm"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-primary/80 
                     flex items-center justify-center text-primary-foreground shadow-card-purple"
        >
          <User className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.header>
  );
};
