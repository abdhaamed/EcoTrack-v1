// ASSIGNED TO: Hamid
import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "faint" | "outlined" | "ghost"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        data-component="Button"
        className={cn(
          "inline-flex items-center justify-center rounded-btn text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-forest disabled:pointer-events-none disabled:opacity-50 px-4 py-2",
          {
            "bg-deep-forest text-parchment hover:bg-deep-forest/90": variant === "primary",
            "bg-veridian-leaf text-parchment hover:bg-veridian-leaf/90": variant === "secondary",
            "bg-sapling-green text-charcoal hover:bg-sapling-green/80": variant === "faint",
            "border border-mist bg-transparent text-charcoal hover:bg-bone": variant === "outlined",
            "bg-transparent text-charcoal hover:bg-bone": variant === "ghost",
          },
          className
        )}
        {...props}
      >
        {props.children || "Button"}
      </button>
    )
  }
)
Button.displayName = "Button"
