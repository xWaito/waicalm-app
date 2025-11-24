import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';

interface ActivityButtonProps {
  type: string;
  title: string;
  subtitle: string;
  icon: string;
  colors: string[];
  completed: boolean;
  onPress: () => void;
}

export default function ActivityButton({
  title,
  subtitle,
  icon,
  colors: buttonColors,
  completed,
  onPress,
}: ActivityButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.container, completed && styles.completedContainer]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: `${buttonColors[0]}20` },
        ]}
      >
        <Text style={styles.icon}>{icon}</Text>
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      {completed && (
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: colors.bgWhite,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  completedContainer: {
    borderWidth: 2,
    borderColor: colors.mintGreen,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  icon: {
    fontSize: 28,
  },
  title: {
    ...typography.body,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.small,
    color: colors.textSecondary,
  },
  checkmark: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.mintGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: typography.weights.bold,
  },
});





