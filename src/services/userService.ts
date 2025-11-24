// src/services/userService.ts
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    Timestamp,
    updateDoc,
    where
} from 'firebase/firestore';
import { db } from './firebaseConfig';

const usersCollection = collection(db, 'users');

export const userService = {
  // Crear nuevo usuario
  async createUser(userData: any) {
    try {
      const docRef = await addDoc(usersCollection, {
        ...userData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creando usuario: ", error);
      throw error;
    }
  },

  // Obtener usuario por email
  async getUserByEmail(email: string) {
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    }
    return null;
  },

  // Obtener usuario por ID
  async getUserById(userId: string) {
    const userDoc = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists()) {
      return { id: userSnapshot.id, ...userSnapshot.data() };
    }
    return null;
  },

  // Actualizar usuario
  async updateUser(userId: string, updates: any) {
    const userDoc = doc(db, 'users', userId);
    await updateDoc(userDoc, {
      ...updates,
      updatedAt: Timestamp.now()
    });
  }
};
