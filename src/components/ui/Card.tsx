import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface CardProps {
  variant?: 'elevated' | 'flat' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
  radius?: 'sm' | 'md' | 'lg' | 'xl';
  children: ReactNode;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  padding = 'md',
  radius = 'lg',
  children,
  style,
}) => {
  const { colors, spacing, borderRadius } = useTheme();

  const paddingMap = {
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.lg,
  };

  const radiusMap = {
    sm: borderRadius.sm,
    md: borderRadius.md,
    lg: borderRadius.lg,
    xl: borderRadius.xl,
  };

  const cardStyles: ViewStyle = {
    backgroundColor: colors.bgCard,
    padding: paddingMap[padding],
    borderRadius: radiusMap[radius],
    ...(variant === 'elevated' && {
      shadowColor: colors.shadowCard,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 4,
    }),
    ...(variant === 'outlined' && {
      borderWidth: 1,
      borderColor: colors.textTertiary,
    }),
  };

  return <View style={[cardStyles, style]}>{children}</View>;
};

export default Card;
