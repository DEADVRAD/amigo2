#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Démarrage d\'Amigo Marketing...\n');

// Vérifier si node_modules existe
const fs = require('fs');
if (!fs.existsSync(path.join(__dirname, '..', 'node_modules'))) {
  console.log('📦 Installation des dépendances...');
  const install = spawn('npm', ['install'], { stdio: 'inherit', cwd: path.join(__dirname, '..') });
  
  install.on('close', (code) => {
    if (code === 0) {
      startDev();
    } else {
      console.error('❌ Erreur lors de l\'installation des dépendances');
      process.exit(1);
    }
  });
} else {
  startDev();
}

function startDev() {
  console.log('🔥 Lancement du serveur de développement...');
  console.log('📱 L\'application sera disponible sur http://localhost:3000\n');
  
  const dev = spawn('npm', ['run', 'dev'], { 
    stdio: 'inherit', 
    cwd: path.join(__dirname, '..') 
  });
  
  dev.on('close', (code) => {
    console.log(`Serveur fermé avec le code ${code}`);
  });
}