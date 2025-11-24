import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Login() {
  const [email, setEmail] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    router.replace('/(tabs)');
  };

  return (
    <LinearGradient
      colors={['#4f46e5', '#7c3aed']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {/* Logo y Hero */}
          <View style={styles.hero}>
            <Text style={styles.logo}>🧘‍♀️</Text>
            <Text style={styles.title}>WAI CALM</Text>
            <Text style={styles.subtitle}>
              Tu ecosistema de bienestar bio-inteligente
            </Text>
          </View>

          {/* Formulario */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#9ca3af"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#9ca3af"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Checkbox de términos */}
            <Pressable
              onPress={() => setTermsAccepted(!termsAccepted)}
              style={styles.checkboxContainer}
            >
              <View
                style={[
                  styles.checkbox,
                  termsAccepted && styles.checkboxChecked,
                ]}
              >
                {termsAccepted && (
                  <Ionicons name="checkmark" size={16} color="#ffffff" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>
                Acepto términos y condiciones
              </Text>
            </Pressable>

            {/* Botón de login */}
            <Pressable
              onPress={handleLogin}
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonText}>Entrar</Text>
            </Pressable>

            {/* Info adicional */}
            <Text style={styles.infoText}>
              Al entrar, aceptas nuestros términos de servicio y política de privacidad
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    fontSize: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 2,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e7ff',
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#111827',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
  },
  checkboxLabel: {
    color: '#ffffff',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#4f46e5',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoText: {
    color: '#e0e7ff',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});
