import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
  RefreshControl,
  Alert,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { USER_PROFILE, STRESS_HISTORY, DAILY_HABITS } from '../../src/constants/mockData';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [habitStates, setHabitStates] = useState<Record<string, boolean>>({});
  
  // Animaciones
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [habitAnims] = useState<Record<string, Animated.Value>>(() =>
    DAILY_HABITS.reduce((acc, habit) => ({
      ...acc,
      [habit.id]: new Animated.Value(1)
    }), {} as Record<string, Animated.Value>)
  );

  useEffect(() => {
    // Pulso del widget de estrés
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.03,
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

  const handleRefresh = async () => {
    setRefreshing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const openHabitDetail = (habit: typeof DAILY_HABITS[0]) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    
    if (habit.type === 'breathing') {
      router.push('/breathing');
    } else if (habit.type === 'gummies') {
      router.push('/gummy-tracker');
    } else if (habit.type === 'journal') {
      router.push('/(tabs)/journal' as any);
    } else {
      // Roll-on u otros
      Alert.alert(
        `${habit.icon} ${habit.title}`,
        'Aplica el roll-on en muñecas y sienes.\n\nIngredientes: Lavanda, Manzanilla, CBD.\n\nEfectos: Relajación inmediata.',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Marcar como usado', onPress: () => toggleHabit(habit.id) }
        ]
      );
    }
  };

  const toggleHabit = (habitId: string) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    // Animación
    const anim = habitAnims[habitId];
    Animated.sequence([
      Animated.timing(anim, {
        toValue: 0.92,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(anim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    const wasCompleted = habitStates[habitId];
    setHabitStates(prev => ({
      ...prev,
      [habitId]: !prev[habitId],
    }));

    if (!wasCompleted) {
      setTimeout(() => {
        Alert.alert('¡Excelente! 🎉', 'Hábito completado correctamente', [
          { text: 'Continuar', style: 'default' }
        ]);
      }, 300);
    }
  };

  const firstName = USER_PROFILE.name.split(' ')[0];
  const maxStressValue = Math.max(...STRESS_HISTORY.map(s => s.value));
  
  const stressColor = USER_PROFILE.stressScore < 50 ? '#10b981' : '#f59e0b';
  const stressGradient = USER_PROFILE.stressScore < 50 
    ? ['#10B981', '#34D399', '#6EE7B7'] as const
    : ['#F59E0B', '#FBBF24'] as const;

  const completedCount = Object.values(habitStates).filter(Boolean).length;
  const totalHabits = DAILY_HABITS.length;
  const completionPercentage = (completedCount / totalHabits) * 100;

  const stats = [
    { icon: 'flame', label: 'Racha', value: `${USER_PROFILE.streak}`, unit: 'días', color: '#F97316', trend: '+2' },
    { icon: 'checkmark-circle', label: 'Hábitos', value: `${completedCount}/${totalHabits}`, unit: 'hoy', color: '#10B981', trend: `${Math.round(completionPercentage)}%` },
    { icon: 'trending-down', label: 'Mejora', value: '35', unit: '%', color: '#6366F1', trend: '7 días' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#10B981" />
        }
      >
        {/* Header Premium */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={{ uri: USER_PROFILE.avatar }} style={styles.avatar} />
            <View style={styles.headerInfo}>
              <Text style={styles.greeting}>¡Hola, {firstName}!</Text>
              <Text style={styles.journeyDay}>Día 15 de tu journey</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.streakBadge}>
              <Text style={styles.fireEmoji}>🔥</Text>
              <Text style={styles.streakNumber}>{USER_PROFILE.streak}</Text>
            </View>
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push('/notifications');
              }}
              style={styles.notificationButton}
            >
              <Ionicons name="notifications-outline" size={26} color="#111827" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>2</Text>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Hero Stress Widget Premium */}
        <View style={styles.section}>
          <View style={styles.stressCard}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <LinearGradient
                colors={stressGradient}
                style={styles.stressCircle}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.stressInner}>
                  <Text style={styles.stressScore}>{USER_PROFILE.stressScore}</Text>
                  <Text style={styles.stressLabel}>de 100</Text>
                </View>
              </LinearGradient>
            </Animated.View>
            
            <View style={styles.stressInfo}>
              <View style={[styles.statusBadge, { backgroundColor: stressColor + '20' }]}>
                <View style={[styles.statusDot, { backgroundColor: stressColor }]} />
                <Text style={[styles.statusText, { color: stressColor }]}>
                  Nivel Estable
                </Text>
              </View>
              <Text style={styles.stressTime}>Última medición: Hoy, 8:30 AM</Text>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: stat.color + '20' }]}>
                <Ionicons name={stat.icon as any} size={24} color={stat.color} />
              </View>
              <Text style={styles.statValue}>
                {stat.value}
                <Text style={styles.statUnit}> {stat.unit}</Text>
              </Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statTrend}>{stat.trend}</Text>
            </View>
          ))}
        </View>

        {/* Insights IA Card */}
        <View style={styles.section}>
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              router.push('/insights');
            }}
            style={styles.insightsCardWrapper}
          >
            <LinearGradient
              colors={['#F59E0B', '#F97316']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.insightsCard}
            >
              <View style={styles.insightsLeft}>
                <Ionicons name="sparkles" size={28} color="#ffffff" />
                <View style={styles.insightsText}>
                  <Text style={styles.insightsTitle}>Insights de IA</Text>
                  <Text style={styles.insightsSubtitle}>4 patrones detectados</Text>
                </View>
              </View>
              <View style={styles.newBadge}>
                <Text style={styles.newBadgeText}>2 nuevos</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#ffffff" />
            </LinearGradient>
          </Pressable>
        </View>

        {/* Gráfico Premium */}
        <View style={styles.section}>
          <View style={styles.card}>
            <View style={styles.chartHeader}>
              <View>
                <Text style={styles.sectionTitle}>Progreso Semanal</Text>
                <Text style={styles.chartSubtitle}>Evolución de tu estrés</Text>
              </View>
              <View style={styles.improvementBadge}>
                <Ionicons name="trending-down" size={14} color="#059669" style={{ marginRight: 4 }} />
                <Text style={styles.improvementText}>-35%</Text>
              </View>
            </View>

            <View style={styles.chartContainer}>
              {STRESS_HISTORY.map((point, index) => {
                const heightPercentage = (point.value / maxStressValue) * 100;
                const isToday = index === STRESS_HISTORY.length - 1;
                return (
                  <View key={index} style={styles.barWrapper}>
                    <View style={styles.barContainer}>
                      <Text style={[styles.barValue, isToday && styles.barValueToday]}>
                        {point.value}
                      </Text>
                      <LinearGradient
                        colors={isToday ? ['#10B981', '#34D399'] : ['#818CF8', '#A5B4FC']}
                        style={[
                          styles.bar,
                          { height: `${heightPercentage}%` },
                        ]}
                      />
                    </View>
                    <Text style={[styles.barLabel, isToday && styles.barLabelToday]}>
                      {point.day}
                    </Text>
                  </View>
                );
              })}
            </View>

            <View style={styles.chartFooter}>
              <View style={styles.chartLegend}>
                <Text style={styles.legendIcon}>📉</Text>
                <Text style={styles.legendText}>Reducción de 23 puntos</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Hábitos Premium */}
        <View style={styles.section}>
          <View style={styles.habitsHeader}>
            <Text style={styles.sectionTitle}>Hábitos de Hoy</Text>
            <Text style={styles.habitsProgress}>
              {completedCount}/{totalHabits} completados
            </Text>
          </View>

          {DAILY_HABITS.map((habit) => {
            const isCompleted = habitStates[habit.id] || habit.completed;
            return (
              <Animated.View
                key={habit.id}
                style={{ transform: [{ scale: habitAnims[habit.id] }] }}
              >
                <Pressable
                  onPress={() => openHabitDetail(habit)}
                  onLongPress={() => toggleHabit(habit.id)}
                  style={[
                    styles.habitCard,
                    isCompleted && styles.habitCardCompleted,
                  ]}
                >
                  <View style={styles.habitLeft}>
                    <View
                      style={[
                        styles.checkbox,
                        isCompleted && styles.checkboxCompleted,
                      ]}
                    >
                      {isCompleted && (
                        <Ionicons name="checkmark" size={18} color="#ffffff" />
                      )}
                    </View>
                    <View style={styles.habitIconContainer}>
                      <Text style={styles.habitEmoji}>{habit.icon}</Text>
                    </View>
                    <View style={styles.habitInfo}>
                      <Text style={[styles.habitTitle, isCompleted && styles.habitTitleCompleted]}>
                        {habit.title}
                      </Text>
                      <Text style={styles.habitTime}>{habit.time}</Text>
                    </View>
                  </View>
                  {isCompleted && (
                    <View style={styles.checkBadge}>
                      <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                    </View>
                  )}
                </Pressable>
                {isCompleted && (
                  <View style={styles.habitProgress}>
                    <View style={[styles.progressFill]} />
                  </View>
                )}
              </Animated.View>
            );
          })}
        </View>

        {/* Sesión Grupal Premium */}
        <View style={[styles.section, styles.lastSection]}>
          <Pressable
            onPress={() => Alert.alert('Próximamente', 'Esta función estará disponible pronto')}
            style={styles.liveCardWrapper}
          >
            <LinearGradient
              colors={['#4F46E5', '#7C3AED', '#A855F7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.liveCard}
            >
              <View style={styles.liveBadgeContainer}>
                <Animated.View style={[styles.livePulse, { transform: [{ scale: pulseAnim }] }]} />
                <Text style={styles.liveText}>EN VIVO en 30 min</Text>
              </View>
              <Text style={styles.liveTitle}>Mindfulness con Dr. García</Text>
              <Text style={styles.liveSubtitle}>Sesión grupal de respiración consciente</Text>
              <View style={styles.liveFooter}>
                <View style={styles.participantsContainer}>
                  <Ionicons name="people" size={16} color="rgba(255, 255, 255, 0.9)" />
                  <Text style={styles.participantsText}>235 personas</Text>
                </View>
                <Ionicons name="arrow-forward-circle" size={28} color="#ffffff" />
              </View>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>

      {/* Botón flotante QR Scanner */}
      <Pressable
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          router.push('/qr-scan');
        }}
        style={styles.floatingButton}
      >
        <LinearGradient
          colors={['#10B981', '#14B8A6']}
          style={styles.floatingGradient}
        >
          <Ionicons name="qr-code" size={28} color="#ffffff" />
        </LinearGradient>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
    borderWidth: 3,
    borderColor: '#10B981',
  },
  headerInfo: {},
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },
  journeyDay: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  headerRight: {},
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FDBA74',
  },
  fireEmoji: {
    fontSize: 18,
  },
  streakNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EA580C',
    marginLeft: 4,
  },
  notificationButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  notificationBadgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  lastSection: {
    marginBottom: 100,
  },
  stressCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  stressCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  stressInner: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stressScore: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#10B981',
  },
  stressLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
    fontWeight: '500',
  },
  stressInfo: {
    alignItems: 'center',
    marginTop: 24,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  stressTime: {
    fontSize: 13,
    color: '#9ca3af',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },
  statUnit: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  statLabel: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 2,
    fontWeight: '500',
  },
  statTrend: {
    fontSize: 10,
    color: '#10B981',
    marginTop: 4,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  chartSubtitle: {
    fontSize: 13,
    color: '#9ca3af',
    marginTop: 2,
  },
  improvementBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  improvementText: {
    color: '#059669',
    fontSize: 13,
    fontWeight: 'bold',
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 160,
    paddingHorizontal: 4,
    paddingVertical: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
  },
  barWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  barContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  barValue: {
    fontSize: 11,
    color: '#6b7280',
    fontWeight: '600',
    marginBottom: 6,
  },
  barValueToday: {
    color: '#10B981',
    fontSize: 13,
    fontWeight: 'bold',
  },
  bar: {
    width: '75%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  barLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 10,
    fontWeight: '500',
  },
  barLabelToday: {
    color: '#10B981',
    fontWeight: 'bold',
    fontSize: 13,
  },
  chartFooter: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  chartLegend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  habitsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  habitsProgress: {
    fontSize: 13,
    color: '#10B981',
    fontWeight: '600',
  },
  habitCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  habitCardCompleted: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  habitLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2.5,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    backgroundColor: '#ffffff',
  },
  checkboxCompleted: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  habitIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  habitEmoji: {
    fontSize: 26,
  },
  habitInfo: {
    flex: 1,
  },
  habitTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111827',
  },
  habitTitleCompleted: {
    color: '#059669',
  },
  habitTime: {
    fontSize: 13,
    color: '#9ca3af',
    marginTop: 2,
  },
  checkBadge: {},
  habitProgress: {
    height: 4,
    backgroundColor: '#D1FAE5',
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '100%',
    backgroundColor: '#10B981',
  },
  liveCardWrapper: {
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  liveCard: {
    borderRadius: 20,
    padding: 24,
  },
  liveBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  livePulse: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EF4444',
    marginRight: 8,
  },
  liveText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  liveTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  liveSubtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.85)',
    marginBottom: 16,
  },
  liveFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantsText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    marginLeft: 6,
    fontWeight: '500',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  floatingGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightsCardWrapper: {
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  insightsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 16,
  },
  insightsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  insightsText: {
    marginLeft: 14,
  },
  insightsTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  insightsSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 2,
  },
  newBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 8,
  },
  newBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
