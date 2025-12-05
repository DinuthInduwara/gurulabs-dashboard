import * as React from "react";
import { cn } from "@/lib/utils";

interface HighlighterProps {
  children: React.ReactNode;
  action?: "underline" | "highlight";
  color?: string;
  className?: string;
}

export const Highlighter: React.FC<HighlighterProps> = ({
  children,
  action = "underline",
  color = "#66fc3d",
  className,
}) => {
  if (action === "underline") {
    return (
      <span
        className={cn("relative inline-block", className)}
        style={{
          textDecoration: "none",
          backgroundImage: `linear-gradient(${color}, ${color})`,
          backgroundSize: "100% 3px",
          backgroundPosition: "0 100%",
          backgroundRepeat: "no-repeat",
          paddingBottom: "2px",
        }}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={cn("relative inline-block px-1 rounded", className)}
      style={{
        backgroundColor: `${color}40`,
        boxShadow: `0 0 8px ${color}60`,
      }}
    >
      {children}
    </span>
  );
};
