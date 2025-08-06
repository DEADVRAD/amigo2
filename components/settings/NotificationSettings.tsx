import React from 'react';

interface NotificationSettingsProps {
  settings: any;
  setSettings: (settings: any) => void;
}

const notificationLabels = {
  campaignLaunched: {
    title: 'Campagne lancée',
    description: 'Recevoir une notification quand une campagne est lancée'
  },
  campaignCompleted: {
    title: 'Campagne terminée',
    description: 'Recevoir une notification quand une campagne est terminée'
  },
  dailyReport: {
    title: 'Rapport quotidien',
    description: 'Recevoir un résumé quotidien des performances'
  },
  weeklyReport: {
    title: 'Rapport hebdomadaire',
    description: 'Recevoir un résumé hebdomadaire des performances'
  }
};

export function NotificationSettings({ settings, setSettings }: NotificationSettingsProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Préférences de notification
      </h3>
      
      <div className="space-y-4">
        {Object.entries(settings.notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">
                {notificationLabels[key]?.title}
              </h4>
              <p className="text-sm text-gray-600">
                {notificationLabels[key]?.description}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  notifications: {
                    ...prev.notifications,
                    [key]: e.target.checked
                  }
                }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}