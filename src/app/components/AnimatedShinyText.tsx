'use client';

import { CSSProperties, FC, ReactNode } from "react";
import { cn } from "../lib/utils";

interface AnimatedShinyTextProps {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
  isLight?: boolean;
}

const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 100,
  isLight = false,
}) => {
  return (
    <div
      style={
        {
          "--shiny-width": `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={cn(
        "inline-block",
        "animate-shiny-text bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shiny-width)_100%]",
        "bg-gradient-to-r from-transparent via-white/80 via-50% to-transparent",
        className,
      )}
    >
      {children}
    </div>
  );
};

export { AnimatedShinyText }; 