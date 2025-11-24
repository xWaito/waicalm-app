import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const BREATHING_PHASES = [
  { name: 'Inhala', duration: 4, color: '#10B981', instruction: 'Respira profundo por la nariz' },
  { name: 'Sostén', duration: 7, color: '#3B82F6', instruction: 'Mantén el aire' },
  { name: 'Exhala', duration: 8, color: '#8B5CF6', instruction: 'Suelta lentamente por la boca' },
];

export default function BreathingScreen() {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [timeLeft, setTimeLeft] = useState(BREATHING_PHASES[0].duration);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isActive) {
      const phase = BREATHING_PHASES[currentPhase];
      
      // Animación de círculo según fase
      if (phase.name === 'Inhala') {
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: phase.duration * 1000,
          useNativeDriver: true,
        }).start();
      } else if (phase.name === 'Sostén') {
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: phase.duration * 1000,
          useNativeDriver: true,
        }).start();
      }

      // Timer countdown
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Cambiar de fase
            const nextPhase = (currentPhase + 1) % BREATHING_PHASES.length;
            setCurrentPhase(nextPhase);
            
            if (nextPhase === 0) {
              setCyclesCompleted(c => c + 1);
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            } else {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }
            
            return BREATHING_PHASES[nextPhase].duration;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isActive, currentPhase]);

  const handleStartStop = () => {
    if (isActive) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      setIsActive(false);
      setCurrentPhase(0);
      setTimeLeft(BREATHING_PHASES[0].duration);
      scaleAnim.setValue(1);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      setIsActive(true);
    }
  };

  const phase = BREATHING_PHASES[currentPhase];
  const progress = ((phase.duration - timeLeft) / phase.duration) * 100;

  return (
    <LinearGradient
      colors={['#1F2937', '#111827']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="close" size={28} color="#ffffff" />
          </Pressable>
          <Text style={styles.headerTitle}>Respiración 4-7-8</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{cyclesCompleted}</Text>
            <Text style={styles.statLabel}>Ciclos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5:00</Text>
            <Text style={styles.statLabel}>Meta</Text>
          </View>
        </View>

        {/* Círculo de respiración animado */}
        <View style={styles.breathingContainer}>
          <Animated.View
            style={[
              styles.breathingCircle,
              {
                transform: [{ scale: scaleAnim }],
                backgroundColor: phase.color,
              },
            ]}
          >
            <View style={styles.circleInner}>
              <Text style={styles.phaseText}>{phase.name}</Text>
              <Text style={styles.timerText}>{timeLeft}</Text>
            </View>
          </Animated.View>
        </View>

        {/* Instrucción */}
        <View style={styles.instructionContainer}>
          <Text style={styles.instruction}>{phase.instruction}</Text>
        </View>

        {/* Control Button */}
        <Pressable onPress={handleStartStop} style={styles.controlButton}>
          <LinearGradient
            colors={isActive ? ['#EF4444', '#DC2626'] : ['#10B981', '#059669']}
            style={styles.controlGradient}
          >
            <Ionicons
              name={isActive ? 'pause' : 'play'}
              size={32}
              color="#ffffff"
            />
            <Text style={styles.controlText}>
              {isActive ? 'Pausar' : 'Comenzar'}
            </Text>
          </LinearGradient>
        </Pressable>

        {/* Progress indicator */}
        {isActive && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: phase.color }]} />
            </View>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    paddingHorizontal: 40,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 20,
  },
  breathingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  breathingCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 12,
  },
  circleInner: {
    alignItems: 'center',
  },
  phaseText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  timerText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  instructionContainer: {
    paddingHorizontal: 40,
    marginBottom: 40,
  },
  instruction: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 26,
  },
  controlButton: {
    marginHorizontal: 40,
    marginBottom: 20,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  controlGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    gap: 12,
  },
  controlText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressContainer: {
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
});


