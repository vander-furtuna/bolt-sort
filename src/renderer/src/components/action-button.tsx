import { type Icon } from '@phosphor-icons/react'
import type { ComponentProps } from 'react'

import { Button } from './button'
import type { ButtonVariants } from './button/root'

interface ActionButtonProps extends ComponentProps<'button'> {
  Icon: Icon
  apparence?: ButtonVariants['apparence']
  size?: ButtonVariants['size']
}

export function ActionButton({
  children,
  className,
  Icon,
  apparence,
  size,
  ...props
}: ActionButtonProps) {
  return (
    <Button.Root
      className={className}
      apparence={apparence}
      size={size}
      {...props}
    >
      <Button.Label>{children}</Button.Label>
      <Button.Icon>
        <Icon className="size-6 text-inherit" />
      </Button.Icon>
    </Button.Root>
  )
}
