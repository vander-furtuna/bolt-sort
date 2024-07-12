export const getFolderPath = async (): Promise<string | null> => {
  const response = await window.api.window.getFolderPath()
  return response?.folderPath ?? null
}
