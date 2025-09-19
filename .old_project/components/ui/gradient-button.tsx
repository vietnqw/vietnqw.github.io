"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type GradientButtonSize = "sm" | "md" | "lg"

export interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: GradientButtonSize
}

export function GradientButton({
  className,
  children,
  size = "md",
  disabled,
  ...props
}: GradientButtonProps) {
  const sizeClasses =
    size === "sm"
      ? "px-3 py-2 text-xs"
      : size === "lg"
      ? "px-8 py-3 text-base"
      : "px-5 py-2.5 text-sm"

  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center rounded-xl transition-all duration-300 select-none cursor-pointer",
        "overflow-hidden",
        "font-semibold text-primary-foreground",
        "bg-gradient-to-r from-primary to-secondary",
        "hover:scale-102 hover:shadow-lg hover:shadow-primary/30",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/50 dark:focus-visible:ring-offset-zinc-900",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        "hover-glow",
        sizeClasses,
        className
      )}
      disabled={disabled}
      {...props}
    >
      {/* Lighter overlay */}
      <span aria-hidden className="absolute inset-0 bg-white/50" />
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  )
}

export default GradientButton
