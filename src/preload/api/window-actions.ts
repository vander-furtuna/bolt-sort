import { ipcRenderer } from 'electron'

import { IPC } from '~/src/shared/constants/ipc'
import type { GetFolderPathResponse } from '~/src/shared/types/window'

export const windowActions = {
  minimize() {
    ipcRenderer.send(IPC.WINDOW.MINIMIZE)
  },
  maximize() {
    ipcRenderer.send(IPC.WINDOW.MAXIMIZE)
  },
  close() {
    ipcRenderer.send(IPC.WINDOW.CLOSE)
  },
  getFolderPath(): Promise<GetFolderPathResponse> {
    return ipcRenderer.invoke(IPC.WINDOW.GET_FOLDER_PATH)
  },
}
