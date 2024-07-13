import { ipcRenderer } from 'electron'

import { IPC } from '~/src/shared/constants/ipc'
import type {
  CheckExtensionRequest,
  CheckExtensionResponse,
  CreateExtensionRequest,
  CreateExtensionResponse,
  MoveExtensionRequest,
} from '~/src/shared/types/sorter'

export const extension = {
  create: async ({
    sorterId,
    destinationId,
    name,
  }: CreateExtensionRequest): Promise<CreateExtensionResponse> => {
    return ipcRenderer.invoke(IPC.EXTENSION.CREATE, {
      sorterId,
      destinationId,
      name,
    })
  },
  checkExists: async ({
    name,
    sorterId,
  }: CheckExtensionRequest): Promise<CheckExtensionResponse> => {
    return ipcRenderer.invoke(IPC.EXTENSION.CHECK_EXISTS, {
      sorterId,
      name,
    })
  },
  move: async ({
    name,
    sorterId,
    fromId,
    toId,
  }: MoveExtensionRequest): Promise<void> => {
    return ipcRenderer.invoke(IPC.EXTENSION.MOVE, {
      sorterId,
      fromId,
      toId,
      name,
    })
  },
}
