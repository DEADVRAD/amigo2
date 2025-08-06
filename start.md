# 🚀 Guide de Démarrage - Amigo Marketing

## Étape 1: Installation des dépendances

Ouvrez un terminal dans le dossier du projet et exécutez :

```bash
npm run clean-install
```

OU manuellement :

```bash
# Supprimer le dossier node_modules (si existant)
rm -rf node_modules package-lock.json

# Installer les dépendances
npm install
```

## Étape 2: Lancer l'application

```bash
npm run dev
```

## Étape 3: Ouvrir dans le navigateur

Allez sur : http://localhost:3000

## 🔧 En cas de problème

### Problème : Erreur d'import Radix UI
**Solution** : Les composants UI ont été corrigés pour utiliser les imports standards

### Problème : Port 3000 occupé
**Solution** : Modifiez le port dans `vite.config.ts` ligne 13

### Problème : TypeScript errors
**Solution** : Exécutez `npm run type-check` pour diagnostiquer

## 📱 Fonctionnalités testables

Une fois l'application lancée, vous pouvez :
- ✅ Naviguer dans le Dashboard avec métriques en temps réel
- ✅ Gérer les campagnes SMS/Email/WhatsApp
- ✅ Administrer les listes de contacts
- ✅ Créer des templates personnalisés  
- ✅ Visualiser les analytics détaillées
- ✅ Configurer les paramètres API

**Mode démonstration** : L'app fonctionne avec des données réalistes même hors ligne !

---
*Amigo Marketing - Votre plateforme de marketing digital complète*