import {
  FolderSimple,
  FolderSimplePlus,
  SidebarSimple,
} from '@phosphor-icons/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

import type { FetchAllSortersResponse } from '~/src/shared/types/sorter'

import logoIcon from '../assets/images/logo-icon.svg'
import logoTitle from '../assets/images/logo-title.svg'
import { queryClient } from '../lib/react-query'
import { getFolderPath } from '../utils/get-folder-path'
import { ActionButton } from './action-button'
import { SorterCard } from './sorter-card'

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)

  const { data } = useQuery({
    queryKey: ['sorters'],
    queryFn: () => window.api.sorter.fetchAll(),
  })

  const { mutateAsync: checkSorterExists } = useMutation({
    mutationFn: window.api.sorter.checkExists,
  })

  const { mutateAsync: createSorter } = useMutation({
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
      toast.warning('Nenhuma pasta selecionada!')
      return
    }

    const exists = await checkSorterExists({ source: folderPath })

    if (exists) {
      toast.warning('Essa pasta já foi adicionada!')
      return
    }

    createSorter({ folderPath })
  }

  return (
    <aside
      className="group relative flex h-full w-20 flex-shrink-0 flex-col items-center gap-12 bg-stone-800 px-4 pb-4 pt-16 transition-all duration-300 ease-in-out data-[open=true]:w-[17rem]"
      data-open={isOpen}
    >
      <button
        className="absolute right-4 top-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <SidebarSimple className="size-6 text-stone-400" />
      </button>

      <div className="flex gap-3">
        <img
          src={logoIcon}
          className="h-10 transition-all duration-300 ease-in-out group-data-[open=false]:size-8"
          alt="Bolt Sort logo"
        />
        <img
          src={logoTitle}
          className="h-10 group-data-[open=false]:hidden"
          alt="Bolt Sort logo "
        />
      </div>

      <div className="flex w-full flex-col justify-start gap-4">
        <div className="flex gap-2 pl-3">
          <FolderSimple className="size-6 text-stone-400" weight="bold" />
          <h2 className="text-collapsible text-lg font-semibold text-stone-200">
            Minhas pastas
          </h2>
        </div>
        <div className="flex flex-col gap-2">
          {data?.sorters.map((sorter) => (
            <SorterCard
              key={sorter.id}
              sorter={sorter}
              isSidebarOpen={isOpen}
            />
          ))}
        </div>
      </div>

      <ActionButton
        onClick={handleCreateSorter}
        Icon={FolderSimplePlus}
        size="fill"
      >
        Vincular pasta
      </ActionButton>
    </aside>
  )
}
