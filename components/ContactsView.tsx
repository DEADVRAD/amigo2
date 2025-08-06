import React, { useState } from 'react'
import { Plus, Search, Users, Mail, Phone, MessageSquare, Edit, Trash2, Download, Upload } from 'lucide-react'

// Données de démonstration
const demoContacts = [
  {
    id: '1',
    name: 'Marie Dubois',
    email: 'marie.dubois@example.com',
    phone: '+33 6 12 34 56 78',
    whatsapp: '+33 6 12 34 56 78',
    segment: 'Clients Premium',
    status: 'active',
    createdAt: '2024-01-10T10:00:00Z'
  },
  {
    id: '2',
    name: 'Pierre Martin',
    email: 'pierre.martin@example.com',
    phone: '+33 6 98 76 54 32',
    whatsapp: '',
    segment: 'Prospects',
    status: 'active',
    createdAt: '2024-01-09T14:30:00Z'
  },
  {
    id: '3',
    name: 'Sophie Leroy',
    email: 'sophie.leroy@example.com',
    phone: '+33 6 11 22 33 44',
    whatsapp: '+33 6 11 22 33 44',
    segment: 'Newsletter',
    status: 'active',
    createdAt: '2024-01-08T09:15:00Z'
  }
]

export const ContactsView: React.FC = () => {
  const [contacts] = useState(demoContacts)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.segment.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getContactChannels = (contact: typeof demoContacts[0]) => {
    const channels = []
    if (contact.email) channels.push({ type: 'email', icon: Mail, value: contact.email })
    if (contact.phone) channels.push({ type: 'phone', icon: Phone, value: contact.phone })
    if (contact.whatsapp) channels.push({ type: 'whatsapp', icon: MessageSquare, value: contact.whatsapp })
    return channels
  }

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contacts</h1>
          <p className="text-gray-600">Gérez votre base de contacts et listes de diffusion</p>
        </div>
        
        <div className="flex space-x-3 mt-4 lg:mt-0">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 flex items-center space-x-2 transition-colors">
            <Upload size={16} />
            <span>Importer</span>
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 flex items-center space-x-2 transition-colors">
            <Download size={16} />
            <span>Exporter</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 flex items-center space-x-2 transition-colors"
          >
            <Plus size={16} />
            <span>Ajouter un contact</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <Users size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total contacts</p>
              <p className="text-xl font-bold">{contacts.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <Mail size={16} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avec email</p>
              <p className="text-xl font-bold">
                {contacts.filter(c => c.email).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <Phone size={16} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avec téléphone</p>
              <p className="text-xl font-bold">
                {contacts.filter(c => c.phone).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
              <MessageSquare size={16} className="text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avec WhatsApp</p>
              <p className="text-xl font-bold">
                {contacts.filter(c => c.whatsapp).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="bg-white rounded-xl p-4 shadow-sm border">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un contact..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Liste des contacts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Tous les contacts ({filteredContacts.length})
          </h2>
        </div>
        
        {filteredContacts.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredContacts.map((contact) => {
              const channels = getContactChannels(contact)
              
              return (
                <div key={contact.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {contact.name[0]?.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-medium text-gray-900">{contact.name}</h3>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {contact.segment}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          {channels.map(({ type, icon: Icon, value }, index) => (
                            <div key={type} className="flex items-center space-x-1">
                              <Icon size={14} />
                              <span>{value}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="text-xs text-gray-400 mt-1">
                          Ajouté le {new Date(contact.createdAt).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">
              {contacts.length === 0 ? 'Aucun contact trouvé' : 'Aucun résultat pour cette recherche'}
            </p>
            <p className="text-sm text-gray-400">
              {contacts.length === 0 ? 'Commencez par ajouter vos premiers contacts' : 'Essayez de modifier votre recherche'}
            </p>
          </div>
        )}
      </div>

      {/* Modal simplifié */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Ajouter un contact</h2>
            <p className="text-gray-600 mb-6">Fonctionnalité en cours de développement...</p>
            <button
              onClick={() => setShowAddModal(false)}
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