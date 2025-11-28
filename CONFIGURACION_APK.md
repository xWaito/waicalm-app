# 🔐 CONFIGURACIÓN COMPLETA PARA APK UNIVERSAL

**Fecha**: 24 Noviembre 2024  
**Versión**: 1.0.0  
**Estado**: ✅ Configurado para generar APK universal

---

## 📋 ARCHIVOS DE CONFIGURACIÓN

### 1. **`babel.config.js`** ✅
```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin', // ✅ ÚLTIMO PLUGIN
    ],
  };
};
```

**Importante**: El plugin de Reanimated DEBE ser el último.

---

### 2. **`eas.json`** ✅
```json
{
  "cli": {
    "version": ">= 16.28.0",
    "appVersionSource": "remote"
  },
  "build": {
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

**Clave**: `"buildType": "apk"` - Genera APK en lugar de AAB.

---

### 3. **`app.json` - Configuración Android** ✅

#### **Package Name (Identificador único)**:
```json
"package": "com.waicalm.app"
```

#### **Version Code**:
```json
"versionCode": 1
```

#### **Permisos Necesarios**:
```json
"permissions": [
  "CAMERA",              // Para escanear QR del kit
  "VIBRATE",             // Para feedback háptico
  "READ_EXTERNAL_STORAGE", // Para guardar datos
  "WRITE_EXTERNAL_STORAGE", // Para guardar datos
  "INTERNET",            // Para conexión API (futuro)
  "ACCESS_NETWORK_STATE" // Para verificar conexión
]
```

#### **Permisos Bloqueados** (Seguridad):
```json
"blockedPermissions": [
  "android.permission.RECORD_AUDIO" // No necesitamos micrófono
]
```

---

## 🔑 CLAVES Y CONFIGURACIONES IMPORTANTES

### **Identificadores de la App**:

| Campo | Valor | Descripción |
|-------|-------|-------------|
| **Package Name** | `com.waicalm.app` | Identificador único Android |
| **Bundle ID (iOS)** | `com.waicalm.app` | Identificador único iOS |
| **Slug** | `waicalm` | Identificador Expo |
| **Scheme** | `waicalm` | Deep linking |
| **Project ID** | `Waicalmpp` | ID del proyecto EAS |

---

### **Versiones**:

| Campo | Valor Actual | Próxima |
|-------|--------------|---------|
| **Version** | `1.0.0` | `1.0.1` |
| **Version Code** | `1` | `2` |

**Nota**: `versionCode` debe incrementarse en cada build de Android.

---

### **Políticas y Permisos**:

#### **Permisos Requeridos**:
- ✅ **CAMERA**: Escanear QR del kit bio-inteligente
- ✅ **VIBRATE**: Feedback háptico al completar hábitos
- ✅ **INTERNET**: Conexión con backend (futuro)
- ✅ **STORAGE**: Guardar entradas del journal en AsyncStorage

#### **Permisos NO Requeridos** (Bloqueados):
- ❌ **RECORD_AUDIO**: No usamos micrófono
- ❌ **LOCATION**: No rastreamos ubicación
- ❌ **CONTACTS**: No accedemos a contactos

---

## 🚀 COMANDOS PARA GENERAR APK

### **Opción 1: Preview (Recomendado para pruebas)**
```powershell
cd C:\Waicalmpp\Waicalmpp
eas build --platform android --profile preview
```

**Resultado**: APK para distribución interna  
**Tiempo**: 15-20 minutos  
**Ubicación**: Descargable desde EAS Dashboard

---

### **Opción 2: Production (Para Play Store)**
```powershell
eas build --platform android --profile production
```

**Resultado**: APK firmado para producción  
**Tiempo**: 20-25 minutos  
**Nota**: Requiere configuración de keystore

---

## 📱 COMPATIBILIDAD

### **Dispositivos Soportados**:

✅ **Android 6.0+** (API Level 23+)  
✅ **Tablets y Phones**  
✅ **Cualquier fabricante** (Samsung, Xiaomi, Huawei, etc.)  
✅ **Arquitecturas**: ARM64, ARMv7, x86 (para emuladores)

---

## 🔒 POLÍTICAS DE PRIVACIDAD

### **Datos que la App NO Recolecta**:
- ❌ Ubicación GPS
- ❌ Contactos
- ❌ Archivos del dispositivo
- ❌ Información de otras apps

### **Datos que la App Guarda (Localmente)**:
- ✅ Entradas del journal (AsyncStorage)
- ✅ Estado de hábitos completados
- ✅ Preferencias del usuario

### **Datos que se Enviarán al Backend (Futuro)**:
- ✅ Perfil de usuario (nombre, email)
- ✅ Métricas de estrés
- ✅ Historial de hábitos
- ✅ Entradas del journal (con consentimiento)

---

## 📦 ESTRUCTURA DEL APK

### **Tamaño Aproximado**:
- **APK Base**: ~45-60 MB
- **Con assets optimizados**: ~35-50 MB

### **Incluye**:
- ✅ React Native runtime
- ✅ Expo SDK
- ✅ Todas las dependencias
- ✅ Assets (imágenes, fuentes)
- ✅ JavaScript bundle

---

## 🛠️ TROUBLESHOOTING

### **Error: "Gradle build failed"**
**Solución**:
```powershell
cd C:\Waicalmpp\Waicalmpp
rm -r node_modules
npm install
npx expo start --clear
```

---

### **Error: "Project config: Slug does not match"**
**Solución**: Verificar que `app.json` tenga:
```json
"slug": "waicalm",
"extra": {
  "eas": {
    "projectId": "Waicalmpp"
  }
}
```

---

### **Error: "babel.config.js not found"**
**Solución**: Crear `babel.config.js` en la raíz del proyecto con:
```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
```

---

### **APK no instala en dispositivo**
**Causas posibles**:
1. **Orígenes desconocidos**: Habilitar en Android Settings
2. **Espacio insuficiente**: Liberar espacio
3. **Versión Android muy antigua**: Requiere Android 6.0+

**Solución**:
```
Settings > Security > Unknown Sources > Enable
```

---

## 📝 CHECKLIST PRE-BUILD

Antes de generar el APK, verifica:

- [x] ✅ `babel.config.js` existe y tiene Reanimated plugin
- [x] ✅ `eas.json` tiene `"buildType": "apk"`
- [x] ✅ `app.json` tiene `package` y `versionCode`
- [x] ✅ Permisos Android configurados
- [x] ✅ `newArchEnabled` y `experiments` removidos
- [x] ✅ Iconos y splash screen configurados
- [x] ✅ Proyecto compila sin errores localmente

---

## 🎯 PRÓXIMOS PASOS

1. **Generar APK Preview**:
   ```powershell
   eas build --platform android --profile preview
   ```

2. **Probar en dispositivo físico**:
   - Descargar APK desde EAS Dashboard
   - Instalar en Android
   - Probar todas las features

3. **Si funciona, generar Production**:
   ```powershell
   eas build --platform android --profile production
   ```

---

## 📞 SOPORTE

**Si tienes problemas**:
1. Revisa este archivo
2. Verifica que todos los archivos existan
3. Ejecuta `npx expo-doctor` para diagnóstico
4. Revisa logs en EAS Dashboard

---

**Estado**: ✅ **LISTO PARA GENERAR APK UNIVERSAL**  
**Última actualización**: 24 Nov 2024  
**Versión**: 1.0.0




