'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
} from '@/components/animate-ui/primitives/buttons/button';
import { cn } from '@/lib/utils';
import {
  Particles,
  ParticlesEffect,
} from '@/components/animate-ui/primitives/effects/particles';

const buttonVariants = cva(
  "flex items-center justify-center rounded-md transition-[box-shadow,_color,_background-color,_border-color,_outline-color,_text-decoration-color,_fill,_stroke] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        accent: 'bg-accent text-accent-foreground shadow-xs hover:bg-accent/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        glass: cn(
          'bg-gradient-to-br from-[#fafafa] to-[#e8e8e8] text-zinc-600',
          'dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-950 dark:text-zinc-200',
          'shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_1px_rgba(0,0,0,0.06),0_8px_16px_-6px_rgba(0,0,0,0.2),0_2px_4px_rgba(0,0,0,0.08)]',
          'dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),inset_0_-1px_1px_rgba(0,0,0,0.35),0_8px_16px_-6px_rgba(0,0,0,0.65),0_2px_4px_rgba(0,0,0,0.4)]',
          'hover:-translate-y-0.5 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),inset_0_-1px_1px_rgba(0,0,0,0.07),0_12px_20px_-6px_rgba(0,0,0,0.25),0_4px_8px_rgba(0,0,0,0.1)]',
          'dark:hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),inset_0_-1px_1px_rgba(0,0,0,0.4),0_12px_20px_-6px_rgba(0,0,0,0.7),0_4px_8px_rgba(0,0,0,0.45)]',
          'active:translate-y-0 active:scale-90 active:shadow-[inset_0_2px_3px_rgba(0,0,0,0.18),inset_0_-1px_1px_rgba(255,255,255,0.4)]',
          'dark:active:shadow-[inset_0_2px_3px_rgba(0,0,0,0.5),inset_0_-1px_1px_rgba(255,255,255,0.05)]',
          'transition-[transform,box-shadow] duration-300 ease-out',
        ),
      },
      size: {
        default: 'size-9',
        xs: "size-7 [&_svg:not([class*='size-'])]:size-3.5 rounded-md",
        sm: 'size-8 rounded-md',
        lg: 'size-10 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
    compoundVariants: [
      {
        variant: 'glass',
        size: ['default', 'xs', 'sm', 'lg'],
        class: 'rounded-2xl',
      },
    ],
  },
);

type IconButtonProps = Omit<ButtonPrimitiveProps, 'asChild'> &
  VariantProps<typeof buttonVariants> & {
    children?: React.ReactNode;
  };

function IconButton({
  className,
  onClick,
  variant,
  size,
  children,
  ...props
}: IconButtonProps) {
  const [isActive, setIsActive] = React.useState(false);
  const [key, setKey] = React.useState(0);

  return (
    <Particles asChild animate={isActive} key={key}>
      <ButtonPrimitive
        data-slot="icon-button"
        className={cn(buttonVariants({ variant, size, className }))}
        onClick={(e) => {
          setKey((prev) => prev + 1);
          setIsActive(true);
          onClick?.(e);
        }}
        {...props}
      >
        {children}
        <ParticlesEffect
          data-variant={variant}
          className="bg-neutral-500 size-1 rounded-full"
        />
      </ButtonPrimitive>
    </Particles>
  );
}

export { IconButton, buttonVariants, type IconButtonProps };
