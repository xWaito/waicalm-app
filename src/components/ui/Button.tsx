import React, { ReactNode } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  gradient?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  children: ReactNode;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  gradient = false,
  fullWidth = false,
  loading = false,
  disabled = false,
  onPress,
  children,
  style,
}) => {
  const { colors, spacing, borderRadius, typography } = useTheme();

  const sizeMap = {
    sm: { padding: spacing.sm, fontSize: typography.fontSize.sm },
    md: { padding: spacing.md, fontSize: typography.fontSize.md },
    lg: { padding: spacing.lg, fontSize: typography.fontSize.lg },
  };

  const buttonStyle: ViewStyle = {
    borderRadius: borderRadius.md,
    paddingVertical: sizeMap[size].padding,
    paddingHorizontal: sizeMap[size].padding * 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    ...(fullWidth && { width: '100%' }),
    ...(disabled && { opacity: 0.5 }),
  };

  const textStyle: TextStyle = {
    fontSize: sizeMap[size].fontSize,
    fontWeight: typography.fontWeight.semiBold,
    color: variant === 'ghost' || variant === 'outline' ? colors.accentPrimary : colors.white,
    marginLeft: icon ? spacing.sm : 0,
  };

  const renderContent = () => (
    <>
      {loading ? (
        <ActivityIndicator color={colors.white} size="small" />
      ) : (
        <>
          {icon}
          <Text style={textStyle}>{children}</Text>
        </>
      )}
    </>
  );

  if (gradient && variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[buttonStyle, style]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[colors.accentPrimary, colors.accentSecondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
          borderRadius={borderRadius.md}
        />
        {renderContent()}
      </TouchableOpacity>
    );
  }

  const backgroundColor =
    variant === 'primary'
      ? colors.accentPrimary
      : variant === 'secondary'
      ? colors.accentSecondary
      : variant === 'outline'
      ? colors.transparent
      : colors.transparent;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        buttonStyle,
        {
          backgroundColor,
          ...(variant === 'outline' && {
            borderWidth: 2,
            borderColor: colors.accentPrimary,
          }),
        },
        style,
      ]}
      activeOpacity={0.7}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

export default Button;
