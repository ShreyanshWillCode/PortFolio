import React from "react";
import { cn } from "./utils"; // Utility for merging class names (optional)

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent: React.FC<CardContentProps> = ({ className, children, ...props }) => {
  return (
    <div className={cn("p-4", className)} {...props}>
      {children}
    </div>
  );
};

export default CardContent;
