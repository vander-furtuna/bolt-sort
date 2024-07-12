import { X } from '@phosphor-icons/react'

interface ExtensionItemProps {
  extension: {
    name: string
  }
  isEditable?: boolean
}

export function ExtensionItem({ extension, isEditable }: ExtensionItemProps) {
  return (
    <div className="flex items-center gap-1 rounded-md bg-yellow-400 px-2 py-0.5">
      <span className="text-sm font-bold text-stone-800">{extension.name}</span>
      {isEditable && (
        <button className="transparent flex h-4 w-4 items-center justify-center rounded-md">
          <X size={16} className="text-stone-800" weight="bold" />
        </button>
      )}
    </div>
  )
}
