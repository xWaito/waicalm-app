import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

const features = [
  { icon: 'pulse', text: 'Monitoreo de estrés en tiempo real', color: '#10B981' },
  { icon: 'fitness', text: 'Programa personalizado de bienestar', color: '#6366F1' },
  { icon: 'trophy', text: 'Resultados basados en ciencia', color: '#F59E0B' },
];

export default function Welcome() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulso continuo del logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleScanKit = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    router.push('/qr-scan');
  };

  const handleExplore = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Hero Section con Gradiente */}
      <LinearGradient
        colors={['#10B981', '#14B8A6', '#06B6D4']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.hero}
      >
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>🧘‍♀️</Text>
          </View>
          <Text style={styles.logoText}>WAI CALM</Text>
          <Text style={styles.tagline}>Tu ecosistema bio-inteligente</Text>
        </Animated.View>
      </LinearGradient>

      {/* Content Section */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.title}>Comienza tu Journey</Text>
        <Text style={styles.subtitle}>
          Reduce el estrés con tecnología y ciencia
        </Text>

        {/* Features */}
        <View style={styles.features}>
          {features.map((feature, index) => (
            <Animated.View
              key={index}
              style={[
                styles.feature,
                {
                  opacity: fadeAnim,
                  transform: [
                    {
                      translateY: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <View style={[styles.featureIconContainer, { backgroundColor: feature.color + '20' }]}>
                <Ionicons name={feature.icon as any} size={24} color={feature.color} />
              </View>
              <Text style={styles.featureText}>{feature.text}</Text>
            </Animated.View>
          ))}
        </View>

        {/* CTA Buttons */}
        <View style={styles.buttonsContainer}>
          <Pressable onPress={handleScanKit} style={styles.primaryButtonWrapper}>
            <LinearGradient
              colors={['#4F46E5', '#7C3AED']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.primaryButton}
            >
              <Ionicons name="camera" size={22} color="#ffffff" style={{ marginRight: 8 }} />
              <Text style={styles.primaryButtonText}>Escanear Mi Kit</Text>
              <Ionicons name="arrow-forward" size={20} color="#ffffff" style={{ marginLeft: 4 }} />
            </LinearGradient>
          </Pressable>

          <Pressable onPress={handleExplore} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Explorar sin Kit</Text>
          </Pressable>

          <Text style={styles.footnote}>
            Sin tarjeta de crédito • Gratis por 7 días
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  hero: {
    height: height * 0.50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  logoEmoji: {
    fontSize: 70,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 1,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '400',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 32,
    lineHeight: 24,
  },
  features: {
    marginBottom: 40,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
    fontWeight: '500',
  },
  buttonsContainer: {
    marginTop: 'auto',
    paddingBottom: 40,
  },
  primaryButtonWrapper: {
    marginBottom: 16,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#4F46E5',
    fontSize: 16,
    fontWeight: '600',
  },
  footnote: {
    textAlign: 'center',
    fontSize: 13,
    color: '#9ca3af',
    marginTop: 16,
  },
});
