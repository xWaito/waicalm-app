import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { colors, typography, spacing } from '../../theme';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { isValidEmail, isValidPhone, isValidPassword } from '../../utils/validation.util';

export default function AuthScreen() {
  const navigation = useNavigation();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!isLogin && !formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!isLogin && !isValidPhone(formData.phone)) {
      newErrors.phone = 'Teléfono inválido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isLogin) {
        await login({
          email: formData.email,
          password: formData.password,
        });
        // @ts-ignore
        navigation.navigate('Dashboard');
      } else {
        await register({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        });
        // @ts-ignore
        navigation.navigate('QRScan');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Ocurrió un error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.title}>
              {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </Text>
            <Text style={styles.subtitle}>
              {isLogin
                ? 'Bienvenido de vuelta'
                : 'Comienza tu journey hacia el bienestar'}
            </Text>
          </View>

          <View style={styles.form}>
            {!isLogin && (
              <Input
                label="Nombre"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                error={errors.name}
                autoCapitalize="words"
              />
            )}

            <Input
              label="Email"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {!isLogin && (
              <Input
                label="Teléfono"
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                error={errors.phone}
                keyboardType="phone-pad"
              />
            )}

            <Input
              label="Contraseña"
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              error={errors.password}
              secureTextEntry
            />

            <Button
              title={isLogin ? 'Iniciar Sesión' : 'Registrarse'}
              onPress={handleSubmit}
              loading={loading}
              style={styles.submitButton}
            />

            <Button
              title={isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
              onPress={() => setIsLogin(!isLogin)}
              variant="secondary"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgWhite,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.xl,
  },
  header: {
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  title: {
    ...typography.h1,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  form: {
    flex: 1,
  },
  submitButton: {
    marginTop: spacing.md,
  },
});





