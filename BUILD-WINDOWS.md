# 📦 Guide de Construction - Exécutable Windows

## 🎯 Objectif
Ce guide vous permet de créer un exécutable Windows autonome d'Amigo Marketing.

## 📋 Prérequis

### Système requis
- **Windows 10/11** (pour les tests)
- **Node.js >= 18.0.0**
- **npm >= 8.0.0**
- **Git** (optionnel)

### Outils recommandés
- **Visual Studio Code** avec extensions TypeScript et React
- **Postman** pour tester les APIs (optionnel)

## 🚀 Instructions de Construction

### 1. Installation des dépendances

```bash
# Installation des dépendances
npm install

# Correction automatique des imports (IMPORTANT)
fix-imports.bat

# Vérification des dépendances Electron
npm list electron electron-builder
```

### 2. Test en mode développement

```bash
# Lancer l'application web
npm run dev

# Dans un autre terminal, lancer Electron
npm run electron:dev
```

### 3. Construction de l'exécutable

#### Option A: Script automatisé (Recommandé)
```bash
npm run build:win
```

#### Option B: Construction manuelle
```bash
# 1. Build de l'application React
npm run build

# 2. Compilation TypeScript Electron
npx tsc -p electron/tsconfig.json

# 3. Packaging avec Electron Builder
npx electron-builder --win --x64
```

### 4. Types d'exécutables générés

Le processus génère **2 fichiers** dans le dossier `release/` :

1. **Installateur NSIS**
   - `Amigo-Marketing-Setup-1.0.0.exe`
   - Installation classique Windows
   - Ajoute l'app au menu Démarrer
   - Crée un raccourci bureau

2. **Version Portable**
   - `Amigo-Marketing-Portable-1.0.0.exe`
   - Exécutable autonome
   - Aucune installation requise
   - Parfait pour les clés USB

## 📁 Structure des Fichiers Générés

```
release/
├── Amigo-Marketing-Setup-1.0.0.exe     # Installateur (45-60 MB)
├── Amigo-Marketing-Portable-1.0.0.exe  # Portable (50-70 MB)
├── builder-debug.yml                    # Logs de construction
└── win-unpacked/                        # Version non-packagée
    ├── Amigo Marketing.exe
    ├── resources/
    └── locales/
```

## ⚙️ Configuration Avancée

### Personnalisation de l'icône
Remplacez `assets/icon.ico` par votre icône personnalisée (format .ico, 256x256px recommandé).

### Modification des métadonnées
Éditez `package.json` section `"build"` :

```json
{
  "build": {
    "productName": "Votre Nom d'App",
    "appId": "com.votre-entreprise.app",
    "win": {
      "publisherName": "Votre Entreprise"
    }
  }
}
```

### Signature de code (Production)
Pour un déploiement professionnel, ajoutez un certificat de signature :

```json
{
  "build": {
    "win": {
      "certificateFile": "path/to/certificate.p12",
      "certificatePassword": "password"
    }
  }
}
```

## 🔧 Résolution de Problèmes

### Erreur: "electron command not found"
```bash
npm install --save-dev electron@latest
```

### Erreur: "Permission denied" 
Exécutez le terminal en tant qu'administrateur.

### Application ne démarre pas
1. Vérifiez que tous les fichiers sont dans `dist/`
2. Examinez les logs dans `release/builder-debug.yml`
3. Testez d'abord en mode `npm run electron:dev`

### Taille de l'exécutable trop importante
L'application inclut Node.js et Chromium (~50-70MB). C'est normal pour une app Electron.

## 🧪 Tests

### Test local
```bash
# Tester l'application packagée localement
./release/win-unpacked/Amigo\ Marketing.exe
```

### Test sur machine propre
1. Copiez l'installateur sur une machine sans Node.js
2. Installez et testez toutes les fonctionnalités
3. Vérifiez que l'app fonctionne hors ligne

## 📊 Fonctionnalités Incluses

✅ **Interface complète** - Dashboard, Campagnes, Contacts, etc.
✅ **Mode hors ligne** - Fonctionne sans internet avec données de démo
✅ **Sauvegarde locale** - Export/Import des données
✅ **Interface native** - Menus Windows natifs
✅ **Installation propre** - Désinstallation complète
✅ **Mise à jour** - Prêt pour l'auto-update (configuration requise)

## 🚢 Distribution

### Distribution interne
- Partagez le fichier `.exe` via réseau local, email, ou serveur web
- La version portable ne nécessite aucun privilège administrateur

### Distribution publique
1. Ajoutez un certificat de signature de code
2. Considérez un système de mise à jour automatique
3. Testez sur différentes versions de Windows

## 💡 Conseils de Performance

- **Premier lancement** : Peut prendre 5-10 secondes
- **Utilisation mémoire** : ~100-150MB (normal pour Electron)
- **Espace disque** : ~200MB après installation

---

**🎉 Félicitations !** Vous avez maintenant un exécutable Windows professionnel d'Amigo Marketing prêt à distribuer.

Pour plus d'informations, consultez la [documentation Electron Builder](https://www.electron.build/).