import React from 'react';
import { TouchableOpacity, StyleSheet, View, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import * as Haptics from 'expo-haptics';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export const ThemeToggleButton: React.FC = () => {
  const { colors, spacing, borderRadius, isDark, toggleTheme } = useTheme();
  const scale = useSharedValue(1);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    scale.value = withSpring(0.9, { damping: 10 }, () => {
      scale.value = withSpring(1, { damping: 10 });
    });
    toggleTheme();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        style={styles.button}
      >
        <LinearGradient
          colors={isDark ? [colors.accentPrimary, colors.accentSecondary] : [colors.accentTertiary, colors.accentPrimary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.gradient,
            {
              borderRadius: borderRadius.full,
              width: 56,
              height: 56,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          <Ionicons
            name={isDark ? 'sunny' : 'moon'}
            size={24}
            color={colors.white}
          />
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  button: {
    borderRadius: 28,
    overflow: 'hidden',
  },
  gradient: {},
});

export default ThemeToggleButton;

