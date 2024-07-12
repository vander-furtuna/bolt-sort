import { dialog, ipcMain } from 'electron'
import path from 'path'

import { IPC } from '../shared/constants/ipc'
import type {
  CheckExtensionRequest,
  CheckSorterExistsRequest,
  CreateDestinationRequest,
  CreateSorterRequest,
  moveExtensionRequest,
} from '../shared/types/sorter'
import { ExtensionAlreadyExistsError } from './errors/extension/extention-already-exists'
import { prisma } from './lib/prisma'

ipcMain.handle(IPC.WINDOW.GET_FOLDER_PATH, async () => {
  const { filePaths, canceled } = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  })

  if (canceled) return null
  return { folderPath: filePaths[0].replace(/\\/g, '/') }
})

ipcMain.handle(
  IPC.SORTER.CREATE,
  async (_, { folderPath }: CreateSorterRequest) => {
    const folderName = path.basename(folderPath)

    let folder = await prisma.folder.findFirst({
      where: {
        path: folderPath,
      },
    })

    if (!folder) {
      folder = await prisma.folder.create({
        data: {
          path: folderPath,
          name: folderName,
        },
      })
    }

    const sorter = await prisma.sorter.create({
      data: {
        source: {
          connect: {
            id: folder.id,
          },
        },
      },
    })

    return {
      sorter: {
        id: sorter.id,
        source: folderName,
      },
    }
  },
)

ipcMain.handle(IPC.SORTER.FETCH_ALL, async () => {
  const sorters = await prisma.sorter.findMany({
    select: {
      id: true,
      source: {
        select: {
          name: true,
        },
      },
    },
  })

  const mappedSorters = sorters.map((sorter) => ({
    id: sorter.id,
    source: sorter.source.name,
  }))

  return {
    sorters: mappedSorters,
  }
})

ipcMain.handle(IPC.SORTER.FETCH, async (_, id: string) => {
  const sorter = await prisma.sorter.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      source: {
        select: {
          id: true,
          name: true,
          path: true,
        },
      },
      destinations: {
        select: {
          id: true,
          folder: {
            select: {
              id: true,
              name: true,
              path: true,
            },
          },
          extensions: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })

  return {
    sorter,
  }
})

ipcMain.handle(
  IPC.SORTER.CHECK_EXISTS,
  async (_, { source }: CheckSorterExistsRequest) => {
    const sorter = await prisma.sorter.findFirst({
      where: {
        source: {
          path: source,
        },
      },
    })

    return Boolean(sorter)
  },
)

ipcMain.handle(
  IPC.DESTINATION.CREATE,
  async (_, { sorterId, folderPath }: CreateDestinationRequest) => {
    let folder = await prisma.folder.findFirst({
      where: {
        path: folderPath,
      },
    })

    if (!folder) {
      folder = await prisma.folder.create({
        data: {
          path: folderPath,
          name: path.basename(folderPath),
        },
      })
    }

    const destination = await prisma.destination.create({
      data: {
        sorterId,
        folderId: folder.id,
      },
    })

    await prisma.sorter.update({
      where: {
        id: sorterId,
      },
      data: {
        destinations: {
          connect: {
            id: destination.id,
          },
        },
      },
    })

    return {
      destination: {
        id: destination.id,
        folder: {
          id: folder.id,
          name: folder.name,
          path: folder.path,
        },
        extensions: [],
      },
    }
  },
)

ipcMain.handle(
  IPC.EXTENSION.CHECK_EXISTS,
  async (_, { name, sorterId }: CheckExtensionRequest) => {
    const destionations = await prisma.destination.findMany({
      where: {
        sorterId,
      },
      select: {
        id: true,
        folder: {
          select: {
            path: true,
          },
        },
        extensions: {
          select: {
            name: true,
          },
        },
      },
    })

    const exists = destionations.find((destination) =>
      destination.extensions.some((extension) => extension.name === name),
    )

    return {
      exists: exists
        ? {
            destionationId: exists.id,
            folder: exists?.folder.path,
            extension: name,
          }
        : null,
    }
  },
)

ipcMain.handle(
  IPC.EXTENSION.CREATE,
  async (_, { name: rawName, destinationId }) => {
    const name = rawName.replace('.', '').toLowerCase().trim()

    let extension = await prisma.extension.findFirst({
      where: {
        name,
        destinationId,
      },
    })

    if (extension) {
      throw new ExtensionAlreadyExistsError()
    }

    extension = await prisma.extension.findFirst({
      where: {
        name,
        NOT: {
          destinationId,
        },
      },
    })

    if (!extension) {
      extension = await prisma.extension.create({
        data: {
          name,
          destinationId,
        },
      })
    }

    await prisma.destination.update({
      where: {
        id: destinationId,
      },
      data: {
        extensions: {
          connect: {
            name: extension.name,
          },
        },
      },
    })

    return {
      extension: {
        name: extension.name,
      },
    }
  },
)

ipcMain.handle(
  IPC.EXTENSION.MOVE,
  async (_, { fromId, toId, name }: moveExtensionRequest) => {
    await prisma.$transaction([
      prisma.destination.update({
        where: {
          id: fromId,
        },
        data: {
          extensions: {
            disconnect: {
              name,
            },
          },
        },
      }),
      prisma.destination.update({
        where: {
          id: toId,
        },
        data: {
          extensions: {
            connect: {
              name,
            },
          },
        },
      }),
    ])
  },
)
