import { ipcRenderer } from 'electron'

import { IPC } from '~/src/shared/constants/ipc'
import type {
  CreateSorterParams,
  CreateSorterResponse,
  FetchAllSortersResponse,
} from '~/src/shared/types/sorter'

export const sorter = {
  create: async ({
    folderPath,
  }: CreateSorterParams): Promise<CreateSorterResponse> => {
    return ipcRenderer.invoke(IPC.SORTER.CREATE, { folderPath })
  },
  fetchAll: async (): Promise<FetchAllSortersResponse> => {
    return ipcRenderer.invoke(IPC.SORTER.FETCH_ALL)
  },
}
