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
