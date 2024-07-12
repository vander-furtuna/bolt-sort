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
    CREATE: 'sorter:create',
    CHECK_EXISTS: 'sorter:check-exists',
  },
  DESTINATION: {
    CREATE: 'destination:create',
  },
  EXTENSION: {
    CREATE: 'extension:create',
    CHECK_EXISTS: 'extension:check-exists',
    MOVE: 'extension:move',
  },
}
