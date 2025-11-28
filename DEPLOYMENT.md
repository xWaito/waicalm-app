# 🚀 Guía de Deployment - WaiCalm

## 📋 Checklist Pre-Deployment

### 1. Configuración Git
- [x] Repositorio inicializado
- [x] Credenciales configuradas
- [x] .gitignore actualizado

### 2. Configuración Android
- [x] Package name: `com.waicalm.app`
- [x] Version code: `1`
- [x] Permisos configurados
- [x] Políticas de instalación habilitadas
- [x] Intent filters configurados

### 3. Build Configuration
- [x] EAS.json configurado
- [x] Babel.config.js con Reanimated
- [x] App.json actualizado

## 🔧 Comandos de Deployment

### Paso 1: Configurar Git (Solo primera vez)
```powershell
cd C:\Waicalmpp\Waicalmpp
git config user.email "lfwg98@gmail.com"
git config user.name "WaiCalm Developer"
```

### Paso 2: Hacer Commit y Push
```powershell
# Agregar todos los cambios
git add .

# Commit con mensaje descriptivo
git commit -m "feat: Preparación para build APK v1.0.0 - Políticas Android configuradas"

# Push a GitHub
git push origin main
```

### Paso 3: Generar APK con EAS Build
```powershell
# Asegúrate de tener EAS CLI instalado
npm install -g eas-cli

# Login en EAS (solo primera vez)
eas login

# Configurar proyecto EAS (solo primera vez)
eas build:configure

# Generar APK Preview (para pruebas)
eas build --platform android --profile preview

# O generar APK Production (para distribución)
eas build --platform android --profile production
```

## 📱 Políticas de Instalación Android

### Configuración Aplicada

El `app.json` ha sido configurado con:

1. **allowBackup: true** - Permite backup de datos
2. **requestLegacyExternalStorage: true** - Compatibilidad con almacenamiento externo
3. **Intent Filters** - Para deep linking con scheme `waicalm://`

### Instalación en Dispositivos

El APK generado puede instalarse en **cualquier dispositivo Android** siguiendo estos pasos:

1. **Habilitar "Orígenes Desconocidos"**:
   - Settings > Security > Unknown Sources > Enable
   - O Settings > Apps > Special Access > Install Unknown Apps

2. **Transferir APK al dispositivo**:
   - Descargar desde EAS Dashboard
   - Transferir vía USB, email, o cloud storage

3. **Instalar APK**:
   - Abrir el archivo .apk
   - Seguir las instrucciones de instalación
   - Aceptar permisos necesarios

## 🔐 Seguridad

### Permisos Requeridos
- ✅ CAMERA - Para escanear QR del kit
- ✅ VIBRATE - Feedback háptico
- ✅ INTERNET - Conexión API
- ✅ STORAGE - Guardar datos localmente

### Permisos Bloqueados
- ❌ RECORD_AUDIO - No se requiere micrófono

## 📦 Estructura del Build

### APK Preview
- **Tipo**: APK sin firmar (para pruebas)
- **Distribución**: Internal
- **Tamaño**: ~45-60 MB
- **Tiempo de build**: 15-20 minutos

### APK Production
- **Tipo**: APK firmado
- **Distribución**: Production
- **Tamaño**: ~45-60 MB
- **Tiempo de build**: 20-25 minutos

## 🎯 Próximos Pasos

1. ✅ Commit y push a GitHub
2. ✅ Generar APK Preview
3. ⏳ Probar en dispositivo físico
4. ⏳ Generar APK Production
5. ⏳ Distribuir APK

## 📞 Troubleshooting

### Error: "EAS CLI not found"
```powershell
npm install -g eas-cli
```

### Error: "Not logged in"
```powershell
eas login
```

### Error: "Project not configured"
```powershell
eas build:configure
```

### Error: "Build failed"
- Revisar logs en EAS Dashboard
- Verificar que todos los archivos estén commiteados
- Ejecutar `npx expo-doctor` para diagnóstico

---

**Última actualización**: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
**Versión**: 1.0.0
**Estado**: ✅ Listo para deployment

