'use client';

import React from 'react';
import { cn } from "../../../lib/utils";

type TColorProp = string | string[];

interface ShineBorderProps {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: TColorProp;
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
}

export default function ShineBorder({
  borderRadius = 9999,
  borderWidth = 1,
  duration = 4,
  color = "#3b82f6",
  className,
  children,
  hover = false,
}: ShineBorderProps) {
  return (
    <div
      style={
        {
          "--border-radius": `${borderRadius}px`,
        } as React.CSSProperties
      }
      className={cn(
        "relative w-fit place-items-center rounded-[--border-radius] bg-white dark:bg-black transition-transform duration-300 ease-out",
        hover && "hover:scale-105",
        className,
      )}
    >
      <div
        style={
          {
            "--border-width": `${borderWidth}px`,
            "--border-radius": `${borderRadius}px`,
            "--duration": `${duration}s`,
            "--mask-linear-gradient": `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            "--background-radial-gradient": `radial-gradient(transparent,transparent, ${color instanceof Array ? color.join(",") : color},transparent,transparent)`,
          } as React.CSSProperties
        }
        className={cn(
          "pointer-events-none before:absolute before:inset-0 before:size-full before:rounded-[--border-radius] before:p-[--border-width] before:will-change-[background-position] before:content-[''] before:![-webkit-mask-composite:xor] before:![mask-composite:exclude] before:[background-image:--background-radial-gradient] before:[background-size:300%_300%] before:[mask:--mask-linear-gradient]",
          !hover && "motion-safe:before:animate-shine",
          hover && "motion-safe:group-hover:before:animate-shine"
        )}
      />
      {children}
    </div>
  );
} 