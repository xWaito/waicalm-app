# 📱 Instrucciones para Generar APK - WaiCalm

## ✅ Estado Actual

- ✅ **Git configurado** con credenciales: lfwg98@gmail.com
- ✅ **Commit realizado**: "feat: Preparación para build APK v1.0.0"
- ✅ **Políticas Android configuradas** para instalación universal
- ✅ **EAS.json configurado** para generar APK
- ✅ **App.json actualizado** con permisos y políticas

## 🚀 Pasos para Generar el APK

### Paso 1: Instalar EAS CLI (si no lo tienes)

```powershell
npm install -g eas-cli
```

### Paso 2: Login en EAS (solo primera vez)

```powershell
eas login
```

Ingresa tus credenciales de Expo cuando te lo solicite.

### Paso 3: Configurar Proyecto EAS (solo primera vez)

```powershell
cd C:\Waicalmpp\Waicalmpp
eas build:configure
```

Esto configurará el proyecto para usar EAS Build.

### Paso 4: Generar APK Preview (Recomendado para pruebas)

```powershell
eas build --platform android --profile preview
```

**Características del APK Preview:**
- ✅ APK sin firmar (para pruebas)
- ✅ Instalable en cualquier dispositivo Android
- ✅ Tiempo de build: 15-20 minutos
- ✅ Descargable desde EAS Dashboard

### Paso 5: Generar APK Production (Para distribución final)

```powershell
eas build --platform android --profile production
```

**Características del APK Production:**
- ✅ APK firmado
- ✅ Listo para distribución
- ✅ Tiempo de build: 20-25 minutos
- ✅ Requiere configuración de keystore (EAS lo maneja automáticamente)

## 📥 Descargar el APK

Una vez completado el build:

1. Ve a: https://expo.dev/accounts/[tu-cuenta]/projects/Waicalmpp/builds
2. Busca el build más reciente
3. Haz clic en "Download" para descargar el APK

## 📱 Instalar el APK en Dispositivos

### En el Dispositivo Android:

1. **Habilitar "Orígenes Desconocidos"**:
   - Ve a: **Settings > Security > Unknown Sources** (o **Install Unknown Apps**)
   - Habilita la opción para el navegador o gestor de archivos que usarás

2. **Transferir APK al dispositivo**:
   - Opción A: Descargar directamente desde el navegador del dispositivo
   - Opción B: Transferir vía USB desde tu computadora
   - Opción C: Subir a Google Drive/Dropbox y descargar desde el dispositivo

3. **Instalar**:
   - Abre el archivo `.apk` descargado
   - Sigue las instrucciones de instalación
   - Acepta los permisos necesarios (Cámara, Almacenamiento, etc.)

## 🔧 Script Automatizado

También puedes usar el script de deployment:

```powershell
cd C:\Waicalmpp\Waicalmpp
.\scripts\deploy.ps1 -Version "1.0.0" -BuildProfile "preview"
```

**Opciones del script:**
- `-SkipGit`: Saltar commit y push a GitHub
- `-SkipBuild`: Solo hacer commit, no generar APK
- `-BuildProfile`: "preview" o "production"

## ⚙️ Configuración Aplicada

### Políticas Android Habilitadas:

```json
{
  "allowBackup": true,
  "requestLegacyExternalStorage": true,
  "intentFilters": [
    {
      "action": "VIEW",
      "autoVerify": true,
      "data": [{ "scheme": "waicalm" }],
      "category": ["BROWSABLE", "DEFAULT"]
    }
  ]
}
```

### Permisos Configurados:

- ✅ **CAMERA**: Para escanear QR del kit
- ✅ **VIBRATE**: Feedback háptico
- ✅ **INTERNET**: Conexión API
- ✅ **STORAGE**: Guardar datos localmente

## 🐛 Troubleshooting

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
1. Revisa los logs en EAS Dashboard
2. Verifica que todos los archivos estén commiteados
3. Ejecuta diagnóstico: `npx expo-doctor`

### APK no instala en dispositivo
1. Verifica que "Orígenes Desconocidos" esté habilitado
2. Asegúrate de tener espacio suficiente
3. Verifica que el dispositivo sea Android 6.0+ (API 23+)

## 📊 Información del Build

- **Package**: `com.waicalm.app`
- **Version**: `1.0.0`
- **Version Code**: `1`
- **Tamaño APK**: ~45-60 MB
- **Compatibilidad**: Android 6.0+ (API 23+)

## 🎯 Próximos Pasos

1. ✅ Commit y push a GitHub - **COMPLETADO**
2. ⏳ Generar APK Preview
3. ⏳ Probar en dispositivo físico
4. ⏳ Generar APK Production
5. ⏳ Distribuir APK

---

**Última actualización**: 2024-11-24
**Versión**: 1.0.0
**Estado**: ✅ Listo para generar APK

