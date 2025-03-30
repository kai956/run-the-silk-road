'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from "../../lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ColorfulButtonProps {
  label: string;
  href: string;
  className?: string;
  external?: boolean;
  icon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function ColorfulButton({
  label,
  href,
  className,
  external = false,
  icon = true,
  size = 'md',
}: ColorfulButtonProps) {
  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-2.5 px-6 text-base',
    lg: 'py-3 px-8 text-lg',
  };

  const content = (
    <div className={cn(
      "relative h-auto overflow-hidden rounded-3xl transition-all duration-200 group",
      sizeClasses[size],
      className
    )}>
      {/* Gradient background effect */}
      <div
        className={cn(
          "absolute inset-0",
          "bg-gradient-to-r from-[#4169E1] via-[#7B68EE] to-[#4A90E2]",
          "opacity-90 group-hover:opacity-100",
          "transition-opacity duration-300"
        )}
      />

      {/* Blur effect */}
      <div
        className={cn(
          "absolute inset-0",
          "bg-gradient-to-r from-[#4169E1] via-[#7B68EE] to-[#4A90E2]",
          "opacity-0 group-hover:opacity-30",
          "blur-md transition-opacity duration-300"
        )}
      />

      {/* Content */}
      <div className="relative flex items-center justify-center gap-2">
        <span className="font-medium text-white">{label}</span>
        {icon && <ArrowUpRight className="w-4 h-4 text-white/90" />}
      </div>
    </div>
  );

  if (external) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2"
      >
        {content}
      </a>
    );
  }

  return (
    <Link 
      href={href}
      className="inline-block focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2"
    >
      {content}
    </Link>
  );
} 