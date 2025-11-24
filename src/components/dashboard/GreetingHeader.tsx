import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface GreetingHeaderProps {
  name: string;
  day: number;
}

export default function GreetingHeader({ name, day }: GreetingHeaderProps) {
  const firstName = name.split(' ')[0];

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>¡Hola {firstName}!</Text>
      <Text style={styles.subtitle}>Día {day} de tu Journey</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  greeting: {
    ...typography.h1,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});





