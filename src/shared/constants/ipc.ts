export const IPC = {
  WINDOW: {
    MINIMIZE: 'window:minimize',
    MAXIMIZE: 'window:maximize',
    CLOSE: 'window:close',
    GET_FOLDER_PATH: 'window:get-folder-path',
  },
  SORTER: {
    FETCH_ALL: 'sorter:fetch-all',
    FETCH: 'sorter:fetch',
    GET_FOLDER_DATA: 'sorter:get-folder-data',
    CREATE: 'sorter:create',
    CHECK_EXISTS: 'sorter:check-exists',
  },
  DESTINATION: {
    CREATE: 'destination:create',
    CHECK_EXISTS: 'destination:check-exists',
  },
  EXTENSION: {
    CREATE: 'extension:create',
    CHECK_EXISTS: 'extension:check-exists',
    MOVE: 'extension:move',
  },
}
