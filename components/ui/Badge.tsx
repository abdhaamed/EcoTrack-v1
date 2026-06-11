// ASSIGNED TO: Hamid
import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "success" | "warning" | "error" | "info" | "neutral"
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "neutral", ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-component="Badge"
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-deep-forest",
          {
            "bg-feedback-success text-white": variant === "success",
            "bg-sapling-green text-charcoal": variant === "warning",
            "bg-feedback-error text-white": variant === "error",
            "bg-mist text-charcoal": variant === "info",
            "bg-bone text-charcoal": variant === "neutral",
          },
          className
        )}
        {...props}
      >
        {props.children || "Badge"}
      </div>
    )
  }
)
Badge.displayName = "Badge"
