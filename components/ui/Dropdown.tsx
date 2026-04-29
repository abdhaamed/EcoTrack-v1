// ASSIGNED TO: Hamid
import * as React from "react"
import { cn } from "@/lib/utils"

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean
}

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ className, isOpen, ...props }, ref) => {
    if (!isOpen) return null
    return (
      <div
        ref={ref}
        data-component="Dropdown"
        className={cn(
          "absolute z-50 min-w-[8rem] overflow-hidden rounded-card bg-parchment p-1 text-charcoal shadow-md",
          className
        )}
        {...props}
      >
        {props.children || "Dropdown Content"}
      </div>
    )
  }
)
Dropdown.displayName = "Dropdown"
