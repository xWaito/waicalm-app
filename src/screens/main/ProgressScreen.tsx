import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { Card } from '../../components/ui/Card';
import { ProgressChart } from '../../components/ui/ProgressChart';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// Mock data para gráfico de cortisol
const cortisolData = [
  { date: 'L', value: 5.2 },
  { date: 'M', value: 4.8 },
  { date: 'X', value: 4.5 },
  { date: 'J', value: 4.2 },
  { date: 'V', value: 3.9 },
  { date: 'S', value: 3.5 },
  { date: 'D', value: 3.2 },
];

export default function ProgressScreen() {
  const router = useRouter();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState<'7D' | '1M' | '3M'>('7D');

  const metrics = [
    { label: 'Adherencia', value: '87%', color: colors.accentPrimary },
    { label: 'Días Racha', value: '15', color: colors.accentSecondary },
    { label: 'Rating', value: '4.2', color: colors.accentTertiary },
    { label: 'Uso Diario', value: '6h', color: colors.botanicalGreen },
  ];

  const activityDistribution = [
    { type: 'Respiración', percentage: 45, icon: '🫁', color: colors.accentPrimary },
    { type: 'Journal', percentage: 30, icon: '📖', color: colors.accentSecondary },
    { type: 'Gomitas', percentage: 15, icon: '💊', color: colors.accentTertiary },
    { type: 'Roll-on', percentage: 10, icon: '🌿', color: colors.botanicalGreen },
  ];

  const stressHistory = [
    { day: 'Hoy', level: 'Bajo', value: '3.2/10' },
    { day: 'Ayer', level: 'Medio', value: '5.8/10' },
    { day: 'Hace 2d', level: 'Alto', value: '7.1/10' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bgPrimary }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { paddingHorizontal: spacing.md, paddingTop: spacing.md }]}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text
            style={[
              styles.headerTitle,
              {
                color: colors.textPrimary,
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.bold,
              },
            ]}
          >
            Mi Progreso
          </Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Gráfico de Cortisol */}
        <View style={{ paddingHorizontal: spacing.md, marginTop: spacing.md }}>
          <ProgressChart data={cortisolData} period={selectedPeriod} showTrend />
        </View>

        {/* Métricas Clave */}
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
            Métricas Clave
          </Text>
          <View style={styles.metricsGrid}>
            {metrics.map((metric, index) => (
              <Card
                key={index}
                variant="elevated"
                padding="md"
                radius="lg"
                style={{ flex: 1, minWidth: (width - 48 - 16) / 2, margin: 4 }}
              >
                <Text
                  style={[
                    styles.metricValue,
                    {
                      color: metric.color,
                      fontSize: typography.fontSize.xxl,
                      fontWeight: typography.fontWeight.bold,
                    },
                  ]}
                >
                  {metric.value}
                </Text>
                <Text
                  style={[
                    styles.metricLabel,
                    {
                      color: colors.textSecondary,
                      fontSize: typography.fontSize.sm,
                      marginTop: spacing.xs,
                    },
                  ]}
                >
                  {metric.label}
                </Text>
              </Card>
            ))}
          </View>
        </View>

        {/* Actividades por Categoría */}
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
            Actividades por Categoría
          </Text>
          <Card variant="elevated" padding="md" radius="lg">
            {activityDistribution.map((activity, index) => (
              <View key={index} style={styles.activityRow}>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityIcon}>{activity.icon}</Text>
                  <Text
                    style={[
                      styles.activityType,
                      {
                        color: colors.textPrimary,
                        fontSize: typography.fontSize.md,
                        marginLeft: spacing.sm,
                      },
                    ]}
                  >
                    {activity.type}
                  </Text>
                </View>
                <View style={styles.activityBarContainer}>
                  <View
                    style={[
                      styles.activityBar,
                      {
                        backgroundColor: colors.bgAccent,
                        borderRadius: borderRadius.sm,
                        height: 8,
                        width: '100%',
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.activityBarFill,
                        {
                          backgroundColor: activity.color,
                          borderRadius: borderRadius.sm,
                          width: `${activity.percentage}%`,
                          height: 8,
                        },
                      ]}
                    />
                  </View>
                  <Text
                    style={[
                      styles.activityPercentage,
                      {
                        color: colors.textSecondary,
                        fontSize: typography.fontSize.sm,
                        marginLeft: spacing.sm,
                        minWidth: 40,
                      },
                    ]}
                  >
                    {activity.percentage}%
                  </Text>
                </View>
              </View>
            ))}
          </Card>
        </View>

        {/* Historial de Estrés */}
        <View style={{ paddingHorizontal: spacing.md, marginTop: spacing.lg, marginBottom: 100 }}>
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
            Historial de Estrés
          </Text>
          <Card variant="elevated" padding="md" radius="lg">
            {stressHistory.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.historyRow,
                  {
                    borderBottomWidth: index < stressHistory.length - 1 ? 1 : 0,
                    borderBottomColor: colors.bgAccent,
                    paddingBottom: index < stressHistory.length - 1 ? spacing.md : 0,
                    marginBottom: index < stressHistory.length - 1 ? spacing.md : 0,
                  },
                ]}
              >
                <View>
                  <Text
                    style={[
                      styles.historyDay,
                      {
                        color: colors.textPrimary,
                        fontSize: typography.fontSize.md,
                        fontWeight: typography.fontWeight.semiBold,
                      },
                    ]}
                  >
                    {item.day}:
                  </Text>
                  <Text
                    style={[
                      styles.historyLevel,
                      {
                        color:
                          item.level === 'Bajo'
                            ? colors.stressLow
                            : item.level === 'Medio'
                            ? colors.stressMedium
                            : colors.stressHigh,
                        fontSize: typography.fontSize.sm,
                        marginTop: spacing.xs,
                      },
                    ]}
                  >
                    {item.level}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.historyValue,
                    {
                      color: colors.textSecondary,
                      fontSize: typography.fontSize.md,
                      fontWeight: typography.fontWeight.semiBold,
                    },
                  ]}
                >
                  {item.value}
                </Text>
              </View>
            ))}
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
  headerTitle: {},
  sectionTitle: {},
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metricValue: {},
  metricLabel: {},
  activityRow: {
    marginBottom: 16,
  },
  activityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityIcon: {
    fontSize: 20,
  },
  activityType: {},
  activityBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityBar: {
    flex: 1,
    overflow: 'hidden',
  },
  activityBarFill: {},
  activityPercentage: {
    textAlign: 'right',
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyDay: {},
  historyLevel: {},
  historyValue: {},
});
