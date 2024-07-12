export interface GetFolderPathResponse {
  folderPath: string
}

export interface CreateSorterRequest {
  folderPath: string
}

export interface CreateSorterResponse {
  sorter: {
    id: string
    source: string
  }
}

export interface FetchAllSortersResponse {
  sorters: {
    id: string
    source: string
  }[]
}

export interface FetchSorterResponse {
  sorter: {
    id: string
    source: {
      id: string
      name: string
      path: string
    }
    destinations: {
      id: string
      folder: {
        id: string
        name: string
        path: string
      }
      extensions: {
        name: string
      }[]
    }[]
  }
}

export interface CreateDestinationRequest {
  sorterId: string
  folderPath: string
}

export interface CreateDestinationResponse {
  destination: {
    id: string
    folder: {
      id: string
      name: string
      path: string
    }
    extensions: {
      name: string
    }[]
  }
}

export interface CreateExtensionRequest {
  name: string
  destinationId: string
}

export interface CreateExtensionResponse {
  extension: {
    name: string
  }
}

export interface CheckExtensionRequest {
  name: string
  sorterId: string
}

export interface CheckExtensionResponse {
  exists: {
    destionationId: string
    folder: string
    extension: string
  } | null
}

export interface moveExtensionRequest {
  fromId: string
  toId: string
  name: string
}

export interface CheckSorterExistsRequest {
  source: string
}
