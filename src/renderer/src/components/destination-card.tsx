import { FolderSimple } from '@phosphor-icons/react'
import { useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

import type { Destination } from '~/src/shared/types/sorter'

import { queryClient } from '../lib/react-query'
import { ExtensionInput } from './extension-input'
import { ExtensionItem } from './extension-item'

interface DestinationCardProps {
  destination: Destination
}

export function DestinationCard({ destination }: DestinationCardProps) {
  const { id } = useParams<{ id: string }>()

  const { mutateAsync: checkExtensionExits } = useMutation({
    mutationFn: window.api.extension.checkExists,
  })

  const { mutateAsync: moveExtension } = useMutation({
    mutationFn: window.api.extension.move,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['sorter', id!],
      })
      toast.success('Extensão movida com sucesso!')
    },
  })

  const { mutateAsync: createExtension } = useMutation({
    mutationFn: window.api.extension.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['sorter', id!],
      })
      toast.success('Extensão criada com sucesso!')
    },
  })

  async function handleCreateExtension(name: string) {
    if (!name) {
      toast.warning('Nome da extensão não pode ser vazio!')
      return
    }

    const response = await checkExtensionExits({
      name,
      sorterId: id!,
    })

    if (response?.exists && response.exists.destinationId === destination.id) {
      toast.warning('Essa extensão já existe nesse destino!')

      return
    }

    if (response?.exists) {
      toast.warning(
        `Essa extensão já está no destino ${response.exists.folder}! Deseja mover para o destino atual?`,
        {
          duration: 30000,
          closeButton: true,
          action: {
            label: 'Mover',
            onClick: () => {
              moveExtension({
                name,
                sorterId: id!,
                fromId: response.exists.destinationId,
                toId: destination.id,
              })
            },
          },
        },
      )

      return
    }

    createExtension({
      destinationId: destination.id,
      sorterId: id!,
      name,
    })
  }

  return (
    <div className="w-full rounded-md bg-stone-800">
      <div className="flex h-10 w-full items-center gap-2 rounded-md bg-stone-750 px-3">
        <FolderSimple className="size-4 text-stone-300" />
        <span className="text-sm font-semibold text-stone-200">
          {destination.folder.path && destination.folder.path}
        </span>
      </div>
      <div className="flex h-9 w-full items-center gap-2 px-3">
        <ExtensionInput onCreateExtension={handleCreateExtension} />
        {destination.extensions.map((extension) => (
          <ExtensionItem key={extension} extension={extension} />
        ))}
      </div>
    </div>
  )
}
