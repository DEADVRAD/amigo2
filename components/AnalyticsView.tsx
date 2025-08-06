import React, { useState, useEffect } from 'react'
import { projectId, publicAnonKey } from '../utils/supabase/info'
import { TrendingUp, TrendingDown, Calendar, Download, Eye, MousePointer, MessageCircle, CheckCircle } from 'lucide-react'
import { MetricCard } from './MetricCard'

// Données de démonstration pour les graphiques
const evolutionData = [
  { date: '2024-01-01', sms: 300, whatsapp: 150, email: 800 },
  { date: '2024-01-02', sms: 250, whatsapp: 120, email: 650 },
  { date: '2024-01-03', sms: 400, whatsapp: 180, email: 900 },
  { date: '2024-01-04', sms: 350, whatsapp: 160, email: 750 },
  { date: '2024-01-05', sms: 450, whatsapp: 200, email: 950 },
  { date: '2024-01-06', sms: 380, whatsapp: 170, email: 820 },
  { date: '2024-01-07', sms: 320, whatsapp: 140, email: 700 }
]

const channelData = [
  { name: 'SMS', value: 2450, percentage: 25, color: '#8B5CF6' },
  { name: 'WhatsApp', value: 1520, percentage: 15, color: '#10B981' },
  { name: 'Email', value: 5870, percentage: 60, color: '#3B82F6' }
]

export const AnalyticsView: React.FC = () => {
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-020ed839/analytics`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
        setIsOnline(true)
      } else {
        setAnalytics({
          channelStats: {
            sms: { campaigns: 5, sent: 2450, delivered: 2328, opened: 2095, replied: 156 },
            whatsapp: { campaigns: 3, sent: 1520, delivered: 1488, opened: 1339, replied: 89 },
            email: { campaigns: 8, sent: 5870, delivered: 5753, opened: 4025, replied: 234 }
          },
          evolutionData,
          totalCampaigns: 16,
          activeCampaigns: 3
        })
        setIsOnline(false)
      }
    } catch (error) {
      console.log('Mode hors ligne, utilisation des données de démonstration:', error)
      setAnalytics({
        channelStats: {
          sms: { campaigns: 5, sent: 2450, delivered: 2328, opened: 2095, replied: 156 },
          whatsapp: { campaigns: 3, sent: 1520, delivered: 1488, opened: 1339, replied: 89 },
          email: { campaigns: 8, sent: 5870, delivered: 5753, opened: 4025, replied: 234 }
        },
        evolutionData,
        totalCampaigns: 16,
        activeCampaigns: 3
      })
      setIsOnline(false)
    } finally {
      setLoading(false)
    }
  }

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

  if (!analytics) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <p className="text-red-600">Erreur lors du chargement des données d'analyse</p>
        </div>
      </div>
    )
  }

  const totalSent = analytics.channelStats.sms.sent + analytics.channelStats.whatsapp.sent + analytics.channelStats.email.sent
  const totalDelivered = analytics.channelStats.sms.delivered + analytics.channelStats.whatsapp.delivered + analytics.channelStats.email.delivered
  const totalOpened = analytics.channelStats.sms.opened + analytics.channelStats.whatsapp.opened + analytics.channelStats.email.opened
  const totalReplied = analytics.channelStats.sms.replied + analytics.channelStats.whatsapp.replied + analytics.channelStats.email.replied

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-orange-500'}`} 
                 title={isOnline ? 'Connecté au serveur' : 'Mode démonstration'}></div>
          </div>
          <p className="text-gray-600">Analysez les performances de vos campagnes marketing</p>
          {!isOnline && (
            <p className="text-orange-600 text-sm mt-1">Mode démonstration - Données statiques</p>
          )}
        </div>
        
        <div className="flex space-x-3 mt-4 lg:mt-0">
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">3 derniers mois</option>
            <option value="1y">12 derniers mois</option>
          </select>
          
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 flex items-center space-x-2 transition-colors">
            <Download size={16} />
            <span>Exporter</span>
          </button>
        </div>
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricCard
          title="Messages envoyés"
          value={totalSent.toLocaleString()}
          change={15}
          icon={<CheckCircle className="h-4 w-4 text-blue-500" />}
        />
        <MetricCard
          title="Messages livrés"
          value={totalDelivered.toLocaleString()}
          change={12}
          icon={<CheckCircle className="h-4 w-4 text-green-500" />}
        />
        <MetricCard
          title="Messages ouverts"
          value={totalOpened.toLocaleString()}
          change={8}
          icon={<Eye className="h-4 w-4 text-purple-500" />}
        />
        <MetricCard
          title="Réponses reçues"
          value={totalReplied.toLocaleString()}
          change={-3}
          icon={<MessageCircle className="h-4 w-4 text-orange-500" />}
        />
      </div>

      {/* Graphiques simplifiés */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Évolution temporelle */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Évolution des envois</h2>
          
          <div className="space-y-4">
            {evolutionData.slice(-7).map((day, index) => (
              <div key={day.date} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {new Date(day.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' })}
                </span>
                <div className="flex space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span>{day.sms} SMS</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>{day.whatsapp} WA</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span>{day.email} Email</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Répartition par canal */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Répartition par canal</h2>
          
          <div className="space-y-4">
            {channelData.map((channel) => (
              <div key={channel.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: channel.color }}
                    ></div>
                    <span className="font-medium text-gray-900">{channel.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-gray-900">{channel.percentage}%</span>
                    <p className="text-sm text-gray-500">{channel.value.toLocaleString()} envois</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full"
                    style={{ 
                      backgroundColor: channel.color, 
                      width: `${channel.percentage}%` 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance détaillée */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Performance par canal</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {Object.entries(analytics.channelStats).map(([channel, stats]) => {
              const deliveryRate = stats.sent > 0 ? Math.round((stats.delivered / stats.sent) * 100) : 0
              const openRate = stats.delivered > 0 ? Math.round((stats.opened / stats.delivered) * 100) : 0
              const replyRate = stats.delivered > 0 ? Math.round((stats.replied / stats.delivered) * 100) : 0
              
              return (
                <div key={channel} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">{channel.toUpperCase()}</h3>
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: channelData.find(c => c.name.toLowerCase().includes(channel))?.color }}
                    ></div>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Campagnes:</span>
                      <span className="font-medium">{stats.campaigns}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Envoyés:</span>
                      <span className="font-medium">{stats.sent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Livrés:</span>
                      <span className="font-medium">{stats.delivered.toLocaleString()} ({deliveryRate}%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ouverts:</span>
                      <span className="font-medium">{stats.opened.toLocaleString()} ({openRate}%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Réponses:</span>
                      <span className="font-medium">{stats.replied.toLocaleString()} ({replyRate}%)</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}