import { ipcRenderer } from 'electron'

import { IPC } from '~/src/shared/constants/ipc'
import type {
  CheckSorterExistsRequest,
  CreateSorterParams,
  CreateSorterResponse,
  FetchAllSortersResponse,
  FetchSorterRequest,
  FetchSorterResponse,
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
  fetch: async ({ id }: FetchSorterRequest): Promise<FetchSorterResponse> => {
    return ipcRenderer.invoke(IPC.SORTER.FETCH, { id })
  },
  checkExists: async ({
    source,
  }: CheckSorterExistsRequest): Promise<boolean> => {
    return ipcRenderer.invoke(IPC.SORTER.CHECK_EXISTS, { source })
  },
}
