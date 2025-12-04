import { useState } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { PastPaperCard } from "@/components/dashboard/PastPaperCard";
import { TimeSpentCard } from "@/components/dashboard/TimeSpentCard";
import { AccuracyCard } from "@/components/dashboard/AccuracyCard";
import { PremiumCard } from "@/components/dashboard/PremiumCard";
import { UpcomingExamsList } from "@/components/dashboard/UpcomingExamsList";

const Index = () => {
  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />

      {/* Main Content */}
      <main className="md:ml-28 px-4 md:px-8 py-6 pb-24 md:pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-2"
          >
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Welcome back, <span className="text-gradient-purple">Student</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              Let's continue your learning journey today.
            </p>
          </motion.div>

          {/* Top Bar */}
          <TopBar />

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Past Paper Challenge - spans 2 cols on lg */}
            <PastPaperCard />

            {/* Time Spent Stats */}
            <TimeSpentCard />

            {/* MCQ Accuracy */}
            <AccuracyCard />

            {/* Upcoming Exams List - spans 2 cols on lg */}
            <UpcomingExamsList />

            {/* Premium Upgrade */}
            <PremiumCard />

            {/* Quick Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-card rounded-[2rem] p-6 flex flex-col justify-between min-h-[200px]"
            >
              <div>
                <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
                  Completed
                </span>
                <h3 className="text-foreground text-lg font-semibold mt-1">
                  Papers Done
                </h3>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-4xl font-bold text-foreground">24</span>
                <span className="text-muted-foreground text-sm">of 150 total</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "16%" }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
