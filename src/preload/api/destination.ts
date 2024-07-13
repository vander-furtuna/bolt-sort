import { ipcRenderer } from 'electron'

import { IPC } from '~/src/shared/constants/ipc'
import type {
  CheckDestinationExistsRequest,
  CreateDestinationRequest,
  CreateDestinationResponse,
} from '~/src/shared/types/sorter'

export const destination = {
  create: async ({
    folderPath,
    sorterId,
  }: CreateDestinationRequest): Promise<CreateDestinationResponse> => {
    console.log('destination.create', { folderPath, sorterId })
    return ipcRenderer.invoke(IPC.DESTINATION.CREATE, { folderPath, sorterId })
  },
  checkExists: async ({
    folderPath,
    sorterId,
  }: CheckDestinationExistsRequest): Promise<boolean> => {
    return ipcRenderer.invoke(IPC.DESTINATION.CHECK_EXISTS, {
      folderPath,
      sorterId,
    })
  },
}
