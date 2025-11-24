import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import * as Haptics from 'expo-haptics';

interface Tab {
  name: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
}

interface BottomNavProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

const tabs: Tab[] = [
  { name: 'home', label: 'Inicio', icon: 'home', route: 'Dashboard' },
  { name: 'progress', label: 'Progreso', icon: 'stats-chart', route: 'Progress' },
  { name: 'education', label: 'Aprender', icon: 'school', route: 'Education' },
  { name: 'community', label: 'Comunidad', icon: 'people', route: 'Community' },
  { name: 'profile', label: 'Perfil', icon: 'person', route: 'Profile' },
];

export const BottomNav: React.FC<BottomNavProps> = ({ currentRoute, onNavigate }) => {
  const { colors, spacing, typography } = useTheme();

  const handlePress = (route: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onNavigate(route);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.bgCard,
          borderTopColor: colors.textTertiary,
          borderTopWidth: 1,
          paddingBottom: spacing.sm,
          paddingTop: spacing.sm,
        },
      ]}
    >
      {tabs.map((tab) => {
        const isActive = currentRoute === tab.route;
        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => handlePress(tab.route)}
            style={styles.tab}
            activeOpacity={0.7}
          >
            <Ionicons
              name={tab.icon}
              size={24}
              color={isActive ? colors.accentPrimary : colors.textSecondary}
            />
            <Text
              style={[
                styles.label,
                {
                  color: isActive ? colors.accentPrimary : colors.textSecondary,
                  fontSize: typography.fontSize.xs,
                  fontWeight: isActive
                    ? typography.fontWeight.semiBold
                    : typography.fontWeight.regular,
                },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  label: {
    marginTop: 4,
  },
});

export default BottomNav;

