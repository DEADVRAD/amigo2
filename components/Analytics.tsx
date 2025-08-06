import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  MousePointer, 
  MessageCircle,
  Calendar,
  Download,
  Filter
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface AnalyticsProps {
  accessToken: string;
}

export function Analytics({ accessToken }: AnalyticsProps) {
  const [analytics, setAnalytics] = useState<any>(null);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    fetchAnalytics();
  }, [accessToken, timeRange]);

  const fetchAnalytics = async () => {
    try {
      const [analyticsRes, campaignsRes] = await Promise.all([
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-020ed839/analytics/overview`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        }),
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-020ed839/campaigns`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        })
      ]);

      if (analyticsRes.ok) {
        const data = await analyticsRes.json();
        setAnalytics(data.overview);
      }

      if (campaignsRes.ok) {
        const data = await campaignsRes.json();
        setCampaigns(data.campaigns || []);
      }
    } catch (error) {
      console.log('Erreur lors du chargement des analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  // Données simulées pour les graphiques
  const performanceData = [
    { date: '01/01', envoyés: 1200, livrés: 1140, ouverts: 760, clics: 120 },
    { date: '02/01', envoyés: 980, livrés: 931, ouverts: 620, clics: 98 },
    { date: '03/01', envoyés: 1450, livrés: 1378, ouverts: 920, clics: 145 },
    { date: '04/01', envoyés: 1100, livrés: 1045, ouverts: 698, clics: 110 },
    { date: '05/01', envoyés: 1350, livrés: 1283, ouverts: 851, clics: 135 },
    { date: '06/01', envoyés: 1600, livrés: 1520, ouverts: 1008, clics: 160 },
    { date: '07/01', envoyés: 1250, livrés: 1188, ouverts: 788, clics: 125 }
  ];

  const channelData = [
    { name: 'Email', value: 65, color: '#3B82F6' },
    { name: 'WhatsApp', value: 25, color: '#10B981' },
    { name: 'SMS', value: 10, color: '#8B5CF6' }
  ];

  const topCampaigns = campaigns
    .filter(c => c.stats && c.status === 'completed')
    .sort((a, b) => (b.stats.opened || 0) - (a.stats.opened || 0))
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-2">
            Analysez les performances de vos campagnes marketing
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">90 derniers jours</option>
          </select>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 flex items-center space-x-2 transition-colors">
            <Download className="w-4 h-4" />
            <span>Exporter</span>
          </button>
        </div>
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Messages envoyés</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {analytics?.totalSent?.toLocaleString() || '0'}
              </p>
              <p className="text-sm text-green-600 mt-1">+15% ce mois</p>
            </div>
            <div className="p-3 rounded-full bg-blue-500">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taux de livraison</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {analytics?.deliveryRate || '0'}%
              </p>
              <p className="text-sm text-green-600 mt-1">+2% ce mois</p>
            </div>
            <div className="p-3 rounded-full bg-green-500">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taux d'ouverture</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {analytics?.openRate || '0'}%
              </p>
              <p className="text-sm text-green-600 mt-1">+8% ce mois</p>
            </div>
            <div className="p-3 rounded-full bg-purple-500">
              <Eye className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taux de clic</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {analytics?.clickRate || '0'}%
              </p>
              <p className="text-sm text-green-600 mt-1">+3% ce mois</p>
            </div>
            <div className="p-3 rounded-full bg-orange-500">
              <MousePointer className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance dans le temps */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Performance dans le temps
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="envoyés" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="livrés" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="ouverts" stroke="#8B5CF6" strokeWidth={2} />
              <Line type="monotone" dataKey="clics" stroke="#F59E0B" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Répartition par canal */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Répartition par canal
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={channelData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {channelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {channelData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <span className="text-sm text-gray-600">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparaison des canaux */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Comparaison des taux par canal
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              { canal: 'Email', livraison: 95, ouverture: 65, clic: 12 },
              { canal: 'WhatsApp', livraison: 98, ouverture: 85, clic: 25 },
              { canal: 'SMS', livraison: 99, ouverture: 98, clic: 8 }
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="canal" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="livraison" fill="#3B82F6" name="Livraison %" />
            <Bar dataKey="ouverture" fill="#10B981" name="Ouverture %" />
            <Bar dataKey="clic" fill="#F59E0B" name="Clic %" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top campagnes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Top 5 des campagnes
        </h3>
        {topCampaigns.length > 0 ? (
          <div className="space-y-4">
            {topCampaigns.map((campaign, index) => (
              <div key={campaign.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{campaign.name}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(campaign.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <p className="font-medium text-gray-900">{campaign.stats.sent}</p>
                    <p className="text-gray-600">Envoyés</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-900">{campaign.stats.opened}</p>
                    <p className="text-gray-600">Ouverts</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-900">
                      {campaign.stats.sent > 0 
                        ? ((campaign.stats.opened / campaign.stats.sent) * 100).toFixed(1)
                        : 0
                      }%
                    </p>
                    <p className="text-gray-600">Taux</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucune donnée de campagne disponible</p>
          </div>
        )}
      </div>
    </div>
  );
}