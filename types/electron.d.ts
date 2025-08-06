export interface ElectronAPI {
  getVersion: () => Promise<string>
  showMessageBox: (options: {
    type?: 'none' | 'info' | 'error' | 'question' | 'warning'
    buttons?: string[]
    defaultId?: number
    title?: string
    message: string
    detail?: string
  }) => Promise<{
    response: number
    checkboxChecked: boolean
  }>
  showSaveDialog: (options: {
    title?: string
    defaultPath?: string
    buttonLabel?: string
    filters?: Array<{
      name: string
      extensions: string[]
    }>
  }) => Promise<{
    canceled: boolean
    filePath?: string
  }>
  showOpenDialog: (options: {
    title?: string
    defaultPath?: string
    buttonLabel?: string
    filters?: Array<{
      name: string
      extensions: string[]
    }>
    properties?: Array<'openFile' | 'openDirectory' | 'multiSelections' | 'showHiddenFiles'>
  }) => Promise<{
    canceled: boolean
    filePaths: string[]
  }>
  isElectron: boolean
  platform: string
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}