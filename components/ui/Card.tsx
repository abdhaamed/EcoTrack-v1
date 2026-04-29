// ASSIGNED TO: Hamid
import * as React from "react"
import { cn } from "@/lib/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "bone" | "parchment"
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "bone", ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-component="Card"
        className={cn(
          "rounded-card text-charcoal shadow",
          {
            "bg-bone": variant === "bone",
            "bg-parchment": variant === "parchment",
          },
          className
        )}
        {...props}
      >
        {props.children || "Card"}
      </div>
    )
  }
)
Card.displayName = "Card"
