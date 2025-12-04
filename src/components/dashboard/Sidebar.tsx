import { motion } from "framer-motion";
import {
  LayoutGrid,
  MessageSquare,
  FolderOpen,
  BookOpen,
  BarChart3,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

const menuItems = [
  { id: "dashboard", icon: LayoutGrid, label: "Dashboard" },
  { id: "messages", icon: MessageSquare, label: "Messages" },
  { id: "papers", icon: FolderOpen, label: "Papers" },
  { id: "subjects", icon: BookOpen, label: "Subjects" },
  { id: "stats", icon: BarChart3, label: "Statistics" },
  { id: "settings", icon: Settings, label: "Settings" },
];

export const Sidebar = ({ activeItem = "dashboard", onItemClick }: SidebarProps) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="hidden md:flex fixed left-4 top-4 bottom-4 w-20 z-50"
      >
        <div className="flex flex-col items-center w-full py-6 bg-sidebar rounded-[2rem] shadow-glass-lg">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center mb-8 shadow-card-purple"
          >
            <span className="text-xl font-bold text-white">G</span>
          </motion.div>

          {/* Navigation */}
          <nav className="flex-1 flex flex-col items-center gap-2">
            {menuItems.slice(0, 5).map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onItemClick?.(item.id)}
                className={cn(
                  "sidebar-icon",
                  activeItem === item.id && "active"
                )}
                title={item.label}
              >
                <item.icon className="w-5 h-5" />
              </motion.button>
            ))}
          </nav>

          {/* Settings at bottom */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onItemClick?.("settings")}
            className={cn(
              "sidebar-icon mt-auto",
              activeItem === "settings" && "active"
            )}
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.aside>

      {/* Mobile Bottom Navigation */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="md:hidden bottom-nav"
      >
        <div className="flex items-center justify-around py-3 px-4">
          {menuItems.slice(0, 5).map((item) => (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => onItemClick?.(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-xl transition-colors",
                activeItem === item.id
                  ? "text-primary"
                  : "text-sidebar-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.nav>
    </>
  );
};
