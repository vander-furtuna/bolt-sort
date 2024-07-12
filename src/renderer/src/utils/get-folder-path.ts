export async function getFolderPath() {
  const response = await window.api.window.getFolderPath()

  return response?.folderPath ?? null
}
