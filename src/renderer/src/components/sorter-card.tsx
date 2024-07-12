import { FolderOpen, FolderSimple } from '@phosphor-icons/react'
import { NavLink } from 'react-router-dom'

interface SorterCardProps {
  sorter: {
    id: string
    source: string
  }
}

export function SorterCard({ sorter }: SorterCardProps) {
  return (
    <NavLink
      to={`/sorter/${sorter.id}`}
      className="group flex h-9 w-full items-center rounded-md bg-stone-750 px-3 hover:bg-stone-700 aria-[current=page]:bg-yellow-400"
    >
      <div className="flex w-full items-center justify-normal gap-2">
        <FolderSimple
          className="block size-6 flex-shrink-0 text-stone-600 group-aria-[current=page]:hidden"
          weight="bold"
        />
        <FolderOpen
          className="hidden size-6 flex-shrink-0 text-stone-800 group-aria-[current=page]:block"
          weight="bold"
        />
        <span className="truncate text-sm font-medium text-stone-300 group-aria-[current=page]:text-stone-800">
          {sorter.source}
        </span>
      </div>
    </NavLink>
  )
}
