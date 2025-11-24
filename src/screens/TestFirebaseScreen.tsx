// src/screens/TestFirebaseScreen.tsx
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { kitService, userService } from '../services';

export default function TestFirebaseScreen() {
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      // 1. Crear usuario de prueba
      const userId = await (userService as any).createUser({
        email: "test@" + Date.now() + ".com",
        name: "Usuario Prueba",
        stressLevel: 5,
        avatarInitial: "T",
        kitCode: "WC-2024-TEST01"
      });
      
      Alert.alert('✅ Éxito', `Usuario creado: ${userId}`);
      
      // 2. Crear kit de prueba
      const kitId = await (kitService as any).createTestKit("WC-2024-TEST01");
      Alert.alert('✅ Éxito', `Kit creado: ${kitId}`);
      
    } catch (error: any) {
      Alert.alert('❌ Error', error.message || String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔧 Prueba de Firebase</Text>
      <Text style={styles.subtitle}>Verifica la conexión con Firebase</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={testConnection}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Probando..." : "Probar Conexión Firebase"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1E1E1E'
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#CCCCCC',
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#5BA4CF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
