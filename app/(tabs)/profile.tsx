import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_PROFILE } from '../../src/constants/mockData';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileTab() {
  const [tapCount, setTapCount] = useState(0);

  const handleAvatarPress = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);

    if (newCount === 3) {
      // Triple tap detectado
      Alert.alert(
        'Resetear Datos',
        '¿Estás seguro de que quieres borrar todos los datos locales?',
        [
          { text: 'Cancelar', style: 'cancel', onPress: () => setTapCount(0) },
          {
            text: 'Resetear',
            style: 'destructive',
            onPress: async () => {
              try {
                await AsyncStorage.clear();
                Alert.alert('✓ Datos reseteados', 'Todos los datos locales han sido eliminados.');
                setTapCount(0);
              } catch (error) {
                Alert.alert('Error', 'No se pudieron resetear los datos.');
              }
            },
          },
        ]
      );
    }

    // Resetear contador después de 2 segundos
    setTimeout(() => setTapCount(0), 2000);
  };

  const daysJourney = Math.floor(
    (new Date().getTime() - new Date(USER_PROFILE.createdAt).getTime()) /
      (1000 * 60 * 60 * 24)
  ) + 1;

  const stats = [
    { label: 'Racha', value: `${USER_PROFILE.streak} días`, icon: 'flame-outline', color: '#ea580c' },
    { label: 'Journey', value: `${daysJourney} días`, icon: 'calendar-outline', color: '#4f46e5' },
    { label: 'Adherencia', value: '87%', icon: 'trending-up-outline', color: '#10b981' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mi Perfil</Text>
        </View>

        {/* Avatar y Info */}
        <View style={styles.profileSection}>
          <Pressable onPress={handleAvatarPress}>
            <Image
              source={{ uri: USER_PROFILE.avatar }}
              style={styles.avatar}
            />
          </Pressable>
          <Text style={styles.name}>{USER_PROFILE.name}</Text>
          <Text style={styles.email}>{USER_PROFILE.email}</Text>

          {/* Badge de Kit Activo */}
          {USER_PROFILE.kitActive && (
            <View style={styles.kitBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#10b981" />
              <Text style={styles.kitBadgeText}>Kit Bio-Inteligente Activo</Text>
            </View>
          )}
        </View>

        {/* Estadísticas */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Estadísticas</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View
                  style={[styles.statIconContainer, { backgroundColor: stat.color + '20' }]}
                >
                  <Ionicons name={stat.icon as any} size={24} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Información de Contacto */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Información</Text>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <Ionicons name="call-outline" size={20} color="#6b7280" />
              <Text style={styles.infoLabel}>Teléfono</Text>
              <Text style={styles.infoValue}>{USER_PROFILE.phone}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Ionicons name="mail-outline" size={20} color="#6b7280" />
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue} numberOfLines={1}>
                {USER_PROFILE.email}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Ionicons name="pulse-outline" size={20} color="#6b7280" />
              <Text style={styles.infoLabel}>Nivel de Estrés</Text>
              <Text style={[styles.infoValue, { color: '#10b981', fontWeight: '600' }]}>
                {USER_PROFILE.stressScore} / 100
              </Text>
            </View>
          </View>
        </View>

        {/* Configuración */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Configuración</Text>
          <View style={styles.card}>
            <Pressable style={styles.actionRow}>
              <Ionicons name="notifications-outline" size={22} color="#4f46e5" />
              <Text style={styles.actionLabel}>Notificaciones</Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.actionRow}>
              <Ionicons name="shield-checkmark-outline" size={22} color="#4f46e5" />
              <Text style={styles.actionLabel}>Privacidad</Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.actionRow}>
              <Ionicons name="help-circle-outline" size={22} color="#4f46e5" />
              <Text style={styles.actionLabel}>Ayuda y Soporte</Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </Pressable>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Versión 1.0.0 • WAI CALM © 2024
          </Text>
          <Text style={styles.footerHint}>
            💡 Toca 3 veces el avatar para resetear datos
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 4,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 12,
  },
  kitBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d1fae5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 8,
  },
  kitBadgeText: {
    color: '#059669',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  statsSection: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  infoSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
  },
  infoValue: {
    fontSize: 16,
    color: '#6b7280',
  },
  divider: {
    height: 1,
    backgroundColor: '#f3f4f6',
  },
  actionsSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  actionLabel: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  footerText: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 8,
  },
  footerHint: {
    fontSize: 11,
    color: '#d1d5db',
    fontStyle: 'italic',
  },
});
