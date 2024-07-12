import { FolderSimplePlus } from '@phosphor-icons/react'
import { useMutation, useQuery } from '@tanstack/react-query'

import type { FetchAllSortersResponse } from '~/src/shared/types/sorter'

import logo from '../assets/images/logo.svg'
import { queryClient } from '../lib/react-query'
import { getFolderPath } from '../utils/get-folder-path'
import { SorterCard } from './sorter-card'

export function Sidebar() {
  const { data } = useQuery({
    queryKey: ['sorters'],
    queryFn: () => window.api.sorter.fetchAll(),
  })

  const { mutate: createSorter } = useMutation({
    mutationFn: window.api.sorter.create,
    onSuccess: ({ sorter }) => {
      const cachedData = queryClient.getQueryData<FetchAllSortersResponse>([
        'sorters',
      ])

      if (cachedData) {
        queryClient.setQueryData<FetchAllSortersResponse>(['sorters'], {
          sorters: [...cachedData.sorters, sorter],
        })
      }
    },
  })

  async function handleCreateSorter() {
    const folderPath = await getFolderPath()

    if (!folderPath) {
      return
    }

    createSorter({ folderPath })
  }

  return (
    <aside className="flex h-full w-[17rem] flex-shrink-0 flex-col items-center gap-12 bg-stone-800 px-4 pb-4 pt-12">
      <img src={logo} className="h-10" alt="Bolt Sort logo" />

      <div className="flex w-full flex-col justify-start gap-4">
        <h2 className="text-lg font-semibold text-stone-200">Minhas pastas</h2>
        <div className="flex flex-col gap-2">
          {data?.sorters.map((sorter) => (
            <SorterCard key={sorter.id} sorter={sorter} />
          ))}
        </div>
      </div>

      <button
        className="mt-auto flex h-9 w-full items-center justify-between rounded-md bg-stone-750 px-3"
        onClick={handleCreateSorter}
      >
        <span className="text-sm text-stone-300">Nova pasta</span>
        <FolderSimplePlus className="size-6 text-stone-300" />
      </button>
    </aside>
  )
}
