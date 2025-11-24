import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Animación de pulso continua
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
  }, []);

  const handleStart = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/(auth)/login');
  };

  const handleExplore = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/(tabs)');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bgPrimary }]}>
      <StatusBar barStyle={colors.isDark ? 'light-content' : 'dark-content'} />

      {/* Logo animado */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.logoWrapper,
            {
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={[colors.accentPrimary, colors.accentSecondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
              styles.logoGradient,
              {
                borderRadius: borderRadius.full,
              },
            ]}
          >
            <Text style={[styles.logoText, { color: colors.white }]}>WC</Text>
          </LinearGradient>
        </Animated.View>
      </Animated.View>

      {/* Contenido principal */}
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text
          style={[
            styles.title,
            {
              color: colors.textPrimary,
              fontSize: typography.fontSize.xxxl,
              fontWeight: typography.fontWeight.bold,
            },
          ]}
        >
          ¡Bienvenido a{'\n'}WAI CALM!
        </Text>
        <Text
          style={[
            styles.subtitle,
            {
              color: colors.textSecondary,
              fontSize: typography.fontSize.md,
            },
          ]}
        >
          Tu compañero científico para reducir el estrés y mejorar tu bienestar mental
        </Text>
      </Animated.View>

      {/* Botones */}
      <Animated.View style={[styles.buttonContainer, { opacity: fadeAnim }]}>
        <TouchableOpacity
          onPress={handleStart}
          activeOpacity={0.8}
          style={styles.buttonWrapper}
        >
          <LinearGradient
            colors={[colors.accentTertiary, '#FF7A50']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.primaryButton,
              {
                borderRadius: borderRadius.xl,
              },
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color: colors.white,
                  fontSize: typography.fontSize.lg,
                  fontWeight: typography.fontWeight.bold,
                },
              ]}
            >
              Comenzar Journey
            </Text>
            <Ionicons name="arrow-forward" size={20} color={colors.white} style={{ marginLeft: 8 }} />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleExplore}
          style={[
            styles.secondaryButton,
            {
              paddingVertical: spacing.md,
            },
          ]}
        >
          <Text
            style={[
              styles.secondaryButtonText,
              {
                color: colors.accentPrimary,
                fontSize: typography.fontSize.md,
                fontWeight: typography.fontWeight.semiBold,
              },
            ]}
          >
            Explorar sin Kit
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoGradient: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#5BA4CF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  logoText: {
    fontSize: 48,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 44,
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    paddingHorizontal: 32,
    paddingBottom: 48,
  },
  buttonWrapper: {
    marginBottom: 16,
    shadowColor: '#FF8C61',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButton: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {},
  secondaryButton: {
    alignItems: 'center',
  },
  secondaryButtonText: {},
});
