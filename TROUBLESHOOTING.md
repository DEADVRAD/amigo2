# 🔧 Guide de Résolution des Problèmes

## Problèmes de Construction TypeScript

### Erreur: "Output file has not been built from source file"
**Solution complète :**

1. **Nettoyage complet :**
   ```bash
   # Supprimer tous les fichiers temporaires
   rmdir /s /q node_modules
   rmdir /s /q dist
   rmdir /s /q dist-electron
   rmdir /s /q release
   del package-lock.json
   ```

2. **Réinstallation :**
   ```bash
   npm install
   ```

3. **Utiliser le script de nettoyage :**
   ```bash
   # Double-cliquez sur clean-build.bat
   # OU exécutez dans le terminal :
   clean-build.bat
   ```

### Erreur: "Referenced project may not disable emit"
**Cause :** Conflit de configuration TypeScript
**Solution :** Les fichiers de configuration ont été corrigés. Utilisez `clean-build.bat`.

### Erreur: "Cannot find module 'electron'"
**Solution :**
```bash
npm install --save-dev electron@latest
npm install --save-dev @types/node
```

## Problèmes de Construction Windows

### Erreur: "electron-builder command not found"
**Solution :**
```bash
npm install --save-dev electron-builder@latest
npx electron-builder --version
```

### Erreur: "Permission denied" lors du packaging
**Solutions :**
1. Exécuter le terminal en tant qu'administrateur
2. Désactiver temporairement l'antivirus
3. Ajouter le dossier du projet aux exclusions Windows Defender

### Erreur: "Application ne démarre pas"
**Diagnostic :**
1. Vérifier que `dist/` contient les fichiers de l'application
2. Vérifier que `dist-electron/` contient les fichiers compilés
3. Examiner les logs dans `release/builder-debug.yml`

**Solution :**
```bash
# Tester d'abord en mode développement
npm run electron:dev
```

## Problèmes d'Exécution

### L'application se ferme immédiatement
**Solutions :**
1. Vérifier les fichiers dans `dist-electron/main.js`
2. Ouvrir la console (F12) pour voir les erreurs
3. Vérifier que tous les chemins de fichiers sont corrects

### Interface ne se charge pas
**Solutions :**
1. Vérifier que `dist/index.html` existe
2. Vérifier les chemins des assets dans le build
3. Examiner la console réseau pour les fichiers manquants

### Fonctionnalités manquantes en mode desktop
**Vérification :**
```javascript
// Dans la console de l'application :
console.log(window.electronAPI ? 'Mode Desktop' : 'Mode Web')
```

## Optimisation des Performances

### Temps de construction long
**Solutions :**
1. Fermer les applications non nécessaires
2. Ajouter le dossier du projet aux exclusions antivirus
3. Utiliser un SSD pour de meilleures performances I/O

### Taille d'exécutable importante
**Normal :** 50-70MB est normal pour une application Electron
**Réduction :** 
- Supprimer les dépendances non utilisées
- Optimiser les assets (images, fonts)

## Scripts de Débogage

### Test rapide de l'environnement
```batch
@echo off
echo === Test Environnement ===
node --version
npm --version
npx tsc --version
npx electron --version
echo === Fin Test ===
pause
```

### Vérification des fichiers de build
```batch
@echo off
echo === Verification Build ===
if exist "dist" (echo ✅ dist/) else (echo ❌ dist/ manquant)
if exist "dist-electron" (echo ✅ dist-electron/) else (echo ❌ dist-electron/ manquant)
if exist "release" (echo ✅ release/) else (echo ❌ release/ manquant)
echo === Fin Verification ===
pause
```

## Contacts et Support

Si les problèmes persistent :

1. **Vérifiez les versions :**
   - Node.js >= 18.0.0
   - npm >= 8.0.0
   - Windows 10/11

2. **Collectez les informations :**
   - Version de Windows
   - Messages d'erreur complets
   - Contenu du fichier `release/builder-debug.yml`

3. **Actions de dernier recours :**
   - Redémarrer l'ordinateur
   - Réinstaller Node.js
   - Cloner le projet dans un nouveau dossier

---

## Scripts de Récupération d'Urgence

### Réinitialisation complète
```batch
@echo off
echo ATTENTION: Ceci va supprimer tous les fichiers temporaires
pause
rmdir /s /q node_modules
rmdir /s /q dist
rmdir /s /q dist-electron  
rmdir /s /q release
del package-lock.json
npm install
npm run type-check
echo Reinitialisation terminee !
pause
```

Sauvegardez ce script sous `reset-project.bat` pour une récupération rapide.