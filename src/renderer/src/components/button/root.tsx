import { type ComponentProps, forwardRef } from 'react'

import { cn } from '../../lib/cn'

interface ButtonRootProps extends ComponentProps<'button'> {}

export const ButtonRoot = forwardRef<HTMLButtonElement, ButtonRootProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'mt-auto flex h-9 w-full items-center justify-between rounded-md bg-stone-750 px-3',
          className,
        )}
        {...props}
      >
        {children}
      </button>
    )
  },
)
ButtonRoot.displayName = 'ButtonRoot'
