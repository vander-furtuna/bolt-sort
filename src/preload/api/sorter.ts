import { ipcRenderer } from 'electron'

import { IPC } from '~/src/shared/constants/ipc'
import type {
  CheckSorterExistsRequest,
  CreateSorterRequest,
  CreateSorterResponse,
  FetchAllSortersResponse,
  FetchSorterResponse,
} from '~/src/shared/types/sorter'

export const sorter = {
  fetchAll(): Promise<FetchAllSortersResponse> {
    return ipcRenderer.invoke(IPC.SORTER.FETCH_ALL)
  },
  fetch(id: string): Promise<FetchSorterResponse> {
    return ipcRenderer.invoke(IPC.SORTER.FETCH, id)
  },
  create({ folderPath }: CreateSorterRequest): Promise<CreateSorterResponse> {
    return ipcRenderer.invoke(IPC.SORTER.CREATE, { folderPath })
  },
  checkExists({ source }: CheckSorterExistsRequest): Promise<boolean> {
    return ipcRenderer.invoke(IPC.SORTER.CHECK_EXISTS, { source })
  },
}
