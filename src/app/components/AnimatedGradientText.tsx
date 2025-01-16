'use client';

import { ReactNode } from "react";
import { cn } from "../lib/utils";

export function AnimatedGradientText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex max-w-fit flex-row items-center rounded-2xl bg-white px-4 py-1.5 shadow-md",
        className,
      )}
    >
      <span className="text-lg font-medium bg-gradient-to-r from-[#4169E1] to-[#7B68EE] bg-clip-text text-transparent">
        {children}
      </span>
    </div>
  );
} 