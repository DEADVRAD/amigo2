#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔧 Correction des imports Radix UI...\n');

// Correspondances des packages avec versions vers versions génériques
const packageMappings = {
  '@radix-ui/react-accordion@1.1.2': '@radix-ui/react-accordion',
  '@radix-ui/react-alert-dialog@1.0.5': '@radix-ui/react-alert-dialog',
  '@radix-ui/react-aspect-ratio@1.0.3': '@radix-ui/react-aspect-ratio',
  '@radix-ui/react-avatar@1.0.4': '@radix-ui/react-avatar',
  '@radix-ui/react-checkbox@1.0.4': '@radix-ui/react-checkbox',
  '@radix-ui/react-collapsible@1.0.3': '@radix-ui/react-collapsible',
  '@radix-ui/react-context-menu@2.1.5': '@radix-ui/react-context-menu',
  '@radix-ui/react-dialog@1.0.5': '@radix-ui/react-dialog',
  '@radix-ui/react-dropdown-menu@2.0.6': '@radix-ui/react-dropdown-menu',
  '@radix-ui/react-hover-card@1.0.7': '@radix-ui/react-hover-card',
  '@radix-ui/react-label@2.0.2': '@radix-ui/react-label',
  '@radix-ui/react-menubar@1.0.4': '@radix-ui/react-menubar',
  '@radix-ui/react-navigation-menu@1.1.4': '@radix-ui/react-navigation-menu',
  '@radix-ui/react-popover@1.0.7': '@radix-ui/react-popover',
  '@radix-ui/react-progress@1.0.3': '@radix-ui/react-progress',
  '@radix-ui/react-radio-group@1.1.3': '@radix-ui/react-radio-group',
  '@radix-ui/react-scroll-area@1.0.5': '@radix-ui/react-scroll-area',
  '@radix-ui/react-select@2.0.0': '@radix-ui/react-select',
  '@radix-ui/react-separator@1.0.3': '@radix-ui/react-separator',
  '@radix-ui/react-slider@1.1.2': '@radix-ui/react-slider',
  '@radix-ui/react-switch@1.0.3': '@radix-ui/react-switch',
  '@radix-ui/react-tabs@1.0.4': '@radix-ui/react-tabs',
  '@radix-ui/react-toggle@1.0.3': '@radix-ui/react-toggle',
  '@radix-ui/react-toggle-group@1.0.4': '@radix-ui/react-toggle-group',
  '@radix-ui/react-tooltip@1.1.8': '@radix-ui/react-tooltip',
  'cmdk@0.2.0': 'cmdk',
  'class-variance-authority@0.7.1': 'class-variance-authority',
  'embla-carousel-react@8.0.0': 'embla-carousel-react',
  'vaul@0.9.0': 'vaul',
  'react-resizable-panels@1.0.9': 'react-resizable-panels',
  'date-fns@3.3.1': 'date-fns',
  'react-day-picker@8.10.0': 'react-day-picker',
  'input-otp@1.2.4': 'input-otp',
  'next-themes@0.2.1': 'next-themes',
  'sonner@2.0.3': 'sonner'
};

// Fonction pour corriger un fichier
function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Remplacer tous les imports avec versions
    for (const [versionedPackage, genericPackage] of Object.entries(packageMappings)) {
      const regex = new RegExp(`"${versionedPackage.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g');
      if (content.includes(`"${versionedPackage}"`)) {
        content = content.replace(regex, `"${genericPackage}"`);
        modified = true;
        console.log(`  ✓ Corrigé: ${versionedPackage} → ${genericPackage}`);
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fichier corrigé: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Erreur lors de la correction de ${filePath}:`, error.message);
    return false;
  }
}

// Chercher et corriger tous les fichiers TypeScript
const patterns = [
  'components/**/*.tsx',
  'components/**/*.ts',
  '*.tsx',
  '*.ts'
];

let totalFixed = 0;

patterns.forEach(pattern => {
  const files = glob.sync(pattern, { ignore: ['node_modules/**', 'dist/**', 'dist-electron/**'] });
  
  files.forEach(file => {
    if (fixFile(file)) {
      totalFixed++;
    }
  });
});

console.log(`\n🎉 Correction terminée! ${totalFixed} fichiers corrigés.`);

// Vérifier qu'il n'y a plus d'imports avec versions
console.log('\n🔍 Vérification finale...');
const remainingIssues = [];

patterns.forEach(pattern => {
  const files = glob.sync(pattern, { ignore: ['node_modules/**', 'dist/**', 'dist-electron/**'] });
  
  files.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      for (const versionedPackage of Object.keys(packageMappings)) {
        if (content.includes(`"${versionedPackage}"`)) {
          remainingIssues.push(`${file}: ${versionedPackage}`);
        }
      }
    } catch (error) {
      // Ignorer les erreurs de lecture
    }
  });
});

if (remainingIssues.length === 0) {
  console.log('✅ Aucun import avec version trouvé - tout est corrigé!');
} else {
  console.log('⚠️  Imports avec versions restants:');
  remainingIssues.forEach(issue => console.log(`  - ${issue}`));
}