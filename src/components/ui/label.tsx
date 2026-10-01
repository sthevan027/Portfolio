import * as React from "react"

import { cn } from "@/lib/utils"

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("mb-1.5 block font-display text-[15px] font-bold uppercase tracking-wider text-ink", className)}
      {...props}
    />
  )
)
Label.displayName = "Label"

export { Label }
