// src/services/kitService.ts
import {
    addDoc,
    collection,
    doc,
    getDocs,
    query,
    Timestamp,
    updateDoc,
    where
} from 'firebase/firestore';
import { db } from './firebaseConfig';

const kitsCollection = collection(db, 'kits');

export const kitService = {
  // Validar código QR del kit
  async validateKitCode(kitCode: string, userId: string) {
    try {
      const q = query(kitsCollection, where("code", "==", kitCode));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        throw new Error("Código de kit no válido");
      }

      const kitDoc = querySnapshot.docs[0];
      const kitData = kitDoc.data();

      if (kitData.isUsed) {
        throw new Error("Este kit ya ha sido activado");
      }

      // Activar el kit
      await updateDoc(doc(db, 'kits', kitDoc.id), {
        isUsed: true,
        usedBy: userId,
        usedAt: Timestamp.now()
      });

      return { 
        success: true, 
        kitId: kitDoc.id,
        kitData: { ...kitData, id: kitDoc.id }
      };
    } catch (error) {
      console.error("Error validando kit:", error);
      throw error;
    }
  },

  // Crear kit de prueba
  async createTestKit(kitCode: string) {
    try {
      const docRef = await addDoc(kitsCollection, {
        code: kitCode,
        isActive: true,
        isUsed: false,
        createdAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creando kit: ", error);
      throw error;
    }
  }
};
