'use client';

import React from "react";
import { cn } from "../../lib/utils";
import { FaArrowRight } from 'react-icons/fa';

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  href?: string;
  external?: boolean;
  color?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ 
  text = "Button", 
  className, 
  href, 
  external = false,
  color = "#1E1E4A",
  ...props 
}, ref) => {
  // Calculate dynamic width based on text length and language
  const textLength = text.length;
  
  // Check if text is Russian by looking for Cyrillic characters
  const isRussian = /[А-Яа-я]/.test(text);
  
  // Apply a larger multiplier for Russian text
  const multiplier = isRussian ? 18 : 14;
  const baseWidth = isRussian ? 200 : 160;
  
  // Base width + additional width per character (increased for Russian)
  const minWidth = Math.max(baseWidth, textLength * multiplier);
  
  const buttonContent = (
    <button
      ref={ref}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-full border bg-white p-2 px-6 py-3 text-center font-medium",
        className,
      )}
      style={{ 
        borderColor: color,
        minWidth: `${minWidth}px`
      }}
      {...props}
    >
      <span 
        className="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0"
        style={{ color }}
      >
        {text}
      </span>
      <div 
        className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100"
      >
        <span>{text}</span>
        <FaArrowRight className="text-sm" />
      </div>
      <div 
        className={cn(
          "absolute top-[40%] h-2 w-2 scale-[1] rounded-lg transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8]",
          isRussian ? "left-[15%]" : "left-[20%]"
        )}
        style={{ backgroundColor: color }}
      ></div>
    </button>
  );

  if (href) {
    return (
      <a 
        href={href} 
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="inline-block"
      >
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton }; 