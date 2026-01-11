"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ theme: themeProp, className, style, ...props }: ToasterProps) => {
  const { theme: themeFromContext = "system" } = useTheme();
  
  const isValidTheme = (t: string): t is ToasterProps["theme"] => {
    return t === "light" || t === "dark" || t === "system";
  };
  
  const safeTheme = themeProp ?? (isValidTheme(themeFromContext) ? themeFromContext : "system");

  return (
    <Sonner
      {...props}
      theme={safeTheme}
      className={className ?? "toaster group"}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          ...style,
        } as React.CSSProperties
      }
    />
  );
};

export { Toaster };
