import { contextBridge, ipcRenderer } from 'electron'

// API exposée au processus renderer
const electronAPI = {
  // Informations de l'application
  getVersion: () => ipcRenderer.invoke('app-version'),
  
  // Boîtes de dialogue
  showMessageBox: (options: any) => ipcRenderer.invoke('show-message-box', options),
  showSaveDialog: (options: any) => ipcRenderer.invoke('show-save-dialog', options),
  showOpenDialog: (options: any) => ipcRenderer.invoke('show-open-dialog', options),
  
  // Indicateur que nous sommes dans Electron
  isElectron: true,
  
  // Plateforme
  platform: process.platform
}

// Interface TypeScript pour l'API
export interface ElectronAPI {
  getVersion: () => Promise<string>
  showMessageBox: (options: any) => Promise<any>
  showSaveDialog: (options: any) => Promise<any>
  showOpenDialog: (options: any) => Promise<any>
  isElectron: boolean
  platform: string
}

// Exposer l'API de manière sécurisée
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electronAPI', electronAPI)
  } catch (error) {
    console.error('Erreur lors de l\'exposition de l\'API Electron:', error)
  }
} else {
  // Fallback pour les anciens environnements
  // @ts-ignore
  window.electronAPI = electronAPI
}