import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/ui/Card';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  const router = useRouter();
  const { colors, spacing, borderRadius, typography, isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const stats = [
    { label: 'Actividad', value: '125' },
    { label: 'Días Racha', value: '15' },
  ];

  const menuItems = [
    { icon: 'notifications-outline', label: 'Notificaciones', onPress: () => {} },
    { icon: 'lock-closed-outline', label: 'Privacidad', onPress: () => {} },
    { icon: 'download-outline', label: 'Exportar Datos', onPress: () => {} },
    { icon: 'help-circle-outline', label: 'Ayuda y Soporte', onPress: () => {} },
    { icon: 'information-circle-outline', label: 'Sobre WaiCalm', onPress: () => {} },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bgPrimary }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { paddingHorizontal: spacing.md, paddingTop: spacing.md }]}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text
            style={[
              styles.headerTitle,
              {
                color: colors.textPrimary,
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.bold,
              },
            ]}
          >
            Perfil
          </Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={{ marginRight: spacing.md }}>
              <Ionicons name="settings-outline" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="ellipsis-horizontal" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Avatar y Info */}
        <View style={{ alignItems: 'center', marginTop: spacing.lg }}>
          <View
            style={[
              styles.avatar,
              {
                backgroundColor: colors.accentPrimary,
                borderRadius: borderRadius.full,
                width: 100,
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: spacing.md,
              },
            ]}
          >
            <Ionicons name="person" size={48} color={colors.white} />
          </View>
          <Text
            style={[
              styles.userName,
              {
                color: colors.textPrimary,
                fontSize: typography.fontSize.xxl,
                fontWeight: typography.fontWeight.bold,
                marginBottom: spacing.xs,
              },
            ]}
          >
            {user?.name || 'Usuario'}
          </Text>
          <Text
            style={[
              styles.userEmail,
              {
                color: colors.textSecondary,
                fontSize: typography.fontSize.md,
                marginBottom: spacing.xs,
              },
            ]}
          >
            {user?.email || 'usuario@email.com'}
          </Text>
          <Text
            style={[
              styles.memberSince,
              {
                color: colors.textTertiary,
                fontSize: typography.fontSize.sm,
              },
            ]}
          >
            Miembro desde {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }) : 'Feb 2024'}
          </Text>
        </View>

        {/* Mi Kit */}
        <View style={{ paddingHorizontal: spacing.md, marginTop: spacing.lg }}>
          <Card variant="elevated" padding="md" radius="lg">
            <View style={styles.kitHeader}>
              <Text
                style={[
                  styles.kitTitle,
                  {
                    color: colors.textPrimary,
                    fontSize: typography.fontSize.md,
                    fontWeight: typography.fontWeight.bold,
                  },
                ]}
              >
                Mi Kit
              </Text>
              <Text
                style={[
                  styles.kitCode,
                  {
                    color: colors.accentPrimary,
                    fontSize: typography.fontSize.md,
                    fontWeight: typography.fontWeight.semiBold,
                  },
                ]}
              >
                {user?.kitCode || 'WC-2024-12345'}
              </Text>
            </View>
            <Text
              style={[
                styles.kitDate,
                {
                  color: colors.textSecondary,
                  fontSize: typography.fontSize.sm,
                  marginTop: spacing.xs,
                },
              ]}
            >
              Activado el {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : '15 Feb 2024'}
            </Text>
          </Card>
        </View>

        {/* Estadísticas Generales */}
        <View style={{ paddingHorizontal: spacing.md, marginTop: spacing.lg }}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.textPrimary,
                fontSize: typography.fontSize.lg,
                fontWeight: typography.fontWeight.bold,
                marginBottom: spacing.md,
              },
            ]}
          >
            Estadísticas Generales
          </Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <Card
                key={index}
                variant="elevated"
                padding="md"
                radius="lg"
                style={{ flex: 1, marginRight: index === 0 ? spacing.sm : 0 }}
              >
                <Text
                  style={[
                    styles.statValue,
                    {
                      color: colors.accentPrimary,
                      fontSize: typography.fontSize.xxl,
                      fontWeight: typography.fontWeight.bold,
                    },
                  ]}
                >
                  {stat.value}
                </Text>
                <Text
                  style={[
                    styles.statLabel,
                    {
                      color: colors.textSecondary,
                      fontSize: typography.fontSize.sm,
                      marginTop: spacing.xs,
                    },
                  ]}
                >
                  {stat.label}
                </Text>
              </Card>
            ))}
          </View>
        </View>

        {/* Configuración */}
        <View style={{ paddingHorizontal: spacing.md, marginTop: spacing.lg, marginBottom: 100 }}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.textPrimary,
                fontSize: typography.fontSize.lg,
                fontWeight: typography.fontWeight.bold,
                marginBottom: spacing.md,
              },
            ]}
          >
            Configuración
          </Text>
          <Card variant="elevated" padding="md" radius="lg">
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={item.onPress}
                style={[
                  styles.menuItem,
                  {
                    borderBottomWidth: index < menuItems.length - 1 ? 1 : 0,
                    borderBottomColor: colors.bgAccent,
                    paddingBottom: index < menuItems.length - 1 ? spacing.md : 0,
                    marginBottom: index < menuItems.length - 1 ? spacing.md : 0,
                  },
                ]}
              >
                <View style={styles.menuItemLeft}>
                  <Ionicons name={item.icon as any} size={24} color={colors.textPrimary} />
                  <Text
                    style={[
                      styles.menuItemLabel,
                      {
                        color: colors.textPrimary,
                        fontSize: typography.fontSize.md,
                        marginLeft: spacing.md,
                      },
                    ]}
                  >
                    {item.label}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            ))}
            <View
              style={[
                styles.menuItem,
                {
                  borderBottomWidth: 1,
                  borderBottomColor: colors.bgAccent,
                  paddingBottom: spacing.md,
                  marginBottom: spacing.md,
                },
              ]}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons name={isDark ? 'moon' : 'sunny'} size={24} color={colors.textPrimary} />
                <Text
                  style={[
                    styles.menuItemLabel,
                    {
                      color: colors.textPrimary,
                      fontSize: typography.fontSize.md,
                      marginLeft: spacing.md,
                    },
                  ]}
                >
                  Tema Oscuro
                </Text>
              </View>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: colors.bgAccent, true: colors.accentPrimary }}
                thumbColor={colors.white}
              />
            </View>
          </Card>

          {/* Cerrar Sesión */}
          <TouchableOpacity
            onPress={logout}
            style={[
              styles.logoutButton,
              {
                backgroundColor: colors.stressHigh,
                borderRadius: borderRadius.md,
                marginTop: spacing.lg,
              },
            ]}
          >
            <Text
              style={[
                styles.logoutText,
                {
                  color: colors.white,
                  fontSize: typography.fontSize.md,
                  fontWeight: typography.fontWeight.semiBold,
                },
              ]}
            >
              Cerrar Sesión
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {},
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {},
  userName: {},
  userEmail: {},
  memberSince: {},
  kitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kitTitle: {},
  kitCode: {},
  kitDate: {},
  sectionTitle: {},
  statsGrid: {
    flexDirection: 'row',
  },
  statValue: {},
  statLabel: {},
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemLabel: {},
  logoutButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutText: {},
});

