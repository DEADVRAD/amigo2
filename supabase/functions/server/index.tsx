import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { createClient } from 'npm:@supabase/supabase-js'
import * as kv from './kv_store.tsx'

const app = new Hono()

// Configuration CORS
app.use('*', cors({
  origin: '*',
  allowHeaders: ['*'],
  allowMethods: ['*'],
  exposeHeaders: ['*'],
  maxAge: 600,
  credentials: false,
}))

// Simple logging middleware
app.use('*', async (c, next) => {
  console.log(`${c.req.method} ${c.req.url}`)
  await next()
})

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)

// Route de test simple
app.get('/make-server-020ed839/health', async (c) => {
  return c.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Route d'initialisation des données de démo (sans auth pour simplifier)
app.post('/make-server-020ed839/init-demo-data', async (c) => {
  try {
    // Données de démonstration simples
    const demoData = {
      campaigns: [
        {
          id: 'demo-campaign-1',
          name: 'Campagne SMS Black Friday',
          type: 'sms',
          status: 'completed',
          sentCount: 1247,
          deliveredCount: 1185,
          openedCount: 892,
          clickedCount: 156,
          repliedCount: 89,
          createdAt: new Date().toISOString()
        },
        {
          id: 'demo-campaign-2',
          name: 'Newsletter Mensuelle',
          type: 'email',
          status: 'completed',
          sentCount: 2341,
          deliveredCount: 2298,
          openedCount: 1654,
          clickedCount: 342,
          repliedCount: 67,
          createdAt: new Date().toISOString()
        }
      ],
      contacts: [
        {
          id: 'demo-contact-1',
          name: 'Marie Dubois',
          email: 'marie.dubois@example.com',
          phone: '+33123456789',
          tags: ['Premium', 'Newsletter'],
          createdAt: new Date().toISOString()
        },
        {
          id: 'demo-contact-2',
          name: 'Pierre Martin',
          email: 'pierre.martin@example.com',
          phone: '+33987654321',
          tags: ['Prospect'],
          createdAt: new Date().toISOString()
        }
      ]
    }

    // Sauvegarder les données de démo
    await kv.set('demo_campaigns', demoData.campaigns)
    await kv.set('demo_contacts', demoData.contacts)
    
    return c.json({ success: true, message: 'Données de démonstration initialisées' })
  } catch (error) {
    console.log('Erreur lors de l\'initialisation des données de démo:', error)
    return c.json({ error: 'Erreur lors de l\'initialisation' }, 500)
  }
})

// Route pour récupérer les stats du dashboard (sans auth pour simplifier)
app.get('/make-server-020ed839/dashboard/stats', async (c) => {
  try {
    const campaigns = await kv.get('demo_campaigns') || []
    const contacts = await kv.get('demo_contacts') || []
    
    const stats = {
      totalCampaigns: campaigns.length,
      activeCampaigns: campaigns.filter(c => c.status === 'sending').length,
      totalContacts: contacts.length,
      activeContacts: contacts.length,
      deliveryRate: 94,
      openRate: 67,
      replyRate: 12,
      chartData: [
        { date: '2024-01-01', sent: 1200, delivered: 1140, opened: 760 },
        { date: '2024-01-02', sent: 980, delivered: 931, opened: 620 },
        { date: '2024-01-03', sent: 1450, delivered: 1378, opened: 920 },
        { date: '2024-01-04', sent: 1100, delivered: 1045, opened: 698 },
        { date: '2024-01-05', sent: 1350, delivered: 1283, opened: 851 },
        { date: '2024-01-06', sent: 1600, delivered: 1520, opened: 1008 },
        { date: '2024-01-07', sent: 1250, delivered: 1188, opened: 788 }
      ]
    }
    
    return c.json(stats)
  } catch (error) {
    console.log('Erreur lors du chargement des stats:', error)
    return c.json({ error: 'Erreur serveur' }, 500)
  }
})

// Route pour récupérer les analytics (sans auth pour simplifier)
app.get('/make-server-020ed839/analytics', async (c) => {
  try {
    const analyticsData = {
      channelStats: {
        sms: { campaigns: 5, sent: 2500, delivered: 2375, opened: 2138, replied: 156 },
        whatsapp: { campaigns: 3, sent: 1200, delivered: 1176, opened: 1058, replied: 89 },
        email: { campaigns: 8, sent: 4500, delivered: 4410, opened: 3087, replied: 234 }
      },
      evolutionData: [
        { date: '2024-01-01', sms: 300, whatsapp: 150, email: 800 },
        { date: '2024-01-02', sms: 250, whatsapp: 120, email: 650 },
        { date: '2024-01-03', sms: 400, whatsapp: 180, email: 900 },
        { date: '2024-01-04', sms: 350, whatsapp: 160, email: 750 },
        { date: '2024-01-05', sms: 450, whatsapp: 200, email: 950 },
        { date: '2024-01-06', sms: 380, whatsapp: 170, email: 820 },
        { date: '2024-01-07', sms: 320, whatsapp: 140, email: 700 }
      ],
      totalCampaigns: 16,
      activeCampaigns: 3
    }
    
    return c.json(analyticsData)
  } catch (error) {
    console.log('Erreur lors du chargement des analytics:', error)
    return c.json({ error: 'Erreur serveur' }, 500)
  }
})

// Route de base pour toutes les autres requêtes
app.all('/make-server-020ed839/*', async (c) => {
  return c.json({ 
    message: 'Endpoint en cours de développement',
    endpoint: c.req.url,
    method: c.req.method 
  }, 200)
})

// Export et démarrage du serveur
export default app
Deno.serve(app.fetch)