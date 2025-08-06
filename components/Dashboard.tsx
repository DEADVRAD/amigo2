import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Users, 
  FileText, 
  TrendingUp, 
  Mail, 
  MessageSquare, 
  Smartphone,
  Eye,
  MousePointer,
  MessageCircle
} from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface DashboardProps {
  accessToken: string;
}

export function Dashboard({ accessToken }: DashboardProps) {
  const [analytics, setAnalytics] = useState<any>(null);
  const [recentCampaigns, setRecentCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [accessToken]);

  const fetchDashboardData = async () => {
    try {
      // Récupérer les analytics
      const analyticsResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-020ed839/analytics/overview`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      
      if (analyticsResponse.ok) {
        const analyticsData = await analyticsResponse.json();
        setAnalytics(analyticsData.overview);
      }

      // Récupérer les campagnes récentes
      const campaignsResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-020ed839/campaigns`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      
      if (campaignsResponse.ok) {
        const campaignsData = await campaignsResponse.json();
        setRecentCampaigns(campaignsData.campaigns.slice(0, 5));
      }
    } catch (error) {
      console.log('Erreur lors du chargement du dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const metricCards = [
    {
      title: 'Campagnes totales',
      value: analytics?.totalCampaigns || 0,
      icon: Send,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Messages envoyés',
      value: analytics?.totalSent || 0,
      icon: Mail,
      color: 'bg-green-500',
      change: '+23%'
    },
    {
      title: 'Taux de livraison',
      value: `${analytics?.deliveryRate || 0}%`,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+5%'
    },
    {
      title: 'Taux d\'ouverture',
      value: `${analytics?.openRate || 0}%`,
      icon: Eye,
      color: 'bg-orange-500',
      change: '+8%'
    }
  ];

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'sms':
        return <Smartphone className="w-4 h-4" />;
      case 'whatsapp':
        return <MessageSquare className="w-4 h-4" />;
      case 'email':
        return <Mail className="w-4 h-4" />;
      default:
        return <Send className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'sending':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Terminée';
      case 'sending':
        return 'En cours';
      case 'draft':
        return 'Brouillon';
      default:
        return 'Inconnu';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600 mt-2">
          Vue d'ensemble de vos campagnes marketing digital
        </p>
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
                  <p className="text-sm text-green-600 mt-1">{metric.change} ce mois</p>
                </div>
                <div className={`p-3 rounded-full ${metric.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Graphiques et activité récente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Répartition par canal */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Répartition par canal
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <span className="font-medium">Email</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <span className="text-sm text-gray-600 w-12">65%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <MessageSquare className="w-4 h-4 text-green-600" />
                </div>
                <span className="font-medium">WhatsApp</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
                <span className="text-sm text-gray-600 w-12">25%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Smartphone className="w-4 h-4 text-purple-600" />
                </div>
                <span className="font-medium">SMS</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
                <span className="text-sm text-gray-600 w-12">10%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Campagnes récentes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Campagnes récentes
          </h3>
          {recentCampaigns.length > 0 ? (
            <div className="space-y-4">
              {recentCampaigns.map((campaign) => (
                <div key={campaign.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      {getChannelIcon(campaign.type)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{campaign.name}</p>
                      <p className="text-sm text-gray-600">
                        {campaign.contacts?.length || 0} destinataires
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                    {getStatusText(campaign.status)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Send className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucune campagne pour le moment</p>
              <p className="text-sm text-gray-400">Créez votre première campagne !</p>
            </div>
          )}
        </div>
      </div>

      {/* Actions rapides */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 text-left bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
            <Send className="w-6 h-6 text-blue-600 mb-2" />
            <h4 className="font-medium text-gray-900">Nouvelle campagne</h4>
            <p className="text-sm text-gray-600">Créer une campagne email, SMS ou WhatsApp</p>
          </button>
          <button className="p-4 text-left bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
            <Users className="w-6 h-6 text-green-600 mb-2" />
            <h4 className="font-medium text-gray-900">Importer des contacts</h4>
            <p className="text-sm text-gray-600">Ajouter de nouveaux contacts à votre liste</p>
          </button>
          <button className="p-4 text-left bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors">
            <FileText className="w-6 h-6 text-purple-600 mb-2" />
            <h4 className="font-medium text-gray-900">Créer un template</h4>
            <p className="text-sm text-gray-600">Concevoir un nouveau modèle de message</p>
          </button>
        </div>
      </div>
    </div>
  );
}