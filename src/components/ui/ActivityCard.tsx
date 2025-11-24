import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../context/ThemeContext';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withSequence } from 'react-native-reanimated';

interface ActivityCardProps {
  type: 'breathing' | 'journal' | 'gummies' | 'rollon';
  title: string;
  duration: string;
  completed?: boolean;
  onPress: () => void;
}

const activityConfig = {
  breathing: {
    icon: 'lungs' as const,
    gradient: ['#5BA4CF', '#7ECDA3'],
    emoji: '🫁',
  },
  journal: {
    icon: 'book' as const,
    gradient: ['#7ECDA3', '#8FBC8F'],
    emoji: '📖',
  },
  gummies: {
    icon: 'cube' as const,
    gradient: ['#FF8C61', '#F5A962'],
    emoji: '💊',
  },
  rollon: {
    icon: 'leaf' as const,
    gradient: ['#8FBC8F', '#7ECDA3'],
    emoji: '🌿',
  },
};

export const ActivityCard: React.FC<ActivityCardProps> = ({
  type,
  title,
  duration,
  completed = false,
  onPress,
}) => {
  const { colors, spacing, borderRadius, typography } = useTheme();
  const config = activityConfig[type];
  const scale = useSharedValue(1);
  const checkmarkScale = useSharedValue(completed ? 1 : 0);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    scale.value = withSequence(
      withSpring(0.95, { damping: 10 }),
      withSpring(1, { damping: 10 })
    );
    if (!completed) {
      checkmarkScale.value = withSpring(1, { damping: 8 });
    }
    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const checkmarkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkmarkScale.value }],
  }));

  React.useEffect(() => {
    if (completed) {
      checkmarkScale.value = withSpring(1);
    } else {
      checkmarkScale.value = withSpring(0);
    }
  }, [completed]);

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.9}
        style={styles.container}
      >
        <LinearGradient
          colors={config.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.gradient,
            {
              borderRadius: borderRadius.lg,
              padding: spacing.md,
              minHeight: 120,
            },
          ]}
        >
          <View style={styles.content}>
            <Text style={styles.emoji}>{config.emoji}</Text>
            <Text
              style={[
                styles.title,
                {
                  color: colors.white,
                  fontSize: typography.fontSize.md,
                  fontWeight: typography.fontWeight.semiBold,
                },
              ]}
            >
              {title}
            </Text>
            <Text
              style={[
                styles.duration,
                {
                  color: colors.white,
                  fontSize: typography.fontSize.sm,
                  opacity: 0.9,
                },
              ]}
            >
              {duration}
            </Text>
          </View>

          {completed && (
            <Animated.View style={[styles.checkmark, checkmarkStyle]}>
              <Ionicons name="checkmark-circle" size={32} color={colors.white} />
            </Animated.View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 4,
  },
  gradient: {
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  emoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  title: {
    marginBottom: 4,
  },
  duration: {
    marginTop: 4,
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 20,
  },
});

export default ActivityCard;

