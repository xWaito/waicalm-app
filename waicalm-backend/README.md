
# WaiCalm Backend API

Backend completo para la aplicación WaiCalm con Express, MongoDB y JWT.

## 🚀 Instalación

```bash
npm install
```

## ⚙️ Configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
MONGODB_URI=mongodb://localhost:27017/waicalm
JWT_SECRET=tu_secret_key_super_segura_aqui
PORT=3000
NODE_ENV=development
```

## 🏃 Ejecutar

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm run build
npm start
```

## 📡 Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión  
- `GET /api/auth/profile` - Obtener perfil (requiere auth)

### Actividades
- `POST /api/activities` - Crear actividad (requiere auth)
- `GET /api/activities` - Listar actividades (requiere auth)
- `GET /api/activities/:id` - Obtener actividad (requiere auth)
- `DELETE /api/activities/:id` - Eliminar actividad (requiere auth)

### Estadísticas
- `GET /api/stats` - Obtener estadísticas (requiere auth)
- `GET /api/stats/cortisol?period=7d` - Datos de cortisol (requiere auth)

### Usuario
- `PUT /api/user/profile` - Actualizar perfil (requiere auth)
- `PUT /api/user/kit-code` - Actualizar código de kit (requiere auth)

## 🔐 Autenticación

Todas las rutas protegidas requieren un header de autorización:

```
Authorization: Bearer <token>
```

## 📊 Modelos

### User
- name, email, phone, password
- stressLevel, avatar
- onboardingCompleted, kitScanned, kitCode

### Activity
- userId, activityType (breathing|journal|gummies|rollon)
- duration, notes, mood
- completedAt





