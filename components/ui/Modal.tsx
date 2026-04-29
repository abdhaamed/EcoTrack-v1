// ASSIGNED TO: Hamid
import * as React from "react"
import { cn } from "@/lib/utils"

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ className, isOpen, ...props }, ref) => {
    if (!isOpen) return null
    return (
      <div
        ref={ref}
        data-component="Modal"
        className={cn("fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-sm", className)}
        {...props}
      >
        <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 bg-parchment text-charcoal p-6 shadow-lg sm:rounded-card">
          {props.children || "Modal Content"}
        </div>
      </div>
    )
  }
)
Modal.displayName = "Modal"
