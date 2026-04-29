// ASSIGNED TO: Hamid
import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        data-component="Textarea"
        className={cn(
          "flex min-h-[80px] w-full rounded-input bg-bone px-3 py-2 text-sm text-charcoal placeholder:text-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-forest disabled:cursor-not-allowed disabled:opacity-50",
          error && "border border-feedback-error focus-visible:ring-feedback-error",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"
