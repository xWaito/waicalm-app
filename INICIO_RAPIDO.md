# 🚀 WAI CALM - Inicio Rápido

## ⚡ Arrancar la App (2 minutos)

```bash
cd Waicalmpp
npx expo start --clear
```

Luego:
- **Expo Go**: Escanea el QR con tu celular
- **Web**: Presiona `w` en la terminal
- **Android**: Presiona `a` en la terminal
- **iOS**: Presiona `i` en la terminal (solo Mac)

---

## 📱 Testing en Dispositivo

### Login
- Toca "Entrar" (sin validación real)

### Pantallas Principales
1. **Inicio (Dashboard)**
   - Saludo personalizado de María
   - Widget de estrés (42)
   - Gráfico de progreso semanal
   - Checkboxes de hábitos (tocar para marcar)

2. **Diario (Journal)**
   - Seleccionar mood (emoji)
   - Seleccionar tags
   - Escribir pensamiento
   - Guardar (persiste con AsyncStorage)
   
3. **Perfil**
   - Ver datos de María
   - Triple tap en avatar para resetear datos

### QR Scanner
- Desde navegación → QR
- Tocar "Simular Escaneo"
- Ver animación de 4 segundos
- Confirmar navegación a Dashboard

---

## 🔧 Solución de Problemas Rápida

### Error: "Metro bundler not running"
```bash
npx expo start --clear
```

### Error: "Network error"
- Verifica que laptop y celular están en misma WiFi
- Desactiva VPN si está activa

### Error al cargar imágenes
- Verifica conexión a internet (usa URLs de Unsplash)

### App no refleja cambios
```bash
# Detener con Ctrl+C
npx expo start --clear
# Recargar app: Shake device → Reload
```

---

## 📦 Generar APK para Demo

### Opción A: Build en la Nube (RECOMENDADO)

```bash
npm install -g eas-cli
eas login
cd Waicalmpp
eas build:configure
eas build --platform android --profile preview
```

Tiempo: 15-20 min. Link de descarga en terminal.

### Opción B: Testing con Expo Go (MÁS RÁPIDO)

```bash
cd Waicalmpp
npx expo start --clear
```

Escanear QR. Listo para demo en 2 minutos.

---

## 📚 Documentación Completa

- [QA Checklist](QA_CHECKLIST_DEMO.md) - Testing completo paso a paso
- [Implementación](IMPLEMENTACION_COMPLETADA.md) - Resumen técnico
- [README](README.md) - Documentación general

---

## 🎯 Comandos Esenciales

```bash
# Iniciar desarrollo
npm start

# Limpiar cache
npx expo start --clear

# Ver en web
npm run web

# Linting
npm run lint

# Build APK
eas build --platform android --profile preview
```

---

**¿Problemas?** Revisa [QA_CHECKLIST_DEMO.md](QA_CHECKLIST_DEMO.md) o [IMPLEMENTACION_COMPLETADA.md](IMPLEMENTACION_COMPLETADA.md)

---

**Estado**: ✅ App funcional | 🚀 Lista para demo | 📱 Testing manual OK





