"use client"

import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface AnimatedGradientProps {
  className?: string
  children?: ReactNode
}

export function AnimatedGradient({ className, children }: AnimatedGradientProps) {
  return (
    <div
      className={cn(
        "bg-gradient-to-r from-green-300 via-blue-300 to-emerald-300 background-animate",
        className
      )}
    >
      {children}
    </div>
  )
} 