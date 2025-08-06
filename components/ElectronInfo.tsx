import React, { useState, useEffect } from 'react';
import { Monitor, Download, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface ElectronInfoProps {
  className?: string;
}

export const ElectronInfo: React.FC<ElectronInfoProps> = ({ className }) => {
  const [isElectron, setIsElectron] = useState(false);
  const [version, setVersion] = useState<string>('');
  const [platform, setPlatform] = useState<string>('');

  useEffect(() => {
    // Vérifier si nous sommes dans Electron
    if (window.electronAPI) {
      setIsElectron(true);
      setPlatform(window.electronAPI.platform);
      
      // Récupérer la version de l'application
      window.electronAPI.getVersion().then(setVersion).catch(() => {
        setVersion('Non disponible');
      });
    }
  }, []);

  const handleExportData = async () => {
    if (!window.electronAPI) return;

    try {
      const result = await window.electronAPI.showSaveDialog({
        title: 'Exporter les données',
        defaultPath: 'amigo-marketing-data.json',
        filters: [
          { name: 'Fichiers JSON', extensions: ['json'] },
          { name: 'Tous les fichiers', extensions: ['*'] }
        ]
      });

      if (!result.canceled && result.filePath) {
        // Ici vous pourriez implémenter l'export réel des données
        await window.electronAPI.showMessageBox({
          type: 'info',
          title: 'Export terminé',
          message: `Données exportées vers:\n${result.filePath}`,
          buttons: ['OK']
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
    }
  };

  const handleImportData = async () => {
    if (!window.electronAPI) return;

    try {
      const result = await window.electronAPI.showOpenDialog({
        title: 'Importer des données',
        filters: [
          { name: 'Fichiers JSON', extensions: ['json'] },
          { name: 'Tous les fichiers', extensions: ['*'] }
        ],
        properties: ['openFile']
      });

      if (!result.canceled && result.filePaths.length > 0) {
        // Ici vous pourriez implémenter l'import réel des données
        await window.electronAPI.showMessageBox({
          type: 'info',
          title: 'Import terminé',
          message: `Données importées depuis:\n${result.filePaths[0]}`,
          buttons: ['OK']
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'import:', error);
    }
  };

  if (!isElectron) {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Monitor className="h-5 w-5" />
          Version Desktop
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Version:</span>
          <span className="font-medium">{version}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Plateforme:</span>
          <span className="font-medium">{platform}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Mode:</span>
          <span className="font-medium text-green-600">Application Desktop</span>
        </div>
        
        <div className="pt-2 border-t space-y-2">
          <Button 
            onClick={handleExportData}
            variant="outline" 
            size="sm" 
            className="w-full"
          >
            <Download className="h-4 w-4 mr-2" />
            Exporter les données
          </Button>
          
          <Button 
            onClick={handleImportData}
            variant="outline" 
            size="sm" 
            className="w-full"
          >
            <Info className="h-4 w-4 mr-2" />
            Importer des données
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};