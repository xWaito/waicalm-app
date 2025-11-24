import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    type: 'habit',
    icon: '💊',
    iconColor: '#EC4899',
    title: 'Hora de tus gomitas CBD',
    message: 'Son las 9:00 AM - momento de tu dosis diaria',
    time: 'Hace 5min',
    unread: true,
  },
  {
    id: '2',
    type: 'achievement',
    icon: '🏆',
    iconColor: '#F59E0B',
    title: '¡Nueva racha de 5 días!',
    message: 'Completaste 5 días seguidos. ¡Sigue así!',
    time: 'Hace 2h',
    unread: true,
  },
  {
    id: '3',
    type: 'community',
    icon: '👥',
    iconColor: '#6366F1',
    title: 'Sesión grupal comenzando',
    message: 'Dr. García está en vivo - únete ahora',
    time: 'Hace 30min',
    unread: false,
  },
  {
    id: '4',
    type: 'insight',
    icon: '🧠',
    iconColor: '#8B5CF6',
    title: 'Nuevo insight de IA',
    message: 'Tu estrés baja más cuando usas el roll-on antes de dormir',
    time: 'Ayer',
    unread: false,
  },
  {
    id: '5',
    type: 'reminder',
    icon: '🫁',
    iconColor: '#14B8A6',
    title: 'Respiración nocturna',
    message: 'Es hora de tu sesión de respiración 4-7-8',
    time: 'Hace 1 día',
    unread: false,
  },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => n.unread)
    : notifications;

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAsRead = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllAsRead = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const renderNotification = ({ item }: { item: typeof MOCK_NOTIFICATIONS[0] }) => (
    <Pressable
      onPress={() => markAsRead(item.id)}
      style={[styles.notifCard, item.unread && styles.notifCardUnread]}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.iconColor + '20' }]}>
        <Text style={styles.notifIcon}>{item.icon}</Text>
      </View>
      <View style={styles.notifContent}>
        <View style={styles.notifHeader}>
          <Text style={styles.notifTitle}>{item.title}</Text>
          <Text style={styles.notifTime}>{item.time}</Text>
        </View>
        <Text style={styles.notifMessage}>{item.message}</Text>
      </View>
      {item.unread && <View style={styles.unreadDot} />}
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Notificaciones</Text>
          {unreadCount > 0 && (
            <View style={styles.headerBadge}>
              <Text style={styles.headerBadgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
        <Pressable onPress={markAllAsRead}>
          <Text style={styles.markAllText}>Marcar todas</Text>
        </Pressable>
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        <Pressable
          onPress={() => setFilter('all')}
          style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
            Todas
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setFilter('unread')}
          style={[styles.filterButton, filter === 'unread' && styles.filterButtonActive]}
        >
          <Text style={[styles.filterText, filter === 'unread' && styles.filterTextActive]}>
            No leídas ({unreadCount})
          </Text>
        </Pressable>
      </View>

      {/* List */}
      <FlatList
        data={filteredNotifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>✅</Text>
            <Text style={styles.emptyText}>No hay notificaciones</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerBadge: {
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  headerBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  markAllText: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '600',
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
    backgroundColor: '#ffffff',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  filterButtonActive: {
    backgroundColor: '#4F46E5',
  },
  filterText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  list: {
    padding: 20,
  },
  notifCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  notifCardUnread: {
    backgroundColor: '#F0F9FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notifIcon: {
    fontSize: 24,
  },
  notifContent: {
    flex: 1,
  },
  notifHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notifTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  notifTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  notifMessage: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3B82F6',
    marginLeft: 8,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#9CA3AF',
  },
});


