import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme';

interface BottomNavProps {
  activeTab: string;
}

export default function BottomNav({ activeTab }: BottomNavProps) {
  const navigation = useNavigation();

  const tabs = [
    { id: 'dashboard', label: 'Inicio', icon: '🏠' },
    { id: 'progress', label: 'Progreso', icon: '📊' },
    { id: 'education', label: 'Educación', icon: '🎓' },
    { id: 'community', label: 'Comunidad', icon: '👥' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={styles.tab}
          onPress={() => {
            // @ts-ignore
            navigation.navigate(tab.id === 'dashboard' ? 'Dashboard' : tab.id);
          }}
        >
          <Text style={styles.icon}>{tab.icon}</Text>
          <Text
            style={[
              styles.label,
              activeTab === tab.id && styles.labelActive,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.bgWhite,
    borderTopWidth: 1,
    borderTopColor: colors.bgCream,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  label: {
    ...typography.small,
    color: colors.textSecondary,
  },
  labelActive: {
    color: colors.turquoisePrimary,
    fontWeight: typography.weights.semibold,
  },
});





