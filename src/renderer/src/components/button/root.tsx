import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentProps, forwardRef } from 'react'

import { cn } from '../../lib/cn'

const buttonRootVariants = cva(
  'flex h-10 items-center justify-between rounded-md px-3 gap-2',
  {
    variants: {
      apparence: {
        default: 'bg-stone-750 text-stone-300 font-medium',
        action: 'bg-yellow-400 text-stone-800 font-bold',
      },
      size: {
        fit: 'w-fit',
        fill: 'w-full',
      },
    },
    defaultVariants: {
      apparence: 'default',
      size: 'fit',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonRootVariants>

interface ButtonRootProps extends ComponentProps<'button'>, ButtonVariants {}

export const ButtonRoot = forwardRef<HTMLButtonElement, ButtonRootProps>(
  ({ children, className, apparence, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonRootVariants({ className, size, apparence }))}
        {...props}
      >
        {children}
      </button>
    )
  },
)
ButtonRoot.displayName = 'ButtonRoot'
