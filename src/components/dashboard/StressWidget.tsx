import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing, borderRadius } from '../../theme';
import Card from '../ui/Card';

interface StressWidgetProps {
  level: number;
}

export default function StressWidget({ level }: StressWidgetProps) {
  const getStressInfo = () => {
    if (level <= 4) {
      return {
        label: 'Bajo',
        color: colors.stressLow,
        gradient: [colors.stressLow, '#A8E6CF'],
      };
    }
    if (level <= 7) {
      return {
        label: 'Medio',
        color: colors.stressMedium,
        gradient: [colors.stressMedium, '#FFC87A'],
      };
    }
    return {
      label: 'Alto',
      color: colors.stressHigh,
      gradient: [colors.stressHigh, '#FF6B9D'],
    };
  };

  const stressInfo = getStressInfo();

  return (
    <Card style={styles.card}>
      <Text style={styles.title}>Nivel de Estrés</Text>
      <View style={styles.content}>
        <LinearGradient
          colors={stressInfo.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.levelContainer}
        >
          <Text style={styles.levelValue}>{level.toFixed(1)}</Text>
          <Text style={styles.levelLabel}>{stressInfo.label}</Text>
        </LinearGradient>
        <View style={styles.scale}>
          <View style={styles.scaleBar}>
            <View
              style={[
                styles.scaleFill,
                { width: `${(level / 10) * 100}%`, backgroundColor: stressInfo.color },
              ]}
            />
          </View>
          <View style={styles.scaleLabels}>
            <Text style={styles.scaleLabel}>1</Text>
            <Text style={styles.scaleLabel}>10</Text>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h3,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelContainer: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  levelValue: {
    ...typography.h1,
    fontWeight: typography.weights.bold,
    color: colors.white,
    fontSize: 32,
  },
  levelLabel: {
    ...typography.caption,
    color: colors.white,
    fontWeight: typography.weights.semibold,
  },
  scale: {
    flex: 1,
  },
  scaleBar: {
    height: 8,
    backgroundColor: colors.bgCream,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  scaleFill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
  scaleLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scaleLabel: {
    ...typography.small,
    color: colors.textSecondary,
  },
});





