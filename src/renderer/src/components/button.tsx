import { type ComponentProps, forwardRef } from 'react'

interface ButtonProps extends ComponentProps<'button'> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className="rounded-md bg-blue-500 px-4 py-2 text-white"
        {...props}
      >
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'
