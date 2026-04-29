// ASSIGNED TO: Hamid
import * as React from "react"
import { cn } from "@/lib/utils"

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  variant?: "primary" | "secondary" | "faint"
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value = 0, variant = "primary", ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-component="ProgressBar"
        className={cn("relative h-4 w-full overflow-hidden rounded-full bg-bone", className)}
        {...props}
      >
        <div
          className={cn("h-full w-full flex-1 transition-all", {
            "bg-deep-forest": variant === "primary",
            "bg-veridian-leaf": variant === "secondary",
            "bg-sapling-green": variant === "faint",
          })}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
        <span className="sr-only">ProgressBar</span>
      </div>
    )
  }
)
ProgressBar.displayName = "ProgressBar"
