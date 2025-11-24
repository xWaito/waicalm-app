// src/services/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// ⚠️ REEMPLAZA ESTOS DATOS CON LOS DE TU PROYECTO FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  authDomain: "waicalm-tuproyecto.firebaseapp.com",
  projectId: "waicalm-tuproyecto",
  storageBucket: "waicalm-tuproyecto.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:aaaaaaaaaaaaaaaaaaaaaa"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
