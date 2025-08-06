import React, { useState, useEffect } from 'react'
import { projectId, publicAnonKey } from './utils/supabase/info'

// Import des composants de vue
import { DashboardView } from './components/DashboardView'
import { CampaignsView } from './components/CampaignsView'
import { ContactsView } from './components/ContactsView'
import { TemplatesView } from './components/TemplatesView'
import { AnalyticsView } from './components/AnalyticsView'
import { SettingsView } from './components/SettingsView'

// Import des icônes
import { 
  BarChart3, 
  Send, 
  Users, 
  FileText, 
  TrendingUp, 
  Settings,
  Menu,
  X
} from 'lucide-react'

// Interface pour les vues
type View = 'dashboard' | 'campaigns' | 'contacts' | 'templates' | 'analytics' | 'settings'

interface NavItem {
  id: View
  label: string
  icon: React.ComponentType<any>
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Tableau de bord', icon: BarChart3 },
  { id: 'campaigns', label: 'Campagnes', icon: Send },
  { id: 'contacts', label: 'Contacts', icon: Users },
  { id: 'templates', label: 'Templates', icon: FileText },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  { id: 'settings', label: 'Paramètres', icon: Settings }
]

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialisation des données de démonstration
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Test de connexion au serveur
        const healthResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-020ed839/health`, {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          }
        })
        
        if (healthResponse.ok) {
          console.log('Serveur accessible')
          
          // Initialiser les données de démo
          const initResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-020ed839/init-demo-data`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json'
            }
          })
          
          if (initResponse.ok) {
            console.log('Données de démonstration initialisées')
          }
        } else {
          console.log('Serveur non accessible, mode hors ligne')
        }
      } catch (error) {
        console.log('Mode hors ligne activé:', error)
      } finally {
        setIsInitialized(true)
      }
    }
    
    initializeApp()
  }, [])

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />
      case 'campaigns':
        return <CampaignsView />
      case 'contacts':
        return <ContactsView />
      case 'templates':
        return <TemplatesView />
      case 'analytics':
        return <AnalyticsView />
      case 'settings':
        return <SettingsView />
      default:
        return <DashboardView />
    }
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Initialisation de la plateforme...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header mobile */}
      <div className="lg:hidden bg-white shadow-sm border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 hover:text-gray-700"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Amigo marketing</h1>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex items-center justify-center h-16 px-6 bg-gradient-to-r from-red-600 to-red-700">
            <h1 className="text-xl font-bold text-white">Amigo marketing</h1>
          </div>
          
          <nav className="mt-6 px-4">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentView === item.id
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id)
                    setSidebarOpen(false)
                  }}
                  className={`
                    w-full flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-red-50 text-red-600 border-r-2 border-red-600' 
                      : 'text-gray-600 hover:bg-red-50 hover:text-red-700'
                    }
                  `}
                >
                  <Icon size={20} className="mr-3" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Stats rapides dans la sidebar */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-4 text-white">
              <p className="text-sm opacity-90">Campagnes actives</p>
              <p className="text-2xl font-bold">5</p>
              <p className="text-xs opacity-75">+2 cette semaine</p>
            </div>
          </div>
        </div>

        {/* Overlay pour mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <div className="flex-1 lg:ml-0">
          <main className="min-h-screen">
            {renderCurrentView()}
          </main>
        </div>
      </div>
    </div>
  )
}