// src/scripts/initDatabase.ts
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Activity, User } from '../models';

// Cargar variables de entorno desde .env en la raíz del backend
dotenv.config();

async function initializeDatabase() {
  try {
    console.log('🚀 Iniciando creación de base de datos...');

    const { MONGODB_URI } = process.env;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI no encontrada en .env');
    }

    // Conectar a MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB Atlas');

    // 🧹 LIMPIAR BASE DE DATOS EXISTENTE (SOLO DESARROLLO)
    console.log('🧹 Limpiando datos existentes...');
    await User.deleteMany({});
    await Activity.deleteMany({});

    // 👤 CREAR USUARIOS DE EJEMPLO
    console.log('👤 Creando usuarios...');

    const user1 = await User.create({
      name: 'María González',
      email: 'maria@ejemplo.com',
      phone: '+1234567890',
      password: 'password123',
      stressLevel: 3,
      onboardingCompleted: true,
      kitScanned: true,
      kitCode: 'WC-2024-12345',
    });

    const user2 = await User.create({
      name: 'Carlos López',
      email: 'carlos@ejemplo.com',
      phone: '+0987654321',
      password: 'password123',
      stressLevel: 7,
      onboardingCompleted: false,
      kitScanned: false,
    });

    console.log(`✅ Usuarios creados: ${user1.email}, ${user2.email}`);

    // 📝 CREAR ACTIVIDADES DE EJEMPLO
    console.log('📝 Creando actividades...');

    const now = Date.now();
    const activities = [
      // Actividades para María
      {
        userId: user1._id,
        activityType: 'breathing',
        duration: 5,
        mood: 4,
        notes: 'Me siento muy relajada después de la sesión',
        completedAt: new Date(),
      },
      {
        userId: user1._id,
        activityType: 'journal',
        duration: 3,
        mood: 3,
        notes: 'Escribir me ayudó a clarificar mis pensamientos',
        completedAt: new Date(now - 24 * 60 * 60 * 1000),
      },
      {
        userId: user1._id,
        activityType: 'gummies',
        mood: 5,
        completedAt: new Date(now - 2 * 24 * 60 * 60 * 1000),
      },
      // Actividades para Carlos
      {
        userId: user2._id,
        activityType: 'rollon',
        mood: 4,
        completedAt: new Date(),
      },
      {
        userId: user2._id,
        activityType: 'breathing',
        duration: 10,
        mood: 2,
        notes: 'Necesito más práctica con la respiración',
        completedAt: new Date(now - 24 * 60 * 60 * 1000),
      },
    ];

    await Activity.insertMany(activities);
    console.log(`✅ ${activities.length} actividades creadas`);

    // 📊 VERIFICAR LA ESTRUCTURA
    console.log('\n📊 VERIFICACIÓN DE ESTRUCTURA:');
    console.log('==============================');

    const userCount = await User.countDocuments();
    const activityCount = await Activity.countDocuments();

    console.log(`📁 Base de datos: ${mongoose.connection.db?.databaseName || 'N/A'}`);
    console.log(`👥 Total usuarios: ${userCount}`);
    console.log(`📝 Total actividades: ${activityCount}`);

    // Mostrar colecciones existentes
    if (!mongoose.connection.db) {
      throw new Error('Conexión a la base de datos no disponible');
    }
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\n📚 Colecciones creadas:');
    collections.forEach((collection) => {
      console.log(`   - ${collection.name}`);
    });

    // Mostrar índices
    console.log('\n🔍 Índices creados:');
    const userIndexes = await User.collection.getIndexes();
    const activityIndexes = await Activity.collection.getIndexes();

    console.log('   Users:', Object.keys(userIndexes));
    console.log('   Activities:', Object.keys(activityIndexes));

    console.log('\n🎉 ¡BASE DE DATOS INICIALIZADA EXITOSAMENTE!');
    console.log('✨ Estructura completa:');
    console.log('   ✅ Colección "users" con esquema y índices');
    console.log('   ✅ Colección "activities" con esquema y índices');
    console.log('   ✅ Datos de ejemplo insertados');
    console.log('   ✅ Relaciones establecidas');
  } catch (error) {
    console.error('💥 Error inicializando la base de datos:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n👋 Desconectado de MongoDB');
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  initializeDatabase().catch((error) => {
    console.error('Error fatal:', error);
    process.exit(1);
  });
}

export default initializeDatabase;
