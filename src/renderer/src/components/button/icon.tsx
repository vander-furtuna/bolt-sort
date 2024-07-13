import { type ComponentProps, forwardRef } from 'react'

interface ButtonIconProps extends ComponentProps<'figure'> {}

export const ButtonIcon = forwardRef<HTMLDivElement, ButtonIconProps>(
  ({ children, ...props }, ref) => {
    return (
      <figure ref={ref} className="size-6 text-inherit" {...props}>
        {children}
      </figure>
    )
  },
)
ButtonIcon.displayName = 'ButtonIcon'
