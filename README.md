# 🧘 WaiCalm - App de Bienestar Mental

![WaiCalm Logo](assets/images/icon.png)

Aplicación móvil completa para el bienestar mental con seguimiento de estrés, actividades de relajación y comunidad de apoyo.

## ✨ Características

- 📊 **Dashboard** con widget de nivel de estrés en tiempo real
- 🫁 **Actividades de respiración** guiada (5 minutos)
- 📖 **Journal personal** para reflexiones
- 💊 **Seguimiento de suplementos** (gomitas y roll-on)
- 📈 **Gráficos de progreso** y tendencias de cortisol
- 🎓 **Contenido educativo** sobre neurociencia y bienestar
- 👥 **Comunidad** con feed social y sesiones en vivo
- 🌙 **Sistema de temas** dual (Light/Dark Mode)
- 🔐 **Autenticación segura** con JWT
- 📱 **QR Scanner** para activar kit físico

## 🛠️ Tecnologías

### Frontend
- **React Native** (Expo SDK 54)
- **TypeScript**
- **Expo Router** (navegación basada en archivos)
- **React Navigation** (tabs y stacks)
- **Reanimated** (animaciones fluidas)
- **Expo Linear Gradient** (gradientes)
- **Axios** (cliente HTTP)

### Backend
- **Node.js** + **Express.js**
- **TypeScript**
- **MongoDB** + **Mongoose** (ODM)
- **JWT** (autenticación)
- **bcryptjs** (hash de contraseñas)
- **CORS** (Cross-Origin Resource Sharing)

## 📦 Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn
- MongoDB Atlas (o MongoDB local)
- Git

## 🚀 Instalación

### 1. Clonar el repositorio

\`\`\`bash
git clone https://github.com/TU_USUARIO/waicalm.git
cd waicalm
\`\`\`

### 2. Instalar dependencias del Frontend

\`\`\`bash
npm install
\`\`\`

### 3. Instalar dependencias del Backend

\`\`\`bash
cd waicalm-backend
npm install
\`\`\`

### 4. Configurar variables de entorno

**Frontend**: No requiere archivo `.env` (usa configuración por defecto)

**Backend**: Crear `waicalm-backend/.env`:

\`\`\`env
PORT=3000
NODE_ENV=development

# MongoDB Atlas
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/database

# JWT
JWT_SECRET=tu-secret-key-super-segura
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:8081
\`\`\`

### 5. Inicializar la base de datos (opcional)

\`\`\`bash
cd waicalm-backend
npm run init:db
\`\`\`

## 🎯 Uso

### Iniciar Backend

\`\`\`bash
cd waicalm-backend
npm run dev
\`\`\`

El backend estará disponible en: `http://localhost:3000`

### Iniciar Frontend

\`\`\`bash
# Desde la raíz del proyecto
npm start
\`\`\`

Luego:
- Presiona `w` para abrir en web
- Presiona `a` para Android
- Presiona `i` para iOS (Mac only)
- Escanea el QR con Expo Go

## 📁 Estructura del Proyecto

\`\`\`
waicalm/
├── app/                    # Expo Router (navegación)
│   ├── (auth)/            # Pantallas de autenticación
│   ├── (tabs)/            # Pantallas principales (tabs)
│   └── _layout.tsx        # Layout raíz
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── ui/            # Componentes UI base
│   │   └── navigation/    # Componentes de navegación
│   ├── screens/           # Pantallas completas
│   ├── context/           # React Context (Auth, Theme)
│   ├── services/          # Servicios API
│   ├── theme/             # Sistema de diseño
│   └── hooks/             # Custom hooks
├── waicalm-backend/       # Backend completo
│   ├── src/
│   │   ├── controllers/   # Controladores de rutas
│   │   ├── models/        # Modelos de MongoDB
│   │   ├── routes/        # Definición de rutas
│   │   ├── middleware/    # Middlewares (auth, error)
│   │   ├── services/      # Lógica de negocio
│   │   └── utils/         # Utilidades
│   └── package.json
└── assets/                 # Recursos (imágenes, etc.)
\`\`\`

## 📚 Documentación

- [Checklist de QA y Demo](QA_CHECKLIST_DEMO.md) - Guía completa para testing y demo
- [Implementación Completada](IMPLEMENTACION_COMPLETADA.md) - Resumen técnico del desarrollo
- [Documentación Backend](waicalm-backend/README.md)
- [Configuración MongoDB](waicalm-backend/CONFIGURACION_MONGODB.md)

## 🔐 Seguridad

- Las contraseñas se hashean con bcryptjs
- Autenticación JWT con tokens seguros
- Variables de entorno para credenciales
- CORS configurado correctamente
- Validación de datos en backend

## 🧪 Testing

\`\`\`bash
# Backend
cd waicalm-backend
npm test

# Frontend
npm test
\`\`\`

## 📱 Build para Producción

### Frontend (EAS Build)

\`\`\`bash
npm install -g eas-cli
eas build --platform android
eas build --platform ios
\`\`\`

### Backend

\`\`\`bash
cd waicalm-backend
npm run build
npm start
\`\`\`

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Autores

- **WaiCalm Team** - Desarrollo inicial

## 🙏 Agradecimientos

- Expo por la excelente plataforma de desarrollo
- MongoDB Atlas por el hosting de base de datos
- Comunidad de React Native

## 📞 Soporte

Si tienes problemas o preguntas:
1. Revisa la documentación en `/docs`
2. Abre un issue en GitHub
3. Contacta al equipo de desarrollo

## 🗺️ Roadmap

- [ ] Notificaciones push
- [ ] Integración con dispositivos wearables
- [ ] Modo offline
- [ ] Exportación de datos
- [ ] Más idiomas
- [ ] Integración con calendario

---

Hecho con ❤️ para mejorar el bienestar mental
