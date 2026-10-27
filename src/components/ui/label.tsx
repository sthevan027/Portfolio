import * as React from "react"

import { cn } from "@/lib/utils"

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("mb-1.5 block text-[15px] font-semibold text-ink", className)}
      {...props}
    />
  )
)
Label.displayName = "Label"

export { Label }
