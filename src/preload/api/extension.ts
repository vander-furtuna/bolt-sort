import { ipcRenderer } from 'electron'

import { IPC } from '~/src/shared/constants/ipc'
import type {
  CheckExtensionRequest,
  CheckExtensionResponse,
  CreateExtensionRequest,
  CreateExtensionResponse,
  moveExtensionRequest,
} from '~/src/shared/types/sorter'

export const extension = {
  create: async ({
    name,
    destinationId,
  }: CreateExtensionRequest): Promise<CreateExtensionResponse | undefined> => {
    return await ipcRenderer.invoke('extension:create', {
      name,
      destinationId,
    })
  },
  checkExists: async ({
    name,
    sorterId,
  }: CheckExtensionRequest): Promise<CheckExtensionResponse> => {
    return await ipcRenderer.invoke(IPC.EXTENSION.CHECK_EXISTS, {
      name,
      sorterId,
    })
  },
  move: async ({ fromId, toId, name }: moveExtensionRequest) => {
    return await ipcRenderer.invoke(IPC.EXTENSION.MOVE, {
      fromId,
      toId,
      name,
    })
  },
}
