import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Botões no vocabulário de placa: Barlow Condensed em caixa alta, chapa com
 * canto de 8px. Verde de rota (`route`) só para a ação de contato.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[8px] font-display font-bold uppercase tracking-wide transition-[transform,background-color,color] duration-200 ease-out disabled:pointer-events-none disabled:opacity-60 [&_svg]:h-5 [&_svg]:w-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        ink: "bg-ink text-paper hover:-translate-y-0.5",
        route: "bg-route text-white hover:bg-route-deep",
        sign: "bg-sign text-white hover:-translate-y-0.5",
        outlineSign: "border-2 border-sign text-sign hover:bg-sign hover:text-white",
        plate: "bg-white text-ink ring-[3px] ring-inset ring-ink hover:-translate-y-0.5",
        link: "px-1 text-ink underline decoration-2 underline-offset-[6px] hover:text-route-deep",
      },
      size: {
        default: "min-h-[52px] px-6 text-lg",
        sm: "min-h-[44px] px-3 text-[15px] [&_svg]:h-4 [&_svg]:w-4",
        lg: "min-h-[56px] px-7 text-xl",
      },
    },
    defaultVariants: {
      variant: "ink",
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
