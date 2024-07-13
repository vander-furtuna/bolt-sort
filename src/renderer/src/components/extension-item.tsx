import { X } from '@phosphor-icons/react'

import type { Extension } from '~/src/shared/types/sorter'

interface ExtensionItemProps {
  extension: Extension
  isEditable?: boolean
}

export function ExtensionItem({ extension, isEditable }: ExtensionItemProps) {
  return (
    <div className="flex items-center gap-1 rounded-md bg-yellow-300 px-2 py-0.5">
      <span className="text-sm font-bold text-stone-800">{extension}</span>
      {isEditable && (
        <button className="transparent flex h-4 w-4 items-center justify-center rounded-md">
          <X size={16} className="text-stone-800" weight="bold" />
        </button>
      )}
    </div>
  )
}
