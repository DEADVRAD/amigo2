import React from 'react';
import { Mail, MessageSquare, Smartphone, TestTube } from 'lucide-react';
import { emailProviders, smsProviders, whatsappProviders } from './constants';

interface ApiSettingsProps {
  settings: any;
  setSettings: (settings: any) => void;
}

export function ApiSettings({ settings, setSettings }: ApiSettingsProps) {
  const testConnection = (service: string) => {
    alert(`Test de connexion ${service} : Succès !`);
  };

  return (
    <div className="space-y-6">
      {/* Email Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Mail className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Configuration Email</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fournisseur Email
            </label>
            <select
              value={settings.emailProvider}
              onChange={(e) => setSettings(prev => ({ ...prev, emailProvider: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {emailProviders.map(provider => (
                <option key={provider.value} value={provider.value}>
                  {provider.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Serveur SMTP
            </label>
            <input
              type="text"
              value={settings.smtpHost}
              onChange={(e) => setSettings(prev => ({ ...prev, smtpHost: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="smtp.gmail.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Port SMTP
            </label>
            <input
              type="text"
              value={settings.smtpPort}
              onChange={(e) => setSettings(prev => ({ ...prev, smtpPort: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="587"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              value={settings.smtpUsername}
              onChange={(e) => setSettings(prev => ({ ...prev, smtpUsername: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="votre@email.com"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe / Token
            </label>
            <input
              type="password"
              value={settings.smtpPassword}
              onChange={(e) => setSettings(prev => ({ ...prev, smtpPassword: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <button
            onClick={() => testConnection('Email')}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 flex items-center space-x-2 transition-colors"
          >
            <TestTube className="w-4 h-4" />
            <span>Tester la connexion</span>
          </button>
        </div>
      </div>

      {/* SMS Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Smartphone className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Configuration SMS</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fournisseur SMS
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              {smsProviders.map(provider => (
                <option key={provider.value} value={provider.value}>
                  {provider.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Clé API SMS
            </label>
            <input
              type="password"
              value={settings.smsApiKey}
              onChange={(e) => setSettings(prev => ({ ...prev, smsApiKey: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••••••••••"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <button
            onClick={() => testConnection('SMS')}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 flex items-center space-x-2 transition-colors"
          >
            <TestTube className="w-4 h-4" />
            <span>Tester la connexion</span>
          </button>
        </div>
      </div>

      {/* WhatsApp Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <MessageSquare className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Configuration WhatsApp</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              WhatsApp Business API
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              {whatsappProviders.map(provider => (
                <option key={provider.value} value={provider.value}>
                  {provider.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Token WhatsApp
            </label>
            <input
              type="password"
              value={settings.whatsappApiKey}
              onChange={(e) => setSettings(prev => ({ ...prev, whatsappApiKey: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••••••••••"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <button
            onClick={() => testConnection('WhatsApp')}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 flex items-center space-x-2 transition-colors"
          >
            <TestTube className="w-4 h-4" />
            <span>Tester la connexion</span>
          </button>
        </div>
      </div>
    </div>
  );
}