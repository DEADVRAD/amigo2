import React, { useState } from 'react';
import { ApiSettings } from './settings/ApiSettings';
import { NotificationSettings } from './settings/NotificationSettings';
import { GeneralSettings } from './settings/GeneralSettings';
import { SecuritySettings } from './settings/SecuritySettings';
import { settingsTabs } from './settings/constants';

export function Settings() {
  const [activeTab, setActiveTab] = useState('apis');
  const [settings, setSettings] = useState({
    emailProvider: 'smtp',
    smtpHost: '',
    smtpPort: '587',
    smtpUsername: '',
    smtpPassword: '',
    smsApiKey: '',
    whatsappApiKey: '',
    notifications: {
      campaignLaunched: true,
      campaignCompleted: true,
      dailyReport: false,
      weeklyReport: true
    },
    general: {
      timezone: 'Europe/Paris',
      language: 'fr',
      dateFormat: 'DD/MM/YYYY'
    }
  });

  const handleSave = () => {
    alert('Paramètres sauvegardés avec succès !');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'apis':
        return <ApiSettings settings={settings} setSettings={setSettings} />;
      case 'notifications':
        return <NotificationSettings settings={settings} setSettings={setSettings} />;
      case 'general':
        return <GeneralSettings settings={settings} setSettings={setSettings} />;
      case 'security':
        return <SecuritySettings />;
      default:
        return <ApiSettings settings={settings} setSettings={setSettings} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
          <p className="text-gray-600 mt-2">
            Configurez votre plateforme marketing digital
          </p>
        </div>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 flex items-center space-x-2 transition-colors"
        >
          <span>Sauvegarder</span>
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {settingsTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}