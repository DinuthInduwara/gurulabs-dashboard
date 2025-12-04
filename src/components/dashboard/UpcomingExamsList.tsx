import { motion } from "framer-motion";
import { FileText, Play } from "lucide-react";

interface ExamItem {
  id: string;
  title: string;
  subject: string;
  year: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

const upcomingExams: ExamItem[] = [
  { id: "1", title: "Mathematics Paper I", subject: "Mathematics", year: "2023", difficulty: "Medium" },
  { id: "2", title: "Physics Paper II", subject: "Physics", year: "2022", difficulty: "Hard" },
  { id: "3", title: "Chemistry MCQ", subject: "Chemistry", year: "2021", difficulty: "Easy" },
  { id: "4", title: "Biology Paper I", subject: "Biology", year: "2023", difficulty: "Medium" },
];

const difficultyColors = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-amber-100 text-amber-700",
  Hard: "bg-red-100 text-red-700",
};

export const UpcomingExamsList = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass-card rounded-[2rem] p-6 col-span-1 lg:col-span-2"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground">Upcoming Papers</h3>
          <p className="text-muted-foreground text-sm mt-1">Continue where you left off</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-primary font-medium text-sm hover:underline"
        >
          View All
        </motion.button>
      </div>

      <div className="space-y-3">
        {upcomingExams.map((exam, index) => (
          <motion.div
            key={exam.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
            whileHover={{ scale: 1.01, x: 5 }}
            className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 
                       hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground truncate">{exam.title}</h4>
              <p className="text-sm text-muted-foreground">
                {exam.subject} • {exam.year}
              </p>
            </div>

            <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[exam.difficulty]}`}>
              {exam.difficulty}
            </span>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center 
                         text-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Play className="w-4 h-4 ml-0.5" />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
