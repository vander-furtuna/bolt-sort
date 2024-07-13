import { randomUUID } from 'node:crypto'
import path from 'node:path'

import { dialog, ipcMain } from 'electron'
import fs from 'fs-extra'

import { IPC } from '../shared/constants/ipc'
import type {
  CheckExtensionRequest,
  CheckExtensionResponse,
  CheckSorterExistsRequest,
  CreateDestinationRequest,
  CreateDestinationResponse,
  CreateExtensionRequest,
  CreateExtensionResponse,
  CreateSorterParams,
  CreateSorterResponse,
  Destination,
  FetchAllSortersResponse,
  FetchSorterRequest,
  FetchSorterResponse,
  GetFolderDataRequest,
  GetFolderDataResponse,
  MoveExtensionRequest,
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

ipcMain.handle(
  IPC.SORTER.FETCH,
  async (
    _,
    { id }: FetchSorterRequest,
  ): Promise<FetchSorterResponse | null> => {
    const db = await getDatabase()
    const sorter = db.chain.get('sorters').find({ id }).value()

    if (!sorter) return null
    return { sorter }
  },
)

ipcMain.handle(
  IPC.SORTER.CHECK_EXISTS,
  async (_, { source }: CheckSorterExistsRequest): Promise<boolean> => {
    const db = await getDatabase()
    const sorter = db.chain
      .get('sorters')
      .find((sorter) => sorter.source.path === source)
      .value()

    return Boolean(sorter)
  },
)

ipcMain.handle(
  IPC.DESTINATION.CREATE,
  async (
    _,
    { sorterId, folderPath }: CreateDestinationRequest,
  ): Promise<CreateDestinationResponse> => {
    const db = await getDatabase()
    const sorter = db.chain.get('sorters').find({ id: sorterId }).value()

    if (!sorter) {
      throw new Error('Sorter not found')
    }

    const destination: Destination = {
      id: randomUUID(),
      extensions: [],
      folder: {
        name: path.basename(folderPath),
        path: folderPath,
      },
    }

    console.log('destination', destination)

    db.chain
      .get('sorters')
      .find({ id: sorterId })
      .get('destinations')
      .push(destination)
      .value()

    await db.write()

    return { destination }
  },
)

ipcMain.handle(
  IPC.SORTER.GET_FOLDER_DATA,
  async (
    _,
    { folderPath }: GetFolderDataRequest,
  ): Promise<GetFolderDataResponse | null> => {
    try {
      const items = await fs.readdir(folderPath)
      const folders: string[] = []
      const files: string[] = []

      for (const item of items) {
        const itemPath = path.join(folderPath, item)
        const stats = await fs.stat(itemPath)

        if (stats.isDirectory()) {
          folders.push(item)
        } else if (stats.isFile()) {
          files.push(item)
        }
      }

      return { folders, files }
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Failed to list directory contents: ${error.message}`)
      return null
    }
  },
)

ipcMain.handle(
  IPC.DESTINATION.CHECK_EXISTS,
  async (
    _,
    { folderPath, sorterId }: CreateDestinationRequest,
  ): Promise<boolean> => {
    const db = await getDatabase()
    const sorter = db.chain.get('sorters').find({ id: sorterId }).value()

    if (!sorter) {
      throw new Error('Sorter not found')
    }

    const destination = sorter.destinations.find(
      (destination) => destination.folder.path === folderPath,
    )

    return Boolean(destination)
  },
)

ipcMain.handle(
  IPC.EXTENSION.CREATE,
  async (
    _,
    { name, destinationId, sorterId }: CreateExtensionRequest,
  ): Promise<CreateExtensionResponse> => {
    const db = await getDatabase()
    const extension = name.replace('.', '').toLowerCase()

    db.chain
      .get('sorters')
      .find({ id: sorterId })
      .get('destinations')
      .find({ id: destinationId })
      .get('extensions')
      .push(extension)
      .value()

    await db.write()

    return { extension }
  },
)

ipcMain.handle(
  IPC.EXTENSION.CHECK_EXISTS,
  async (
    _,
    { name, sorterId }: CheckExtensionRequest,
  ): Promise<CheckExtensionResponse | null> => {
    const db = await getDatabase()
    const extension = name.replace('.', '').toLowerCase()

    const sorter = db.chain.get('sorters').find({ id: sorterId }).value()

    if (!sorter) {
      throw new Error('Sorter not found')
    }

    const destination = sorter.destinations.find((destination) =>
      destination.extensions.includes(extension),
    )

    if (!destination) return null

    return {
      exists: {
        destinationId: destination.id,
        folder: destination.folder.path,
        extension,
      },
    }
  },
)

ipcMain.handle(
  IPC.EXTENSION.MOVE,
  async (_, { sorterId, fromId, toId, name }: MoveExtensionRequest) => {
    const db = await getDatabase()
    const extension = name.replace('.', '').toLowerCase()

    const sorter = db.chain.get('sorters').find({ id: sorterId })

    if (!sorter) {
      throw new Error('Sorter not found')
    }

    const fromDestination = sorter.get('destinations').find({ id: fromId })
    const toDestination = sorter.get('destinations').find({ id: toId })

    if (!fromDestination.value() || !toDestination.value()) {
      throw new Error('Destination not found')
    }

    fromDestination.get('extensions').pull(extension).value()
    toDestination.get('extensions').push(extension).value()

    await db.write()
  },
)
