import { app, BrowserWindow, Menu, shell, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { fileURLToPath } from 'url'

// Désactiver le menu par défaut pour une apparence plus propre
Menu.setApplicationMenu(null)

let mainWindow: BrowserWindow

// Détection de l'environnement
const isDev = process.env.NODE_ENV === 'development'
const isWindows = process.platform === 'win32'

function createWindow(): void {
  // Créer la fenêtre principale
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: 'default',
    icon: join(__dirname, '../../assets/icon.png'),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
      allowRunningInsecureContent: false
    },
    frame: true,
    resizable: true,
    maximizable: true,
    fullscreenable: true
  })

  // Événements de la fenêtre
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    
    // Centrer la fenêtre
    mainWindow.center()
    
    // Ouvrir les outils de développement en mode dev
    if (isDev) {
      mainWindow.webContents.openDevTools()
    }
  })

  mainWindow.on('closed', () => {
    // @ts-ignore
    mainWindow = null
  })

  // Ouvrir les liens externes dans le navigateur par défaut
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // Charger l'application
  if (isDev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// Configuration de l'application
app.whenReady().then(() => {
  // Définir l'ID de l'application pour Windows
  if (isWindows) {
    app.setAppUserModelId('com.amigo.marketing')
  }

  // Gestion IPC pour les actions de l'application
  ipcMain.handle('app-version', () => {
    return app.getVersion()
  })

  ipcMain.handle('show-message-box', async (_, options) => {
    const result = await dialog.showMessageBox(mainWindow, options)
    return result
  })

  ipcMain.handle('show-save-dialog', async (_, options) => {
    const result = await dialog.showSaveDialog(mainWindow, options)
    return result
  })

  ipcMain.handle('show-open-dialog', async (_, options) => {
    const result = await dialog.showOpenDialog(mainWindow, options)
    return result
  })

  createWindow()

  app.on('activate', function () {
    // Sur macOS, il est commun de recréer une fenêtre quand l'icône du dock est cliquée
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quitter quand toutes les fenêtres sont fermées, sauf sur macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// Sécurité - empêcher la navigation vers des domaines externes
app.on('web-contents-created', (_, contents) => {
  contents.on('will-navigate', (navigationEvent, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)
    
    if (parsedUrl.origin !== 'http://localhost:3000' && parsedUrl.origin !== 'file://') {
      navigationEvent.preventDefault()
    }
  })
})