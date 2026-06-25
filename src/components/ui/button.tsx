import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "type-button inline-flex items-center justify-center gap-2 rounded-md text-center font-medium cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent/10 hover:border-accent/40 hover:text-foreground",
        secondary:
          "border border-border bg-secondary/80 text-secondary-foreground shadow-sm hover:bg-secondary hover:border-accent/30",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-accent text-accent-foreground font-semibold shadow-[var(--shadow-glow)] hover:brightness-105 hover:-translate-y-0.5",
        heroOutline:
          "border border-border bg-card/80 text-foreground backdrop-blur-md hover:border-accent/45 hover:bg-elevated hover:-translate-y-0.5",
        dark: "bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5",
      },
      size: {
        default: "min-h-9 px-4 py-2",
        sm: "min-h-8 rounded-md px-3 py-1.5",
        lg: "min-h-10 rounded-md px-8 py-2.5",
        icon: "size-9 shrink-0",
        xl: "min-h-12 rounded-full px-8 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
