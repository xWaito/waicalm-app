import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';

interface StressWidgetProps {
  level: number; // 0-10
  status?: 'low' | 'medium' | 'high';
  source?: string;
  showDetails?: boolean;
}

export const StressWidget: React.FC<StressWidgetProps> = ({
  level,
  status,
  source = 'HRV matutino',
  showDetails = true,
}) => {
  const { colors, spacing, borderRadius, typography } = useTheme();

  const getStatusConfig = () => {
    if (level <= 3) {
      return {
        status: 'low',
        label: 'BAJO ✨',
        color: colors.stressLow,
        gradient: [colors.stressLow, colors.accentSecondary],
      };
    } else if (level <= 6) {
      return {
        status: 'medium',
        label: 'MEDIO',
        color: colors.stressMedium,
        gradient: [colors.stressMedium, colors.accentTertiary],
      };
    } else {
      return {
        status: 'high',
        label: 'ALTO',
        color: colors.stressHigh,
        gradient: [colors.stressHigh, colors.accentTertiary],
      };
    }
  };

  const config = status
    ? {
        status,
        label: status === 'low' ? 'BAJO ✨' : status === 'medium' ? 'MEDIO' : 'ALTO',
        color:
          status === 'low'
            ? colors.stressLow
            : status === 'medium'
            ? colors.stressMedium
            : colors.stressHigh,
        gradient:
          status === 'low'
            ? [colors.stressLow, colors.accentSecondary]
            : status === 'medium'
            ? [colors.stressMedium, colors.accentTertiary]
            : [colors.stressHigh, colors.accentTertiary],
      }
    : getStatusConfig();

  const progress = Math.min(level / 10, 1);
  const progressWidth = useSharedValue(0);

  React.useEffect(() => {
    progressWidth.value = withTiming(progress * 100, { duration: 800 });
  }, [progress, progressWidth]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.bgCard,
          borderRadius: borderRadius.lg,
          padding: spacing.md,
        },
      ]}
    >
      <LinearGradient
        colors={config.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.gradient,
          {
            borderRadius: borderRadius.md,
            padding: spacing.lg,
          },
        ]}
      >
        <Text
          style={[
            styles.statusLabel,
            {
              color: colors.white,
              fontSize: typography.fontSize.xl,
              fontWeight: typography.fontWeight.bold,
            },
          ]}
        >
          {config.label}
        </Text>

        <View
          style={[
            styles.progressContainer,
            {
              backgroundColor: 'rgba(255,255,255,0.3)',
              borderRadius: borderRadius.sm,
              height: 8,
              marginTop: spacing.md,
              marginBottom: spacing.sm,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.progressBar,
              {
                backgroundColor: colors.white,
                borderRadius: borderRadius.sm,
                height: 8,
              },
              animatedStyle,
            ]}
          />
        </View>

        <View style={styles.footer}>
          <Text
            style={[
              styles.levelText,
              {
                color: colors.white,
                fontSize: typography.fontSize.md,
                fontWeight: typography.fontWeight.semiBold,
              },
            ]}
          >
            {level.toFixed(1)}/10
          </Text>
          {showDetails && (
            <Text
              style={[
                styles.sourceText,
                {
                  color: colors.white,
                  fontSize: typography.fontSize.xs,
                  opacity: 0.9,
                },
              ]}
            >
              Basado en {source}
            </Text>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  gradient: {
    width: '100%',
  },
  statusLabel: {
    textAlign: 'center',
    marginBottom: 8,
  },
  progressContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  levelText: {},
  sourceText: {},
});

export default StressWidget;

