import { type ComponentProps, forwardRef } from 'react'

interface ButtonLabelProps extends ComponentProps<'span'> {}

export const ButtonLabel = forwardRef<HTMLSpanElement, ButtonLabelProps>(
  ({ children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className="text-collapsible text-sm text-stone-300"
        {...props}
      >
        {children}
      </span>
    )
  },
)
ButtonLabel.displayName = 'ButtonLabel'