import {
  FolderOpen,
  FolderSimplePlus,
  Lightning,
  Minus,
  TrashSimple,
} from '@phosphor-icons/react'
import { PencilSimple } from '@phosphor-icons/react/dist/ssr'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import type { FetchSorterResponse } from '~/src/shared/types/sorter'

import { DestinationCard } from '../components/destination-card'
import { Tooltip } from '../components/tooltip'
import { WindowsButtons } from '../components/windows-buttons'
import { queryClient } from '../lib/react-query'
import { getFolderPath } from '../utils/get-folder-path'

export function Sorter() {
  const { id } = useParams<{ id: string }>()

  const { data } = useQuery({
    queryKey: ['sorter', id],
    queryFn: () => window.api.sorter.fetch(id!),
    staleTime: Infinity,
  })

  const { mutateAsync: createDestination } = useMutation({
    mutationFn: async () => {
      const folderPath = await getFolderPath()

      if (!folderPath) {
        throw new Error('Nenhuma pasta selecionada')
      }

      return window.api.destination.create({ sorterId: id!, folderPath })
    },
    onSuccess: ({ destination }) => {
      const cachedSorter = queryClient.getQueryData<FetchSorterResponse>([
        'sorter',
        id!,
      ])

      if (cachedSorter) {
        console.log('cache', {
          ...cachedSorter,
          sorter: {
            ...cachedSorter.sorter,
            destinations: [...cachedSorter.sorter.destinations, destination],
          },
        })
        queryClient.setQueryData(['sorter', id!], {
          ...cachedSorter,
          sorter: {
            ...cachedSorter.sorter,
            destinations: [...cachedSorter.sorter.destinations, destination],
          },
        })
      }
    },
  })

  useEffect(() => {
    const cachedData = queryClient.getQueryData<FetchSorterResponse>([
      'sorter',
      id!,
    ])

    console.log('cachedData', cachedData)
  }, [id])

  return (
    <section className="flex size-full flex-col items-center justify-center">
      <div className="flex h-12 w-full items-center justify-between border-b border-stone-700 pl-3 region-drag">
        <div className="flex items-center gap-2">
          <FolderOpen className="size-6 text-yellow-400" weight="bold" />
          <span className="text-sm text-stone-200">
            {data?.sorter.source.path && data.sorter.source.path}
          </span>
        </div>
        <div className="ml-auto flex h-full items-center gap-3 region-no-drag">
          <Tooltip title="Editar">
            <button className="text-stone-300 hover:text-stone-100">
              <PencilSimple size={20} weight="bold" className="text-inherit" />
            </button>
          </Tooltip>
          <button className="text-stone-300 hover:text-red-400">
            <TrashSimple size={20} weight="bold" className="text-inherit" />
          </button>
          <button className="h-fit rounded-md bg-stone-800 p-1 text-yellow-400 transition-colors hover:bg-yellow-400 hover:text-gray-800">
            <Lightning size={20} weight="bold" className="text-inherit" />
          </button>
          <div className="flex h-full items-center justify-center">
            <Minus className="rotate-90 text-stone-500" />
          </div>
        </div>
        <WindowsButtons />
      </div>
      <div className="flex size-full items-start justify-start p-6">
        {data?.sorter.destinations && data?.sorter.destinations.length > 0 ? (
          <div className="flex w-full flex-col gap-3">
            <div className="flex w-full justify-between">
              <h2 className="text-lg font-semibold">Destinos</h2>

              <button
                onClick={() => createDestination()}
                className="flex gap-2 rounded-md bg-stone-800 px-3 py-2 text-sm font-semibold text-stone-300"
              >
                Adicionar destino
                <FolderSimplePlus size={20} weight="bold" />
              </button>
            </div>
            <div>
              {data.sorter.destinations.map((destination) => (
                <DestinationCard
                  key={destination.folder.id}
                  destination={destination}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-3">
            Essa pasta ainda não possui destinos {':('}
            <button
              className="flex items-center justify-center gap-2 rounded-md bg-yellow-400 p-2 px-3 font-semibold text-stone-800"
              onClick={() => createDestination()}
            >
              <span>Novo destino</span>
              <FolderSimplePlus size={20} weight="bold" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
