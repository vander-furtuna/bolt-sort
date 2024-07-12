import { ipcRenderer } from 'electron'

import { IPC } from '~/src/shared/constants/ipc'
import type {
  CreateDestinationRequest,
  CreateDestinationResponse,
} from '~/src/shared/types/sorter'

export const destination = {
  create: async ({
    folderPath,
    sorterId,
  }: CreateDestinationRequest): Promise<CreateDestinationResponse> => {
    return ipcRenderer.invoke(IPC.DESTINATION.CREATE, { folderPath, sorterId })
  },
}
