#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧹 Nettoyage des dépendances...');

const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
const packageLockPath = path.join(__dirname, '..', 'package-lock.json');

// Supprimer node_modules s'il existe
if (fs.existsSync(nodeModulesPath)) {
  console.log('📁 Suppression du dossier node_modules...');
  fs.rmSync(nodeModulesPath, { recursive: true, force: true });
}

// Supprimer package-lock.json s'il existe
if (fs.existsSync(packageLockPath)) {
  console.log('📄 Suppression du fichier package-lock.json...');
  fs.unlinkSync(packageLockPath);
}

console.log('📦 Installation fraîche des dépendances...');
try {
  execSync('npm install', { 
    stdio: 'inherit', 
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, NODE_ENV: 'development' }
  });
  console.log('✅ Installation terminée avec succès!');
  console.log('🚀 Vous pouvez maintenant lancer: npm run dev');
} catch (error) {
  console.error('❌ Erreur lors de l\'installation:', error.message);
  process.exit(1);
}