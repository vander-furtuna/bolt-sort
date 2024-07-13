export type Extension = string

export interface Folder {
  path: string
  name: string
}

export interface Destination {
  id: string
  folder: Folder
  extensions: Extension[]
}

export interface Sorter {
  id: string
  source: Folder
  destinations: Destination[]
}

export interface CreateSorterParams {
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

export interface FetchSorterRequest {
  id: string
}

export interface FetchSorterResponse {
  sorter: Sorter
}

export interface GetFolderDataRequest {
  folderPath: string
}

export interface GetFolderDataResponse {
  folders: string[]
  files: string[]
}

export interface CheckDestinationExistsRequest {
  sorterId: string
  folderPath: string
}

export interface CreateDestinationRequest {
  sorterId: string
  folderPath: string
}

export interface CreateDestinationResponse {
  destination: Destination
}

export interface CreateExtensionRequest {
  name: string
  destinationId: string
  sorterId: string
}

export interface CreateExtensionResponse {
  extension: string
}

export interface CheckExtensionRequest {
  name: string
  sorterId: string
}

export interface CheckExtensionResponse {
  exists: {
    destinationId: string
    folder: string
    extension: string
  }
}

export interface MoveExtensionRequest {
  sorterId: string
  fromId: string
  toId: string
  name: string
}

export interface CheckSorterExistsRequest {
  source: string
}
