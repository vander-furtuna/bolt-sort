import { FolderSimple } from '@phosphor-icons/react'
import { useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

import type { FetchSorterResponse } from '~/src/shared/types/sorter'

import { queryClient } from '../lib/react-query'
import { ExtensionInput } from './extension-input'
import { ExtensionItem } from './extension-item'

interface DestinationCardProps {
  destination: {
    id: string
    folder: {
      id: string
      name: string
      path: string
    }
    extensions: {
      name: string
    }[]
  }
}

export function DestinationCard({ destination }: DestinationCardProps) {
  const { id } = useParams<{ id: string }>()

  const { mutateAsync: checkExtensionExists } = useMutation({
    mutationFn: window.api.extension.checkExists,
    onSuccess: ({ exists }) => {
      console.log('extension exists', exists)
    },
  })

  const { mutateAsync: moveExtension } = useMutation({
    mutationFn: window.api.extension.move,
    onSuccess: (_, { fromId, name, toId }) => {
      const cachedData = queryClient.getQueryData<FetchSorterResponse>([
        'sorter',
        id!,
      ])

      if (cachedData) {
        queryClient.setQueryData<FetchSorterResponse>(['sorter', id!], {
          ...cachedData,
          sorter: {
            ...cachedData.sorter,
            destinations: cachedData.sorter.destinations.map((destination) => {
              if (destination.id === fromId) {
                return {
                  ...destination,
                  extensions: destination.extensions.filter(
                    (extension) => extension.name !== name,
                  ),
                }
              }

              if (destination.id === toId) {
                return {
                  ...destination,
                  extensions: [
                    ...destination.extensions,
                    {
                      name,
                    },
                  ],
                }
              }

              return destination
            }),
          },
        })
      }
    },
  })

  const { mutateAsync: createExtension } = useMutation({
    mutationFn: window.api.extension.create,
    onError: () => {
      toast.error('Não foi possivel criar a extensão nesse destino')
    },
    onSuccess: (_, { destinationId, name }) => {
      const cachedData = queryClient.getQueryData<FetchSorterResponse>([
        'sorter',
        id!,
      ])

      if (cachedData) {
        queryClient.setQueryData<FetchSorterResponse>(['sorter', id!], {
          ...cachedData,
          sorter: {
            ...cachedData.sorter,
            destinations: cachedData.sorter.destinations.map((destination) => {
              if (destination.id === destinationId) {
                return {
                  ...destination,
                  extensions: [
                    ...destination.extensions,
                    {
                      name,
                    },
                  ],
                }
              }

              return destination
            }),
          },
        })
      }
    },
  })

  async function handleCreateExtension(name: string) {
    const { exists } = await checkExtensionExists({
      name,
      sorterId: id!,
    })

    if (exists) {
      if (exists.folder === destination.folder.path) {
        toast.error(`A extensão ${name.toUpperCase()} já existe nesse destino`)
      }

      toast.info(
        `A extensão ${name.toUpperCase()} já existe em ${exists.folder}. Deseja mover para o destino atual?`,
        {
          closeButton: true,
          duration: 30000,
          action: {
            label: 'Mover',
            onClick: () => {
              moveExtension({
                name,
                toId: destination.id,
                fromId: exists.destionationId,
              })
            },
          },
        },
      )

      return
    }

    createExtension({
      name,
      destinationId: destination.id,
    })
  }

  return (
    <div className="w-[20rem] rounded-md bg-stone-800">
      <div className="flex h-10 items-center gap-2 rounded-md bg-stone-750 px-3">
        <FolderSimple className="size-4 text-stone-300" />
        <span className="text-sm font-semibold text-stone-200">
          {destination.folder.path && destination.folder.path}
        </span>
      </div>
      <div className="flex h-9 w-full items-center gap-2 px-3">
        <ExtensionInput onCreateExtension={handleCreateExtension} />
        {destination.extensions.map((extension) => (
          <ExtensionItem key={extension.name} extension={extension} />
        ))}
      </div>
    </div>
  )
}
