// ASSIGNED TO: Hamid
import * as React from "react"
import { cn } from "@/lib/utils"

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "error"
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-component="Toast"
        className={cn(
          "pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-card p-6 pr-8 shadow-lg transition-all",
          {
            "bg-charcoal text-parchment": variant === "default",
            "bg-feedback-error text-parchment": variant === "error",
          },
          className
        )}
        {...props}
      >
        {props.children || "Toast Message"}
      </div>
    )
  }
)
Toast.displayName = "Toast"
