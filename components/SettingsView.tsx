import React, { useState } from 'react'
import { Settings, Key, Bell, Mail, MessageSquare, Smartphone, Globe, Shield, Users, HelpCircle, Save } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Switch } from './ui/switch'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { ElectronInfo } from './ElectronInfo'

export const SettingsView: React.FC = () => {
  const [settings, setSettings] = useState({
    // API Configuration
    smsApiKey: '',
    smsProvider: 'twilio',
    whatsappApiKey: '',
    whatsappProvider: 'whatsapp-business',
    emailApiKey: '',
    emailProvider: 'sendgrid',
    
    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    campaignAlerts: true,
    weeklyReports: true,
    
    // General
    companyName: 'Amigo marketing',
    timezone: 'Europe/Paris',
    language: 'fr',
    
    // Security
    twoFactorAuth: false,
    sessionTimeout: '30',
    
    // Limits
    dailySmsLimit: '1000',
    dailyEmailLimit: '5000',
    monthlyBudget: '500'
  })

  const handleSave = () => {
    console.log('Sauvegarde des paramètres:', settings)
    // Ici on appellerait l'API pour sauvegarder
  }

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Paramètres</h1>
          <p className="text-gray-600">Configurez votre plateforme marketing</p>
        </div>
        
        <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700">
          <Save size={20} className="mr-2" />
          Sauvegarder
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar avec informations desktop */}
        <div className="lg:col-span-1 space-y-4">
          <ElectronInfo />
          
          {/* Informations système */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Système</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Mode:</span>
                <span className="font-medium">Démonstration</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Statut:</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Actif
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contenu principal */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="api" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="api">API & Intégrations</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="general">Général</TabsTrigger>
              <TabsTrigger value="security">Sécurité</TabsTrigger>
            </TabsList>

            {/* Configuration API */}
            <TabsContent value="api" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Smartphone className="mr-2" size={20} />
                    Configuration SMS
                  </CardTitle>
                  <CardDescription>
                    Configurez votre fournisseur SMS pour l'envoi de messages
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="sms-provider">Fournisseur SMS</Label>
                    <Select value={settings.smsProvider} onValueChange={(value) => updateSetting('smsProvider', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="twilio">Twilio</SelectItem>
                        <SelectItem value="messagebird">MessageBird</SelectItem>
                        <SelectItem value="vonage">Vonage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="sms-api-key">Clé API SMS</Label>
                    <Input
                      id="sms-api-key"
                      type="password"
                      value={settings.smsApiKey}
                      onChange={(e) => updateSetting('smsApiKey', e.target.value)}
                      placeholder="Votre clé API SMS"
                    />
                  </div>

                  <div>
                    <Label htmlFor="daily-sms-limit">Limite SMS par jour</Label>
                    <Input
                      id="daily-sms-limit"
                      type="number"
                      value={settings.dailySmsLimit}
                      onChange={(e) => updateSetting('dailySmsLimit', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2" size={20} />
                    Configuration WhatsApp
                  </CardTitle>
                  <CardDescription>
                    Configurez WhatsApp Business API pour l'envoi de messages
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="whatsapp-provider">Fournisseur WhatsApp</Label>
                    <Select value={settings.whatsappProvider} onValueChange={(value) => updateSetting('whatsappProvider', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="whatsapp-business">WhatsApp Business API</SelectItem>
                        <SelectItem value="twilio-whatsapp">Twilio WhatsApp</SelectItem>
                        <SelectItem value="360dialog">360Dialog</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="whatsapp-api-key">Token WhatsApp</Label>
                    <Input
                      id="whatsapp-api-key"
                      type="password"
                      value={settings.whatsappApiKey}
                      onChange={(e) => updateSetting('whatsappApiKey', e.target.value)}
                      placeholder="Votre token WhatsApp"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="mr-2" size={20} />
                    Configuration Email
                  </CardTitle>
                  <CardDescription>
                    Configurez votre fournisseur email pour l'envoi de newsletters
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email-provider">Fournisseur Email</Label>
                    <Select value={settings.emailProvider} onValueChange={(value) => updateSetting('emailProvider', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sendgrid">SendGrid</SelectItem>
                        <SelectItem value="mailgun">Mailgun</SelectItem>
                        <SelectItem value="amazon-ses">Amazon SES</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="email-api-key">Clé API Email</Label>
                    <Input
                      id="email-api-key"
                      type="password"
                      value={settings.emailApiKey}
                      onChange={(e) => updateSetting('emailApiKey', e.target.value)}
                      placeholder="Votre clé API Email"
                    />
                  </div>

                  <div>
                    <Label htmlFor="daily-email-limit">Limite emails par jour</Label>
                    <Input
                      id="daily-email-limit"
                      type="number"
                      value={settings.dailyEmailLimit}
                      onChange={(e) => updateSetting('dailyEmailLimit', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="mr-2" size={20} />
                    Préférences de notification
                  </CardTitle>
                  <CardDescription>
                    Choisissez comment vous souhaitez être notifié des événements importants
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notifications email</Label>
                      <p className="text-sm text-gray-500">Recevez des notifications par email</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notifications SMS</Label>
                      <p className="text-sm text-gray-500">Recevez des notifications par SMS</p>
                    </div>
                    <Switch
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => updateSetting('smsNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Alertes de campagne</Label>
                      <p className="text-sm text-gray-500">Notifications quand une campagne se termine</p>
                    </div>
                    <Switch
                      checked={settings.campaignAlerts}
                      onCheckedChange={(checked) => updateSetting('campaignAlerts', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Rapports hebdomadaires</Label>
                      <p className="text-sm text-gray-500">Recevez un résumé hebdomadaire de vos performances</p>
                    </div>
                    <Switch
                      checked={settings.weeklyReports}
                      onCheckedChange={(checked) => updateSetting('weeklyReports', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Paramètres généraux */}
            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="mr-2" size={20} />
                    Paramètres généraux
                  </CardTitle>
                  <CardDescription>
                    Configuration de base de votre compte
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="company-name">Nom de l'entreprise</Label>
                    <Input
                      id="company-name"
                      value={settings.companyName}
                      onChange={(e) => updateSetting('companyName', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="timezone">Fuseau horaire</Label>
                    <Select value={settings.timezone} onValueChange={(value) => updateSetting('timezone', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Europe/Paris">Europe/Paris (GMT+1)</SelectItem>
                        <SelectItem value="Europe/London">Europe/London (GMT+0)</SelectItem>
                        <SelectItem value="America/New_York">America/New_York (GMT-5)</SelectItem>
                        <SelectItem value="Asia/Tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="language">Langue</Label>
                    <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="monthly-budget">Budget mensuel (€)</Label>
                    <Input
                      id="monthly-budget"
                      type="number"
                      value={settings.monthlyBudget}
                      onChange={(e) => updateSetting('monthlyBudget', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sécurité */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2" size={20} />
                    Sécurité du compte
                  </CardTitle>
                  <CardDescription>
                    Paramètres de sécurité et d'authentification
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Authentification à deux facteurs</Label>
                      <p className="text-sm text-gray-500">Sécurisez votre compte avec l'A2F</p>
                    </div>
                    <Switch
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked) => updateSetting('twoFactorAuth', checked)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="session-timeout">Délai d'expiration de session (minutes)</Label>
                    <Select value={settings.sessionTimeout} onValueChange={(value) => updateSetting('sessionTimeout', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 heure</SelectItem>
                        <SelectItem value="120">2 heures</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-4">Actions de sécurité</h4>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Key size={16} className="mr-2" />
                        Changer le mot de passe
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Users size={16} className="mr-2" />
                        Gérer les sessions actives
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <HelpCircle size={16} className="mr-2" />
                        Télécharger les données du compte
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statut de conformité</CardTitle>
                  <CardDescription>
                    Vérifiez la conformité de votre configuration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>RGPD</span>
                      <Badge variant="default" className="bg-green-100 text-green-800">Conforme</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Configuration SMS</span>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">En attente</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Configuration Email</span>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">En attente</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}