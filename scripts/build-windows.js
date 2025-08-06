#!/usr/bin/env node

const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Construction de l\'exécutable Windows Amigo Marketing...\n');

// Vérifications préliminaires
console.log('📋 Vérifications préliminaires...');

// Vérifier Node.js version
const nodeVersion = process.version;
console.log(`✓ Node.js version: ${nodeVersion}`);

// Vérifier si les dépendances sont installées
if (!fs.existsSync(path.join(__dirname, '..', 'node_modules'))) {
  console.log('📦 Installation des dépendances...');
  try {
    execSync('npm install', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
  } catch (error) {
    console.error('❌ Erreur lors de l\'installation des dépendances');
    process.exit(1);
  }
}

// Étapes de construction
const steps = [
  {
    name: 'Nettoyage des dossiers de build',
    command: () => {
      const dirs = ['dist', 'dist-electron', 'release'];
      dirs.forEach(dir => {
        const dirPath = path.join(__dirname, '..', dir);
        if (fs.existsSync(dirPath)) {
          fs.rmSync(dirPath, { recursive: true, force: true });
          console.log(`  ✓ Dossier ${dir} supprimé`);
        }
      });
    }
  },
  {
    name: 'Compilation TypeScript Electron',
    command: () => {
      return new Promise((resolve, reject) => {
        const tsc = spawn('npx', ['tsc', '-p', 'electron/tsconfig.json'], {
          stdio: 'inherit',
          cwd: path.join(__dirname, '..')
        });
        tsc.on('close', (code) => {
          if (code === 0) resolve();
          else reject(new Error(`TypeScript compilation failed with code ${code}`));
        });
      });
    }
  },
  {
    name: 'Construction de l\'application React',
    command: () => {
      return new Promise((resolve, reject) => {
        const build = spawn('npm', ['run', 'build'], {
          stdio: 'inherit',
          cwd: path.join(__dirname, '..')
        });
        build.on('close', (code) => {
          if (code === 0) resolve();
          else reject(new Error(`React build failed with code ${code}`));
        });
      });
    }
  },
  {
    name: 'Packaging Electron pour Windows',
    command: () => {
      return new Promise((resolve, reject) => {
        const electronBuilder = spawn('npx', ['electron-builder', '--win', '--x64'], {
          stdio: 'inherit',
          cwd: path.join(__dirname, '..'),
          env: { ...process.env, NODE_ENV: 'production' }
        });
        electronBuilder.on('close', (code) => {
          if (code === 0) resolve();
          else reject(new Error(`Electron builder failed with code ${code}`));
        });
      });
    }
  }
];

// Exécuter les étapes séquentiellement
async function buildApp() {
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    console.log(`\n${i + 1}. ${step.name}...`);
    
    try {
      if (typeof step.command === 'function') {
        const result = step.command();
        if (result instanceof Promise) {
          await result;
        }
      }
      console.log(`✅ ${step.name} terminé`);
    } catch (error) {
      console.error(`❌ Erreur dans ${step.name}:`, error.message);
      process.exit(1);
    }
  }
  
  console.log('\n🎉 Construction terminée avec succès!');
  console.log('\n📁 Fichiers générés:');
  console.log('   - Installateur: release/Amigo-Marketing-Setup-1.0.0.exe');
  console.log('   - Version portable: release/Amigo-Marketing-Portable-1.0.0.exe');
  console.log('\n💡 Vous pouvez maintenant distribuer ces fichiers aux utilisateurs Windows.');
}

buildApp().catch(error => {
  console.error('❌ Erreur générale de construction:', error);
  process.exit(1);
});