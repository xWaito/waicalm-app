import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface LoadingProps {
  message?: string;
}

export default function Loading({ message }: LoadingProps) {
  const { colors, typography, spacing } = useTheme();
  
  return (
    <View style={[styles.container, { padding: spacing.xl, backgroundColor: colors.bgPrimary }]}>
      <ActivityIndicator size="large" color={colors.accentPrimary} />
      {message && (
        <Text
          style={[
            styles.message,
            {
              color: colors.textSecondary,
              fontSize: typography.fontSize.md,
              marginTop: spacing.md,
            },
          ]}
        >
          {message}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {},
});





