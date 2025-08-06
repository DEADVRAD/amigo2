import React, { useState, useEffect } from 'react'
import { projectId, publicAnonKey } from '../utils/supabase/info'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, TrendingDown, Users, Send, Mail, MessageSquare, BarChart3 } from 'lucide-react'
import { MetricCard } from './MetricCard'

interface DashboardStats {
  totalCampaigns: number
  activeCampaigns: number
  totalContacts: number
  activeContacts: number
  deliveryRate: number
  openRate: number
  replyRate: number
  chartData: Array<{
    date: string
    sent: number
    delivered: number
    opened: number
  }>
}

// Données de fallback en cas de problème serveur
const fallbackStats: DashboardStats = {
  totalCampaigns: 24,
  activeCampaigns: 5,
  totalContacts: 1247,
  activeContacts: 1180,
  deliveryRate: 94,
  openRate: 67,
  replyRate: 12,
  chartData: [
    { date: '2024-01-01', sent: 1200, delivered: 1140, opened: 760 },
    { date: '2024-01-02', sent: 980, delivered: 931, opened: 620 },
    { date: '2024-01-03', sent: 1450, delivered: 1378, opened: 920 },
    { date: '2024-01-04', sent: 1100, delivered: 1045, opened: 698 },
    { date: '2024-01-05', sent: 1350, delivered: 1283, opened: 851 },
    { date: '2024-01-06', sent: 1600, delivered: 1520, opened: 1008 },
    { date: '2024-01-07', sent: 1250, delivered: 1188, opened: 788 }
  ]
}

export const DashboardView: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>(fallbackStats)
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    loadDashboardStats()
  }, [])

  const loadDashboardStats = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-020ed839/dashboard/stats`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setStats(data)
        setIsOnline(true)
        console.log('Données chargées depuis le serveur')
      } else {
        console.log('Utilisation des données de fallback')
        setIsOnline(false)
      }
    } catch (error) {
      console.log('Mode hors ligne, utilisation des données de fallback:', error)
      setIsOnline(false)
    } finally {
      setLoading(false)
    }
  }

  const channelData = [
    { name: 'SMS', value: 45, color: '#3B82F6' },
    { name: 'Email', value: 35, color: '#10B981' },
    { name: 'WhatsApp', value: 20, color: '#8B5CF6' }
  ]

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header avec indicateur de statut */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
            <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-orange-500'}`} 
                 title={isOnline ? 'Connecté au serveur' : 'Mode démonstration'}></div>
          </div>
          <p className="text-gray-600">Vue d'ensemble de vos campagnes marketing</p>
          {!isOnline && (
            <p className="text-orange-600 text-sm mt-1">Mode démonstration - Données statiques</p>
          )}
        </div>
        
        <div className="mt-4 lg:mt-0">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">3 derniers mois</option>
          </select>
        </div>
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricCard
          title="Campagnes totales"
          value={stats.totalCampaigns.toString()}
          change={12}
          icon={<Send className="h-4 w-4 text-blue-500" />}
        />
        <MetricCard
          title="Campagnes actives"
          value={stats.activeCampaigns.toString()}
          change={8}
          icon={<BarChart3 className="h-4 w-4 text-green-500" />}
        />
        <MetricCard
          title="Contacts totaux"
          value={stats.totalContacts.toLocaleString()}
          change={15}
          icon={<Users className="h-4 w-4 text-purple-500" />}
        />
        <MetricCard
          title="Taux de livraison"
          value={`${stats.deliveryRate}%`}
          change={-2}
          icon={<Mail className="h-4 w-4 text-orange-500" />}
        />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Évolution des envois */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Évolution des envois</h2>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-gray-600">Envoyés</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-gray-600">Livrés</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-gray-600">Ouverts</span>
              </div>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280"
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })}
              />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString('fr-FR')}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line type="monotone" dataKey="sent" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6' }} />
              <Line type="monotone" dataKey="delivered" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981' }} />
              <Line type="monotone" dataKey="opened" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Répartition par canal */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Répartition par canal</h2>
          
          <div className="flex items-center justify-center h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Répartition']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-center space-x-6 mt-4">
            {channelData.map((channel) => (
              <div key={channel.name} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: channel.color }}
                ></div>
                <span className="text-sm text-gray-600">{channel.name} ({channel.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Métriques de performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Taux d'ouverture</p>
              <p className="text-3xl font-bold text-gray-900">{stats.openRate}%</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Mail className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="mt-4 bg-gray-100 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${stats.openRate}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Taux de réponse</p>
              <p className="text-3xl font-bold text-gray-900">{stats.replyRate}%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="text-green-600" size={24} />
            </div>
          </div>
          <div className="mt-4 bg-gray-100 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${stats.replyRate}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Taux de livraison</p>
              <p className="text-3xl font-bold text-gray-900">{stats.deliveryRate}%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Send className="text-purple-600" size={24} />
            </div>
          </div>
          <div className="mt-4 bg-gray-100 rounded-full h-2">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${stats.deliveryRate}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}