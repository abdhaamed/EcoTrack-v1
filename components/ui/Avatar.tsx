// ASSIGNED TO: Hamid
import * as React from "react"
import { cn } from "@/lib/utils"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-component="Avatar"
        className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-bone", className)}
        {...props}
      >
        {src ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={src} alt={alt} className="aspect-square h-full w-full" />
        ) : (
          <span className="flex h-full w-full items-center justify-center rounded-full bg-bone text-charcoal">
            {alt ? alt.charAt(0).toUpperCase() : "A"}
          </span>
        )}
      </div>
    )
  }
)
Avatar.displayName = "Avatar"
