import { randomUUID } from 'node:crypto'
import path from 'node:path'

import { dialog, ipcMain } from 'electron'

import { IPC } from '../shared/constants/ipc'
import type {
  CreateSorterParams,
  CreateSorterResponse,
  FetchAllSortersResponse,
  Sorter,
} from '../shared/types/sorter'
import type { GetFolderPathResponse } from '../shared/types/window'
import { getDatabase } from './database/db'

ipcMain.handle(
  IPC.WINDOW.GET_FOLDER_PATH,
  async (): Promise<GetFolderPathResponse | null> => {
    const { filePaths, canceled } = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    })

    if (canceled) return null
    return { folderPath: filePaths[0].replace(/\\/g, '/') }
  },
)

ipcMain.handle(
  IPC.SORTER.CREATE,
  async (
    _,
    { folderPath }: CreateSorterParams,
  ): Promise<CreateSorterResponse> => {
    const folderName = path.basename(folderPath)

    const db = await getDatabase()

    const sorter: Sorter = {
      id: randomUUID(),
      destinations: [],
      source: {
        name: folderName,
        path: folderPath,
      },
    }

    db.data.sorters.push(sorter)

    await db.write()

    return {
      sorter: {
        id: sorter.id,
        source: sorter.source.name,
      },
    }
  },
)

ipcMain.handle(
  IPC.SORTER.FETCH_ALL,
  async (): Promise<FetchAllSortersResponse> => {
    const db = await getDatabase()
    const sorters = db.chain.get('sorters').value()

    const reducerSorters = sorters.map((sorter) => {
      return {
        id: sorter.id,
        source: sorter.source.name,
      }
    })

    return { sorters: reducerSorters }
  },
)
