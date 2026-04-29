// ASSIGNED TO: Hamid
import * as React from "react"
import { cn } from "@/lib/utils"

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = "md", ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-component="Spinner"
        className={cn(
          "inline-block animate-spin rounded-full border-2 border-current border-t-transparent text-deep-forest",
          {
            "h-3 w-3": size === "sm",
            "h-4 w-4": size === "md",
            "h-6 w-6": size === "lg",
          },
          className
        )}
        {...props}
      >
        <span className="sr-only">Spinner</span>
      </div>
    )
  }
)
Spinner.displayName = "Spinner"
