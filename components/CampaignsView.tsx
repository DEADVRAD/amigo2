import React, { useState } from 'react'
import { Plus, Send, Mail, MessageSquare, Smartphone, Users, Play, Edit, Trash2 } from 'lucide-react'

// Données de démonstration
const demoCampaigns = [
  {
    id: '1',
    name: 'Campagne SMS Black Friday',
    type: 'sms' as const,
    status: 'completed' as const,
    sentCount: 1247,
    deliveredCount: 1185,
    openedCount: 892,
    clickedCount: 156,
    repliedCount: 89,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Newsletter Mensuelle',
    type: 'email' as const,
    status: 'sending' as const,
    sentCount: 2341,
    deliveredCount: 2298,
    openedCount: 1654,
    clickedCount: 342,
    repliedCount: 67,
    createdAt: '2024-01-14T14:30:00Z'
  },
  {
    id: '3',
    name: 'Message WhatsApp Promo',
    type: 'whatsapp' as const,
    status: 'draft' as const,
    sentCount: 0,
    deliveredCount: 0,
    openedCount: 0,
    clickedCount: 0,
    repliedCount: 0,
    createdAt: '2024-01-13T09:15:00Z'
  }
]

const getChannelIcon = (type: string) => {
  switch (type) {
    case 'sms': return <Smartphone size={16} className="text-purple-500" />
    case 'whatsapp': return <MessageSquare size={16} className="text-green-500" />
    case 'email': return <Mail size={16} className="text-blue-500" />
    default: return <Send size={16} />
  }
}

const getStatusBadge = (status: string) => {
  const statusConfig = {
    draft: { label: 'Brouillon', className: 'bg-gray-100 text-gray-800' },
    sending: { label: 'En cours', className: 'bg-blue-100 text-blue-800' },
    completed: { label: 'Terminée', className: 'bg-green-100 text-green-800' }
  }
  
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  )
}

export const CampaignsView: React.FC = () => {
  const [campaigns] = useState(demoCampaigns)
  const [showCreateModal, setShowCreateModal] = useState(false)

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Campagnes</h1>
          <p className="text-gray-600">Créez et gérez vos campagnes marketing</p>
        </div>
        
        <button
          onClick={() => setShowCreateModal(true)}
          className="mt-4 lg:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 flex items-center space-x-2 transition-colors"
        >
          <Plus size={20} />
          <span>Nouvelle campagne</span>
        </button>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <Send size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-xl font-bold">{campaigns.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
              <Play size={16} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">En cours</p>
              <p className="text-xl font-bold">
                {campaigns.filter(c => c.status === 'sending').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <Users size={16} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Messages envoyés</p>
              <p className="text-xl font-bold">
                {campaigns.reduce((sum, c) => sum + c.sentCount, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <MessageSquare size={16} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Réponses</p>
              <p className="text-xl font-bold">
                {campaigns.reduce((sum, c) => sum + c.repliedCount, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des campagnes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Toutes les campagnes</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {campaigns.map((campaign) => {
            const deliveryRate = campaign.sentCount > 0 ? Math.round((campaign.deliveredCount / campaign.sentCount) * 100) : 0
            const openRate = campaign.deliveredCount > 0 ? Math.round((campaign.openedCount / campaign.deliveredCount) * 100) : 0
            
            return (
              <div key={campaign.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      {getChannelIcon(campaign.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span>
                          Créée le {new Date(campaign.createdAt).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {campaign.sentCount > 0 && (
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="text-center">
                          <p className="font-medium text-gray-900">{campaign.sentCount}</p>
                          <p className="text-gray-600">Envoyés</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-gray-900">{campaign.openedCount}</p>
                          <p className="text-gray-600">Ouverts</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-gray-900">{campaign.repliedCount}</p>
                          <p className="text-gray-600">Réponses</p>
                        </div>
                      </div>
                    )}
                    
                    {getStatusBadge(campaign.status)}
                    
                    {campaign.status === 'draft' && (
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 flex items-center space-x-2 transition-colors">
                        <Play size={16} />
                        <span>Lancer</span>
                      </button>
                    )}
                    
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal simplifié */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Nouvelle campagne</h2>
            <p className="text-gray-600 mb-6">Fonctionnalité en cours de développement...</p>
            <button
              onClick={() => setShowCreateModal(false)}
              className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  )
}