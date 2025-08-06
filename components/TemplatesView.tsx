import React, { useState } from 'react'
import { Plus, FileText, Mail, MessageSquare, Smartphone, Search, Edit, Trash2, Copy, Eye } from 'lucide-react'

// Données de démonstration
const demoTemplates = [
  {
    id: '1',
    name: 'SMS Promotion Black Friday',
    type: 'sms' as const,
    subject: '',
    content: 'Bonjour {{nom}}, profitez de -30% sur tout le site avec le code BLACKFRIDAY30 ! Valable jusqu\'au {{date}}. Ne ratez pas cette offre exceptionnelle !',
    variables: ['nom', 'date'],
    createdAt: '2024-01-10T10:00:00Z'
  },
  {
    id: '2',
    name: 'Newsletter Mensuelle',
    type: 'email' as const,
    subject: 'Votre newsletter {{mois}} est arrivée !',
    content: 'Bonjour {{nom}},\n\nDécouvrez les nouveautés de {{mois}} :\n- Nouveau produit lancé\n- Témoignages clients\n- Conseils d\'experts\n\nCordialement,\nL\'équipe',
    variables: ['nom', 'mois'],
    createdAt: '2024-01-09T14:30:00Z'
  },
  {
    id: '3',
    name: 'Message WhatsApp Bienvenue',
    type: 'whatsapp' as const,
    subject: '',
    content: 'Salut {{nom}} ! 👋 Bienvenue dans notre communauté ! Nous sommes ravis de t\'accueillir. N\'hésite pas à nous contacter si tu as des questions.',
    variables: ['nom'],
    createdAt: '2024-01-08T09:15:00Z'
  }
]

const getChannelIcon = (type: string) => {
  switch (type) {
    case 'sms': return <Smartphone size={16} className="text-purple-500" />
    case 'whatsapp': return <MessageSquare size={16} className="text-green-500" />
    case 'email': return <Mail size={16} className="text-blue-500" />
    default: return <FileText size={16} />
  }
}

const getChannelBadge = (type: string) => {
  switch (type) {
    case 'sms': return 'bg-purple-100 text-purple-800'
    case 'whatsapp': return 'bg-green-100 text-green-800'
    case 'email': return 'bg-blue-100 text-blue-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getChannelLabel = (type: string) => {
  switch (type) {
    case 'sms': return 'SMS'
    case 'whatsapp': return 'WhatsApp'
    case 'email': return 'Email'
    default: return 'Autre'
  }
}

export const TemplatesView: React.FC = () => {
  const [templates] = useState(demoTemplates)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [previewTemplate, setPreviewTemplate] = useState<typeof demoTemplates[0] | null>(null)

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || template.type === filterType
    return matchesSearch && matchesType
  })

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Templates</h1>
          <p className="text-gray-600">Créez et gérez vos modèles de messages réutilisables</p>
        </div>
        
        <button
          onClick={() => setShowCreateModal(true)}
          className="mt-4 lg:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 flex items-center space-x-2 transition-colors"
        >
          <Plus size={20} />
          <span>Nouveau template</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <FileText size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total templates</p>
              <p className="text-xl font-bold">{templates.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <Mail size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-xl font-bold">
                {templates.filter(t => t.type === 'email').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <MessageSquare size={16} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">WhatsApp</p>
              <p className="text-xl font-bold">
                {templates.filter(t => t.type === 'whatsapp').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <Smartphone size={16} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">SMS</p>
              <p className="text-xl font-bold">
                {templates.filter(t => t.type === 'sms').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un template..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Tous les types</option>
            <option value="email">Email</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="sms">SMS</option>
          </select>
        </div>
      </div>

      {/* Grille des templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {getChannelIcon(template.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{template.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getChannelBadge(template.type)}`}>
                      {getChannelLabel(template.type)}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-1">
                  <button 
                    onClick={() => setPreviewTemplate(template)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                    title="Aperçu"
                  >
                    <Eye size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100" title="Copier">
                    <Copy size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100" title="Modifier">
                    <Edit size={16} />
                  </button>
                  <button className="p-2 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50" title="Supprimer">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {template.subject && (
                <div className="mb-3">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Objet</p>
                  <p className="text-sm font-medium text-gray-900 line-clamp-2">{template.subject}</p>
                </div>
              )}
              
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Contenu</p>
                <p className="text-sm text-gray-700 line-clamp-3">{template.content}</p>
              </div>
              
              {template.variables.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">Variables</p>
                  <div className="flex flex-wrap gap-1">
                    {template.variables.slice(0, 3).map(variable => (
                      <span key={variable} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {variable}
                      </span>
                    ))}
                    {template.variables.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        +{template.variables.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              <div className="text-xs text-gray-400">
                Créé le {new Date(template.createdAt).toLocaleDateString('fr-FR')}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <FileText size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm || filterType !== 'all' ? 'Aucun template trouvé' : 'Aucun template'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterType !== 'all'
              ? 'Essayez de modifier vos filtres'
              : 'Créez votre premier template pour démarrer'
            }
          </p>
        </div>
      )}

      {/* Modal de création */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Nouveau template</h2>
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

      {/* Modal d'aperçu */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Aperçu: {previewTemplate.name}
            </h2>
            
            {previewTemplate.subject && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-600 mb-1">Objet:</p>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">{previewTemplate.subject}</p>
                </div>
              </div>
            )}
            
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-600 mb-1">Contenu:</p>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="whitespace-pre-wrap">{previewTemplate.content}</p>
              </div>
            </div>
            
            {previewTemplate.variables.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-600 mb-2">Variables disponibles:</p>
                <div className="flex flex-wrap gap-2">
                  {previewTemplate.variables.map(variable => (
                    <span key={variable} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                      {`{{${variable}}}`}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <button
              onClick={() => setPreviewTemplate(null)}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  )
}