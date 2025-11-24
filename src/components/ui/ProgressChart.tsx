import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';

interface DataPoint {
  date: string;
  value: number;
}

interface ProgressChartProps {
  data: DataPoint[];
  period?: '7D' | '1M' | '3M';
  type?: 'bar' | 'line';
  showTrend?: boolean;
}

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - 64;
const CHART_HEIGHT = 200;

export const ProgressChart: React.FC<ProgressChartProps> = ({
  data,
  period = '7D',
  type = 'bar',
  showTrend = true,
}) => {
  const { colors, spacing, borderRadius, typography } = useTheme();

  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const minValue = Math.min(...data.map((d) => d.value), 0);

  // Calcular tendencia
  const trend =
    data.length > 1
      ? ((data[data.length - 1].value - data[0].value) / data[0].value) * 100
      : 0;

  const barWidth = (CHART_WIDTH - spacing.md * (data.length - 1)) / data.length;

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
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            {
              color: colors.textPrimary,
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.bold,
            },
          ]}
        >
          Cortisol Trends
        </Text>
        <View style={styles.periodSelector}>
          {(['7D', '1M', '3M'] as const).map((p) => (
            <View
              key={p}
              style={[
                styles.periodButton,
                {
                  backgroundColor: p === period ? colors.accentPrimary : colors.bgAccent,
                  borderRadius: borderRadius.sm,
                  paddingHorizontal: spacing.sm,
                  paddingVertical: spacing.xs,
                },
              ]}
            >
              <Text
                style={[
                  styles.periodText,
                  {
                    color: p === period ? colors.white : colors.textSecondary,
                    fontSize: typography.fontSize.sm,
                  },
                ]}
              >
                {p}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.chart, { height: CHART_HEIGHT, marginTop: spacing.md }]}>
        {type === 'bar' &&
          data.map((point, index) => {
            const height = (point.value / maxValue) * CHART_HEIGHT;
            const animatedHeight = useSharedValue(0);

            React.useEffect(() => {
              animatedHeight.value = withTiming(height, { duration: 800 });
            }, [height]);

            const animatedStyle = useAnimatedStyle(() => ({
              height: animatedHeight.value,
            }));

            return (
              <View
                key={index}
                style={[
                  styles.barContainer,
                  {
                    width: barWidth,
                    marginRight: index < data.length - 1 ? spacing.xs : 0,
                  },
                ]}
              >
                <Animated.View
                  style={[
                    styles.bar,
                    {
                      backgroundColor: colors.accentPrimary,
                      borderRadius: borderRadius.sm,
                    },
                    animatedStyle,
                  ]}
                />
                <Text
                  style={[
                    styles.label,
                    {
                      color: colors.textSecondary,
                      fontSize: typography.fontSize.xs,
                      marginTop: spacing.xs,
                    },
                  ]}
                >
                  {point.date.substring(0, 1)}
                </Text>
              </View>
            );
          })}
      </View>

      {showTrend && (
        <View style={[styles.trend, { marginTop: spacing.md }]}>
          <Text
            style={[
              styles.trendText,
              {
                color: trend < 0 ? colors.stressLow : colors.stressHigh,
                fontSize: typography.fontSize.md,
                fontWeight: typography.fontWeight.semiBold,
              },
            ]}
          >
            {trend < 0 ? '↓' : '↑'} {Math.abs(trend).toFixed(0)}% reducción este mes
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {},
  periodSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  periodButton: {},
  periodText: {},
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  barContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
  },
  label: {
    textAlign: 'center',
  },
  trend: {
    alignItems: 'center',
  },
  trendText: {},
});

export default ProgressChart;

