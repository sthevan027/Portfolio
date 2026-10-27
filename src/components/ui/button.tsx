import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Botões do sistema v2: ação principal em azul (`route`), secundária em contorno,
 * apoio em escuro (`ink`) e link discreto. Sem caixa alta; alvo de toque de 44px.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold tracking-tight transition-[transform,background-color,color,border-color] duration-200 ease-out disabled:pointer-events-none disabled:opacity-60 [&_svg]:h-5 [&_svg]:w-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        route: "bg-sign text-white shadow-[0_8px_20px_-10px_rgb(37_99_235/0.7)] hover:bg-route-deep hover:-translate-y-0.5",
        sign: "bg-sign text-white shadow-[0_8px_20px_-10px_rgb(37_99_235/0.7)] hover:bg-route-deep hover:-translate-y-0.5",
        ink: "bg-ink text-white hover:-translate-y-0.5",
        outlineSign: "border-2 border-sign text-sign hover:bg-sign hover:text-white",
        plate: "border border-line bg-white text-ink hover:bg-paper",
        link: "px-1 text-ink underline decoration-2 underline-offset-[6px] hover:text-route-deep",
      },
      size: {
        default: "min-h-[48px] px-5 text-base",
        sm: "min-h-[44px] px-4 text-[15px] [&_svg]:h-4 [&_svg]:w-4",
        lg: "min-h-[52px] px-6 text-[17px]",
      },
    },
    defaultVariants: {
      variant: "route",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
