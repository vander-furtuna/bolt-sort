import { type ElectronAPI, electronAPI } from '@electron-toolkit/preload'
import { contextBridge } from 'electron'

import { destination } from './api/destination'
import { extension } from './api/extension'
import { sorter } from './api/sorter'
import { windowActions } from './api/window-actions'

declare global {
  interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}

// Custom APIs for renderer
const api = {
  window: windowActions,
  sorter,
  destination,
  extension,
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
