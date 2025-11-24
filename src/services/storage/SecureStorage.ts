import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Servicio de almacenamiento seguro
 * Wrapper sobre AsyncStorage con métodos útiles
 */
class SecureStorage {
  /**
   * Guardar un valor
   */
  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error guardando ${key}:`, error);
      throw error;
    }
  }

  /**
   * Obtener un valor
   */
  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(`Error obteniendo ${key}:`, error);
      return null;
    }
  }

  /**
   * Eliminar un valor
   */
  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error eliminando ${key}:`, error);
      throw error;
    }
  }

  /**
   * Guardar un objeto (JSON)
   */
  async setObject(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await this.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error guardando objeto ${key}:`, error);
      throw error;
    }
  }

  /**
   * Obtener un objeto (JSON)
   */
  async getObject<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await this.getItem(key);
      return jsonValue ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`Error obteniendo objeto ${key}:`, error);
      return null;
    }
  }

  /**
   * Eliminar múltiples items
   */
  async multiRemove(keys: string[]): Promise<void> {
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error('Error eliminando múltiples items:', error);
      throw error;
    }
  }

  /**
   * Limpiar todo el almacenamiento
   */
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error limpiando almacenamiento:', error);
      throw error;
    }
  }
}

export default new SecureStorage();

