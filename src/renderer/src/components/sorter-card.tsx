import { FolderOpen, FolderSimple } from '@phosphor-icons/react'
import { NavLink } from 'react-router-dom'

import { Tooltip } from './tooltip'

interface SorterCardProps {
  sorter: {
    id: string
    source: string
  }
  isSidebarOpen: boolean
}

export function SorterCard({ sorter, isSidebarOpen }: SorterCardProps) {
  return (
    <Tooltip title={sorter.source} side="right" disabled={isSidebarOpen}>
      <NavLink
        to={`/sorter/${sorter.id}`}
        className="group flex h-9 w-full items-center rounded-md bg-stone-750 px-3 hover:bg-stone-700 aria-[current=page]:bg-yellow-300"
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
          <span className="text-collapsible flex truncate text-sm font-medium text-stone-300 group-aria-[current=page]:text-stone-800">
            {sorter.source}
          </span>
        </div>
      </NavLink>
    </Tooltip>
  )
}
