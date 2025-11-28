# 🚀 Script de Deployment - WaiCalm
# Este script automatiza el proceso de deployment a GitHub y generación de APK

param(
    [string]$Version = "1.0.0",
    [switch]$SkipGit = $false,
    [switch]$SkipBuild = $false,
    [string]$BuildProfile = "preview"
)

Write-Host "🚀 Iniciando Deployment de WaiCalm v$Version" -ForegroundColor Cyan
Write-Host ""

# Colores
$successColor = "Green"
$errorColor = "Red"
$infoColor = "Yellow"

# Función para verificar comandos
function Test-Command {
    param([string]$Command)
    $null = Get-Command $Command -ErrorAction SilentlyContinue
    return $?
}

# Verificar dependencias
Write-Host "📋 Verificando dependencias..." -ForegroundColor $infoColor

if (-not (Test-Command "git")) {
    Write-Host "❌ Git no está instalado" -ForegroundColor $errorColor
    exit 1
}

if (-not (Test-Command "eas")) {
    Write-Host "⚠️  EAS CLI no está instalado. Instalando..." -ForegroundColor $infoColor
    npm install -g eas-cli
    if (-not (Test-Command "eas")) {
        Write-Host "❌ Error instalando EAS CLI" -ForegroundColor $errorColor
        exit 1
    }
}

Write-Host "✅ Dependencias verificadas" -ForegroundColor $successColor
Write-Host ""

# Paso 1: Git Commit y Push
if (-not $SkipGit) {
    Write-Host "📦 Paso 1: Preparando commit a GitHub..." -ForegroundColor $infoColor
    
    # Verificar estado
    $gitStatus = git status --porcelain
    if ($gitStatus) {
        Write-Host "📝 Archivos modificados detectados" -ForegroundColor $infoColor
        
        # Agregar todos los archivos
        git add .
        
        # Commit
        $commitMessage = "feat: Preparación para build APK v$Version - Políticas Android configuradas"
        git commit -m $commitMessage
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Commit creado exitosamente" -ForegroundColor $successColor
            
            # Push
            Write-Host "📤 Enviando a GitHub..." -ForegroundColor $infoColor
            git push origin main
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ Push a GitHub completado" -ForegroundColor $successColor
            } else {
                Write-Host "⚠️  Error en push a GitHub (puede que necesites configurar credenciales)" -ForegroundColor $errorColor
            }
        } else {
            Write-Host "⚠️  No se pudo crear commit (puede que no haya cambios)" -ForegroundColor $infoColor
        }
    } else {
        Write-Host "ℹ️  No hay cambios para commitear" -ForegroundColor $infoColor
    }
    
    Write-Host ""
} else {
    Write-Host "⏭️  Saltando paso de Git" -ForegroundColor $infoColor
    Write-Host ""
}

# Paso 2: Build APK
if (-not $SkipBuild) {
    Write-Host "🔨 Paso 2: Generando APK..." -ForegroundColor $infoColor
    
    # Verificar login en EAS
    Write-Host "🔐 Verificando login en EAS..." -ForegroundColor $infoColor
    $easLogin = eas whoami 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️  No estás logueado en EAS. Ejecuta: eas login" -ForegroundColor $errorColor
        Write-Host "   Luego ejecuta este script nuevamente con -SkipGit" -ForegroundColor $infoColor
        exit 1
    }
    
    Write-Host "✅ Autenticado en EAS" -ForegroundColor $successColor
    Write-Host ""
    
    # Generar build
    Write-Host "🏗️  Iniciando build con perfil: $BuildProfile" -ForegroundColor $infoColor
    Write-Host "   Esto puede tomar 15-25 minutos..." -ForegroundColor $infoColor
    Write-Host ""
    
    eas build --platform android --profile $BuildProfile --non-interactive
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Build completado exitosamente!" -ForegroundColor $successColor
        Write-Host "📱 Revisa el APK en: https://expo.dev/accounts/[tu-cuenta]/projects/Waicalmpp/builds" -ForegroundColor $infoColor
    } else {
        Write-Host ""
        Write-Host "❌ Error en el build. Revisa los logs arriba." -ForegroundColor $errorColor
        exit 1
    }
} else {
    Write-Host "⏭️  Saltando build de APK" -ForegroundColor $infoColor
}

Write-Host ""
Write-Host "🎉 Deployment completado!" -ForegroundColor $successColor
Write-Host ""
Write-Host "📋 Resumen:" -ForegroundColor Cyan
Write-Host "   Versión: $Version" -ForegroundColor White
if (-not $SkipGit) {
    Write-Host "   Git: ✅ Commit y push completados" -ForegroundColor White
}
if (-not $SkipBuild) {
    Write-Host "   Build: ✅ APK generado" -ForegroundColor White
}
Write-Host ""

