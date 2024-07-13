import {
  File,
  FolderOpen,
  FolderSimplePlus,
  GearSix,
  Lightning,
  Minus,
  PencilSimple,
  TrashSimple,
} from '@phosphor-icons/react'
import { FolderSimple } from '@phosphor-icons/react/dist/ssr'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { DestinationCard } from '../components/destination-card'
import { Tooltip } from '../components/tooltip'
import { WindowsButtons } from '../components/windows-buttons'
import { queryClient } from '../lib/react-query'
import { getFolderPath } from '../utils/get-folder-path'

export function Sorter() {
  // const [subfoldersMethod, setSubfoldersMethod] = useState<'move' | 'file'>()
  const { id } = useParams<{ id: string }>()

  const { data } = useQuery({
    queryKey: ['sorter', id!],
    queryFn: async () => await window.api.sorter.fetch({ id: id! }),
    staleTime: 1,
  })

  const { mutateAsync: createDestination } = useMutation({
    mutationFn: window.api.destination.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['sorter', id!],
      })
    },
  })

  const { mutateAsync: checkDestinationExists } = useMutation({
    mutationFn: window.api.destination.checkExists,
  })

  async function handleCreateDestination() {
    const folderPath = await getFolderPath()

    if (!folderPath) {
      toast.warning('Nenhuma pasta selecionada!')
      return
    }

    if (folderPath === data?.sorter.source.path) {
      toast.warning('Esse destino já é a pasta de origem!')
      return
    }

    const exists = await checkDestinationExists({
      folderPath,
      sorterId: id!,
    })

    if (exists) {
      toast.warning('Esse destino já foi adicionado!')
      return
    }

    createDestination({ folderPath, sorterId: id! })
  }

  return (
    <section className="flex size-full flex-col items-center justify-center">
      <div className="flex h-12 w-full items-center justify-between border-b border-stone-700 pl-4 region-drag">
        <div className="flex items-center gap-2">
          <FolderOpen className="size-6 text-yellow-300" weight="bold" />
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

          <Tooltip title="Deletar">
            <button className="text-stone-300 hover:text-red-400">
              <TrashSimple size={20} weight="bold" className="text-inherit" />
            </button>
          </Tooltip>

          <Tooltip title="Config.">
            <button className="text-stone-300 hover:text-stone-100">
              <GearSix size={20} weight="bold" className="text-inherit" />
            </button>
          </Tooltip>

          <Tooltip title="Organizar">
            <button className="h-fit rounded-md bg-stone-800 p-1 text-yellow-300 transition-colors hover:bg-yellow-300 hover:text-gray-800">
              <Lightning size={20} weight="bold" className="text-inherit" />
            </button>
          </Tooltip>

          <div className="flex h-full items-center justify-center">
            <Minus className="rotate-90 text-stone-500" />
          </div>
        </div>
        <WindowsButtons />
      </div>
      <div className="flex size-full items-start justify-start">
        {data?.sorter.destinations && data?.sorter.destinations.length > 0 ? (
          <div className="flex w-full flex-col gap-3 p-6">
            <div className="flex w-full justify-between">
              <h2 className="text-lg font-semibold">Destinos</h2>

              <button
                onClick={() => handleCreateDestination()}
                className="flex gap-2 rounded-md bg-stone-800 px-3 py-2 text-sm font-semibold text-stone-300"
              >
                Adicionar destino
                <FolderSimplePlus size={20} weight="bold" />
              </button>
            </div>
            <div className="auto-flow-dense relative grid w-full grid-cols-[repeat(auto-fit,_minmax(20rem,_1fr))] flex-wrap items-center justify-start justify-items-start gap-4">
              {data.sorter.destinations.map((destination) => (
                <DestinationCard
                  key={destination.folder.path}
                  destination={destination}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-3">
            Essa pasta ainda não possui destinos {':('}
            <button
              className="flex items-center justify-center gap-2 rounded-md bg-yellow-300 p-2 px-3 font-semibold text-stone-800"
              onClick={() => handleCreateDestination()}
            >
              <span>Novo destino</span>
              <FolderSimplePlus size={20} weight="bold" />
            </button>
          </div>
        )}
        <div className="flex h-full w-72 flex-shrink-0 flex-col gap-4 border-l border-stone-700 bg-transparent px-4 py-6">
          <h2 className="font-semibold">{data?.sorter.source.name}</h2>
          <div className="flex flex-col">
            <span className="text-sm text-stone-300">Caminho: </span>
            <div className="flex items-center gap-2 rounded-md bg-stone-800 px-3 py-2">
              <FolderOpen
                size={20}
                className="flex-shrink-0 text-yellow-300"
                weight="bold"
              />
              <strong className="w-full overflow-hidden truncate text-sm font-normal">
                {data?.sorter.source.path}
              </strong>
              <PencilSimple
                size={20}
                weight="bold"
                className="flex-shrink-0 text-stone-400"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-stone-300">Subpastas: </span>
            <div className="flex items-center gap-1 rounded-md">
              <button className="flex w-full items-center justify-center gap-1.5 rounded-md bg-stone-800 py-3">
                <FolderSimple
                  size={16}
                  weight="bold"
                  className="text-stone-400"
                />
                <span className="text-xs font-semibold text-stone-400">
                  Mover pastas
                </span>
              </button>
              <button className="flex w-full items-center justify-center gap-1.5 rounded-md bg-stone-800 py-3">
                <File size={16} weight="bold" className="text-stone-400" />
                <span className="text-xs font-semibold text-stone-400">
                  Mover arquivos
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
