# 🚀 Lancement Rapide - Amigo Marketing

## ⚡ Génération de l'Exécutable Windows

### Solution 1-Click (Recommandée)
```bash
# Double-cliquez sur ce fichier :
build-final.bat
```
**Ce script fait tout automatiquement :**
- ✅ Nettoie les anciens builds
- ✅ Installe les dépendances
- ✅ Corrige automatiquement tous les imports problématiques
- ✅ Compile TypeScript
- ✅ Génère l'exécutable Windows
- ✅ Ouvre le dossier avec l'exécutable

### Résultat Attendu
Après exécution, vous trouverez dans le dossier `release/` :
- `Amigo-Marketing-Setup-1.0.0.exe` (Installateur)
- `Amigo-Marketing-Portable-1.0.0.exe` (Version portable)

### En Cas de Problème

#### Si "build-final.bat" ne fonctionne pas :
```bash
# Alternative manuelle :
clean-build.bat
```

#### Si erreurs persistantes :
1. **Redémarrer l'ordinateur** (libère les verrous de fichiers)
2. **Exécuter en tant qu'administrateur** (clic droit → "Exécuter en tant qu'administrateur")
3. **Désactiver temporairement l'antivirus** pendant la compilation

#### Vérification manuelle :
```bash
# Tester la compilation :
npm run type-check

# Si OK, construire :
npm run build
npm run electron:compile
npx electron-builder --win --x64
```

## 📋 Pré-requis
- **Windows 10/11**
- **Node.js 18+** (https://nodejs.org/)
- **8 GB RAM minimum** pour la compilation
- **5 GB d'espace disque libre**

## 🎯 Test de l'Application

### Avant Compilation
```bash
# Mode développement :
npm run electron:dev
```

### Après Compilation
1. Double-cliquez sur `Amigo-Marketing-Setup-1.0.0.exe`
2. Suivez l'installation
3. Lancez "Amigo Marketing" depuis le bureau

## 🔧 Fonctionnalités de l'Application

### Interface Principale
- **Dashboard** : Vue d'ensemble des métriques
- **Campagnes** : Gestion des campagnes SMS/Email/WhatsApp
- **Contacts** : Base de données des contacts
- **Templates** : Modèles de messages personnalisables
- **Analytics** : Rapports détaillés et statistiques
- **Paramètres** : Configuration de l'application

### Capacités Techniques
- **Mode Hors Ligne** : Fonctionne sans internet
- **Export de Données** : CSV, Excel, PDF
- **Synchronisation** : Avec base de données Supabase (si configurée)
- **Responsive** : Interface adaptable desktop/tablet

## 🛠️ Personnalisation

### Modifier l'Icône
Remplacez `assets/icon.ico` par votre propre icône (256x256 pixels, format ICO)

### Modifier le Nom de l'Application
Dans `package.json` :
```json
{
  "build": {
    "productName": "Votre Nom d'Application"
  }
}
```

### Ajouter des Fonctionnalités
1. Modifiez les fichiers dans `components/`
2. Relancez `build-final.bat`

## 🚀 Distribution

### Installer sur un Autre PC
1. Copiez `Amigo-Marketing-Setup-1.0.0.exe`
2. Exécutez sur le PC cible
3. L'application s'installe automatiquement

### Version Portable
1. Utilisez `Amigo-Marketing-Portable-1.0.0.exe`
2. Peut s'exécuter depuis une clé USB
3. Ne nécessite pas d'installation

## 💡 Conseils d'Optimisation

### Performance
- **Fermez les autres applications** pendant la compilation
- **Utilisez un SSD** pour de meilleures performances
- **16 GB RAM recommandés** pour des compilations rapides

### Sécurité
- **Ajoutez le dossier du projet aux exclusions antivirus**
- **Signez l'exécutable** pour éviter les avertissements Windows
- **Testez sur une VM** avant distribution

---

## 🆘 Support Rapide

### ❌ Erreur "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install --force
build-final.bat
```

### ❌ Erreur "Permission denied"
- Exécutez en tant qu'administrateur
- Vérifiez l'antivirus
- Redémarrez l'ordinateur

### ❌ Fichier .exe non généré
- Vérifiez l'espace disque (> 5 GB libre)
- Consultez les logs dans la console
- Tentez `clean-build.bat`

### ✅ Tout Fonctionne !
🎉 **Félicitations !** Votre application Amigo Marketing est prête à être distribuée.

Partagez vos exécutables et commencez à utiliser votre plateforme de marketing digital !