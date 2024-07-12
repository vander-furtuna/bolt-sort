import { ipcRenderer } from 'electron'

import { IPC } from '~/src/shared/constants/ipc'
import type { GetFolderPathResponse } from '~/src/shared/types/sorter'

export const window = {
  minimize() {
    ipcRenderer.send(IPC.WINDOW.MINIMIZE)
  },
  maximize() {
    ipcRenderer.send(IPC.WINDOW.MAXIMIZE)
  },
  close() {
    ipcRenderer.send(IPC.WINDOW.CLOSE)
  },
  getFolderPath(): Promise<GetFolderPathResponse | null> {
    return ipcRenderer.invoke(IPC.WINDOW.GET_FOLDER_PATH)
  },
}
