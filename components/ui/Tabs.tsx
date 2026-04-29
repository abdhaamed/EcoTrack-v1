// ASSIGNED TO: Hamid
import * as React from "react"
import { cn } from "@/lib/utils"

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, defaultValue, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-component="Tabs"
        data-default-value={defaultValue}
        className={cn("flex flex-col", className)}
        {...props}
      >
        <div className="inline-flex h-10 items-center justify-center rounded-card bg-bone p-1 text-mist">
          {props.children || "Tabs"}
        </div>
      </div>
    )
  }
)
Tabs.displayName = "Tabs"
