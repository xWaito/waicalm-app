import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { ActivityCard } from '../../components/ui/ActivityCard';
import { StressWidget } from '../../components/ui/StressWidget';
import { Card } from '../../components/ui/Card';
import * as Haptics from 'expo-haptics';
import { useActivities } from '../../hooks/useActivities';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2 - 8;

export default function DashboardScreen() {
  const router = useRouter();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { user } = useAuth();
  const { activities: userActivities, createActivity, refreshActivities } = useActivities();
  const [refreshing, setRefreshing] = useState(false);
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());

  // Calcular día del journey
  const journeyDay = user?.createdAt
    ? Math.floor((new Date().getTime() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)) + 1
    : 15;

  // Calcular adherencia semanal (porcentaje de actividades completadas)
  const weeklyAdherence = 87; // Mock data - en producción calcular desde userActivities

  useEffect(() => {
    // Cargar actividades completadas hoy
    const today = new Date();
    const todayActivities = userActivities.filter(
      (a) => new Date(a.completedAt).toDateString() === today.toDateString()
    );
    const completedTypes = new Set(todayActivities.map((a) => a.activityType));
    setCompletedActivities(completedTypes);
  }, [userActivities]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshActivities();
    setRefreshing(false);
  };

  const handleActivityPress = async (type: 'breathing' | 'journal' | 'gummies' | 'rollon') => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      await createActivity({
        activityType: type,
        duration: type === 'breathing' ? 5 : type === 'journal' ? 3 : undefined,
      });
      setCompletedActivities((prev) => new Set(prev).add(type));
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  };

  const activitiesList = [
    {
      type: 'breathing' as const,
      title: 'Respiración',
      duration: '5 min',
      completed: completedActivities.has('breathing'),
    },
    {
      type: 'journal' as const,
      title: 'Journal',
      duration: '3 min',
      completed: completedActivities.has('journal'),
    },
    {
      type: 'gummies' as const,
      title: 'Gomitas',
      duration: 'Tomar hoy',
      completed: completedActivities.has('gummies'),
    },
    {
      type: 'rollon' as const,
      title: 'Roll-on',
      duration: 'Aplicar',
      completed: completedActivities.has('rollon'),
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bgPrimary }]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      >
        {/* Header */}
        <View style={[styles.header, { paddingHorizontal: spacing.md, paddingTop: spacing.md }]}>
          <View>
            <Text
              style={[
                styles.greeting,
                {
                  color: colors.textPrimary,
                  fontSize: typography.fontSize.xl,
                  fontWeight: typography.fontWeight.bold,
                },
              ]}
            >
              ¡Hola {user?.name?.split(' ')[0] || 'Usuario'}!
            </Text>
            <Text
              style={[
                styles.subtitle,
                {
                  color: colors.textSecondary,
                  fontSize: typography.fontSize.sm,
                },
              ]}
            >
              Día {journeyDay} de tu journey
            </Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.avatarButton}>
              <View
                style={[
                  styles.avatar,
                  {
                    backgroundColor: colors.accentPrimary,
                    borderRadius: borderRadius.full,
                  },
                ]}
              >
                <Ionicons name="person" size={20} color={colors.white} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stress Widget */}
        <View style={{ paddingHorizontal: spacing.md, marginTop: spacing.md }}>
          <StressWidget
            level={user?.stressLevel || 3.2}
            status={user?.stressLevel && user.stressLevel <= 3 ? 'low' : 'medium'}
            source="HRV matutino"
          />
        </View>

        {/* Actividades de Hoy */}
        <View style={{ paddingHorizontal: spacing.md, marginTop: spacing.lg }}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.textPrimary,
                fontSize: typography.fontSize.lg,
                fontWeight: typography.fontWeight.bold,
                marginBottom: spacing.md,
              },
            ]}
          >
            Actividades de Hoy
          </Text>
          <View style={styles.activitiesGrid}>
            {activitiesList.map((activity) => (
              <ActivityCard
                key={activity.type}
                type={activity.type}
                title={activity.title}
                duration={activity.duration}
                completed={activity.completed}
                onPress={() => handleActivityPress(activity.type)}
              />
            ))}
          </View>
        </View>

        {/* Progreso Semanal */}
        <View style={{ paddingHorizontal: spacing.md, marginTop: spacing.lg }}>
          <Card variant="elevated" padding="md" radius="lg">
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: colors.textPrimary,
                  fontSize: typography.fontSize.md,
                  fontWeight: typography.fontWeight.bold,
                  marginBottom: spacing.md,
                },
              ]}
            >
              Tu Progreso Semanal
            </Text>
            <View style={styles.progressRow}>
              <View style={styles.progressItem}>
                <Text
                  style={[
                    styles.progressValue,
                    {
                      color: colors.accentPrimary,
                      fontSize: typography.fontSize.xxl,
                      fontWeight: typography.fontWeight.bold,
                    },
                  ]}
                >
                  {weeklyAdherence}%
                </Text>
                <Text
                  style={[
                    styles.progressLabel,
                    {
                      color: colors.textSecondary,
                      fontSize: typography.fontSize.sm,
                    },
                  ]}
                >
                  Adherencia
                </Text>
              </View>
              <View style={styles.progressItem}>
                <Text
                  style={[
                    styles.progressValue,
                    {
                      color: colors.accentSecondary,
                      fontSize: typography.fontSize.xxl,
                      fontWeight: typography.fontWeight.bold,
                    },
                  ]}
                >
                  {journeyDay}
                </Text>
                <Text
                  style={[
                    styles.progressLabel,
                    {
                      color: colors.textSecondary,
                      fontSize: typography.fontSize.sm,
                    },
                  ]}
                >
                  Días
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.progressBar,
                {
                  backgroundColor: colors.bgAccent,
                  borderRadius: borderRadius.sm,
                  height: 8,
                  marginTop: spacing.md,
                },
              ]}
            >
              <View
                style={[
                  styles.progressBarFill,
                  {
                    backgroundColor: colors.accentPrimary,
                    borderRadius: borderRadius.sm,
                    width: `${weeklyAdherence}%`,
                    height: 8,
                  },
                ]}
              />
            </View>
          </Card>
        </View>

        {/* Próxima Sesión Grupal */}
        <View style={{ paddingHorizontal: spacing.md, marginTop: spacing.lg, marginBottom: 100 }}>
          <Card variant="elevated" padding="md" radius="lg">
            <View style={styles.liveBadge}>
              <View
                style={[
                  styles.liveDot,
                  {
                    backgroundColor: colors.stressHigh,
                    borderRadius: borderRadius.full,
                  },
                ]}
              />
              <Text
                style={[
                  styles.liveText,
                  {
                    color: colors.stressHigh,
                    fontSize: typography.fontSize.sm,
                    fontWeight: typography.fontWeight.bold,
                    marginLeft: spacing.xs,
                  },
                ]}
              >
                EN VIVO en 30 min
              </Text>
            </View>
            <Text
              style={[
                styles.liveTitle,
                {
                  color: colors.textPrimary,
                  fontSize: typography.fontSize.md,
                  fontWeight: typography.fontWeight.bold,
                  marginTop: spacing.sm,
                },
              ]}
            >
              Mindfulness con Dr. García
            </Text>
            <TouchableOpacity
              style={[
                styles.liveButton,
                {
                  backgroundColor: colors.accentPrimary,
                  borderRadius: borderRadius.md,
                  marginTop: spacing.md,
                },
              ]}
            >
              <Text
                style={[
                  styles.liveButtonText,
                  {
                    color: colors.white,
                    fontSize: typography.fontSize.md,
                    fontWeight: typography.fontWeight.semiBold,
                  },
                ]}
              >
                Unirse Ahora
              </Text>
            </TouchableOpacity>
          </Card>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  greeting: {},
  subtitle: {},
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarButton: {},
  avatar: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationButton: {},
  sectionTitle: {},
  activitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressItem: {
    alignItems: 'center',
  },
  progressValue: {},
  progressLabel: {},
  progressBar: {
    overflow: 'hidden',
  },
  progressBarFill: {},
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveDot: {
    width: 8,
    height: 8,
  },
  liveText: {},
  liveTitle: {},
  liveButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  liveButtonText: {},
});
