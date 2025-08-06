import { Key, Bell, Globe, Shield } from 'lucide-react';

export const settingsTabs = [
  { id: 'apis', label: 'APIs & Intégrations', icon: Key },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'general', label: 'Général', icon: Globe },
  { id: 'security', label: 'Sécurité', icon: Shield }
];

export const emailProviders = [
  { value: 'smtp', label: 'SMTP Personnalisé' },
  { value: 'sendgrid', label: 'SendGrid' },
  { value: 'mailgun', label: 'Mailgun' },
  { value: 'aws-ses', label: 'Amazon SES' }
];

export const smsProviders = [
  { value: 'twilio', label: 'Twilio' },
  { value: 'clickatell', label: 'Clickatell' },
  { value: 'ovh', label: 'OVH SMS' },
  { value: 'orange', label: 'Orange API' }
];

export const whatsappProviders = [
  { value: 'official', label: 'WhatsApp Business API Officielle' },
  { value: 'twilio', label: 'Twilio WhatsApp' },
  { value: '360dialog', label: '360dialog' }
];

export const timezones = [
  { value: 'Europe/Paris', label: 'Europe/Paris (UTC+1)' },
  { value: 'Europe/London', label: 'Europe/London (UTC+0)' },
  { value: 'America/New_York', label: 'America/New_York (UTC-5)' },
  { value: 'Asia/Tokyo', label: 'Asia/Tokyo (UTC+9)' }
];

export const languages = [
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'de', label: 'Deutsch' }
];

export const dateFormats = [
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
];