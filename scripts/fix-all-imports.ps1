# Script PowerShell pour corriger tous les imports avec versions
Write-Host "🔧 Correction automatique des imports avec versions..." -ForegroundColor Green

# Définir les correspondances
$packageMappings = @{
    "@radix-ui/react-accordion@.*" = "@radix-ui/react-accordion"
    "@radix-ui/react-alert-dialog@.*" = "@radix-ui/react-alert-dialog"
    "@radix-ui/react-aspect-ratio@.*" = "@radix-ui/react-aspect-ratio"
    "@radix-ui/react-avatar@.*" = "@radix-ui/react-avatar"
    "@radix-ui/react-checkbox@.*" = "@radix-ui/react-checkbox"
    "@radix-ui/react-collapsible@.*" = "@radix-ui/react-collapsible"
    "@radix-ui/react-context-menu@.*" = "@radix-ui/react-context-menu"
    "@radix-ui/react-dialog@.*" = "@radix-ui/react-dialog"
    "@radix-ui/react-dropdown-menu@.*" = "@radix-ui/react-dropdown-menu"
    "@radix-ui/react-hover-card@.*" = "@radix-ui/react-hover-card"
    "@radix-ui/react-label@.*" = "@radix-ui/react-label"
    "@radix-ui/react-menubar@.*" = "@radix-ui/react-menubar"
    "@radix-ui/react-navigation-menu@.*" = "@radix-ui/react-navigation-menu"
    "@radix-ui/react-popover@.*" = "@radix-ui/react-popover"
    "@radix-ui/react-progress@.*" = "@radix-ui/react-progress"
    "@radix-ui/react-radio-group@.*" = "@radix-ui/react-radio-group"
    "@radix-ui/react-scroll-area@.*" = "@radix-ui/react-scroll-area"
    "@radix-ui/react-select@.*" = "@radix-ui/react-select"
    "@radix-ui/react-separator@.*" = "@radix-ui/react-separator"
    "@radix-ui/react-slider@.*" = "@radix-ui/react-slider"
    "@radix-ui/react-switch@.*" = "@radix-ui/react-switch"
    "@radix-ui/react-tabs@.*" = "@radix-ui/react-tabs"
    "@radix-ui/react-toggle@.*" = "@radix-ui/react-toggle"
    "@radix-ui/react-toggle-group@.*" = "@radix-ui/react-toggle-group"
    "@radix-ui/react-tooltip@.*" = "@radix-ui/react-tooltip"
    "lucide-react@.*" = "lucide-react"
    "cmdk@.*" = "cmdk"
    "class-variance-authority@.*" = "class-variance-authority"
    "sonner@.*" = "sonner"
    "embla-carousel-react@.*" = "embla-carousel-react"
    "vaul@.*" = "vaul"
    "react-resizable-panels@.*" = "react-resizable-panels"
    "date-fns@.*" = "date-fns"
    "react-day-picker@.*" = "react-day-picker"
    "input-otp@.*" = "input-otp"
    "next-themes@.*" = "next-themes"
}

# Chercher tous les fichiers TypeScript/TSX
$files = Get-ChildItem -Recurse -Include *.tsx,*.ts | Where-Object { 
    $_.FullName -notmatch "(node_modules|dist|dist-electron|release)" 
}

$totalFixed = 0
$filesModified = @()

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    $fileModified = $false
    
    foreach ($pattern in $packageMappings.Keys) {
        $replacement = $packageMappings[$pattern]
        if ($content -match $pattern) {
            $content = $content -replace $pattern, $replacement
            $fileModified = $true
        }
    }
    
    if ($fileModified) {
        Set-Content $file.FullName $content -NoNewline
        $filesModified += $file.Name
        $totalFixed++
        Write-Host "✅ Corrigé: $($file.Name)" -ForegroundColor Yellow
    }
}

Write-Host "`n🎉 Correction terminée!" -ForegroundColor Green
Write-Host "📊 $totalFixed fichiers corrigés" -ForegroundColor Cyan

if ($filesModified.Count -gt 0) {
    Write-Host "`n📝 Fichiers modifiés:" -ForegroundColor Magenta
    $filesModified | ForEach-Object { Write-Host "  - $_" -ForegroundColor White }
}

# Vérifier qu'il n'y a plus d'erreurs
Write-Host "`n🔍 Vérification finale..." -ForegroundColor Blue
$remainingErrors = @()

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    foreach ($pattern in $packageMappings.Keys) {
        if ($content -match $pattern) {
            $remainingErrors += "$($file.Name): $pattern"
        }
    }
}

if ($remainingErrors.Count -eq 0) {
    Write-Host "✅ Aucun import avec version trouvé - tout est corrigé!" -ForegroundColor Green
} else {
    Write-Host "⚠️ Imports avec versions restants:" -ForegroundColor Yellow
    $remainingErrors | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
}

Write-Host "`nAppuyez sur une touche pour continuer..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")