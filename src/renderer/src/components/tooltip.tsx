import * as RadixTooltip from '@radix-ui/react-tooltip'
import { type ReactNode, useState } from 'react'

import { cn } from '../lib/cn'

interface TooltipProps {
  children: ReactNode
  title: string
  className?: string
  side?: RadixTooltip.TooltipContentProps['side']
  disabled?: boolean
}

export function Tooltip({
  children,
  title,
  className,
  side = 'bottom',
  disabled,
}: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false)

  function handleOpenChange(open: boolean) {
    if (disabled) {
      setIsOpen(false)
      return
    }
    setIsOpen(open)
  }

  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root open={isOpen} onOpenChange={handleOpenChange}>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side}
            className={cn(
              'z-30 select-none rounded-sm bg-stone-800 px-3 py-2 text-sm font-normal leading-none text-stone-100 will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade group-data-[open=true]:bg-red-500',
              className,
            )}
            sideOffset={2}
          >
            {title}
            <RadixTooltip.Arrow className="fill-stone-800" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}
