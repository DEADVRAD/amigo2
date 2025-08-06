import React from 'react';
import { Key, Shield, History, Download } from 'lucide-react';

export function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Sécurité du compte
        </h3>
        
        <div className="space-y-4">
          <button className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Key className="w-5 h-5 text-gray-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Changer le mot de passe</h4>
                  <p className="text-sm text-gray-600">Mettre à jour votre mot de passe</p>
                </div>
              </div>
              <div className="text-gray-400">→</div>
            </div>
          </button>
          
          <button className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Authentification à deux facteurs</h4>
                  <p className="text-sm text-gray-600">Ajouter une couche de sécurité supplémentaire</p>
                </div>
              </div>
              <div className="text-gray-400">→</div>
            </div>
          </button>
          
          <button className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <History className="w-5 h-5 text-gray-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Historique des connexions</h4>
                  <p className="text-sm text-gray-600">Voir les connexions récentes à votre compte</p>
                </div>
              </div>
              <div className="text-gray-400">→</div>
            </div>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Gestion des données
        </h3>
        
        <div className="space-y-4">
          <button className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Download className="w-5 h-5 text-gray-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Exporter mes données</h4>
                  <p className="text-sm text-gray-600">Télécharger une copie de vos données</p>
                </div>
              </div>
              <div className="text-gray-400">→</div>
            </div>
          </button>
          
          <button className="w-full text-left p-4 border border-red-300 rounded-lg hover:bg-red-50 transition-colors text-red-600">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Supprimer mon compte</h4>
                <p className="text-sm text-red-500">Cette action est irréversible</p>
              </div>
              <div className="text-red-400">→</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}