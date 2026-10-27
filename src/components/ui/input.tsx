import * as React from "react"

import { cn } from "@/lib/utils"

const fieldBase =
  "w-full rounded-xl border border-line bg-white px-3.5 py-3 text-[1rem] text-ink placeholder:text-steel/70 focus:border-sign focus:outline-none focus:ring-2 focus:ring-sign/30 disabled:cursor-not-allowed disabled:opacity-60 aria-[invalid=true]:border-destructive"

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "text", ...props }, ref) => (
    <input type={type} ref={ref} className={cn(fieldBase, className)} {...props} />
  )
)
Input.displayName = "Input"

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn(fieldBase, "resize-y", className)} {...props} />
  )
)
Textarea.displayName = "Textarea"

export { Input, Textarea }
