import React from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CommunityTab() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Comunidad</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.liveCard}>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>EN VIVO</Text>
            </View>
            <Text style={styles.liveTitle}>Sesión Grupal: Mindfulness</Text>
            <Text style={styles.liveSubtitle}>Dr. Ana García • 235 conectados</Text>
            <Pressable style={styles.liveButton}>
              <Text style={styles.liveButtonText}>Unirse →</Text>
            </Pressable>
          </View>

          <Text style={styles.sectionTitle}>Feed de la Comunidad</Text>
          
          <View style={styles.postCard}>
            <View style={styles.postHeader}>
              <Text style={styles.avatar}>👩</Text>
              <View style={styles.postInfo}>
                <Text style={styles.author}>Sofía_23</Text>
                <Text style={styles.time}>hace 5m</Text>
              </View>
            </View>
            <Text style={styles.postContent}>
              ¡Completé mi primera semana! Los ejercicios de respiración realmente funcionan 🌟
            </Text>
            <View style={styles.postActions}>
              <Pressable style={styles.actionButton}>
                <Ionicons name="heart-outline" size={20} color="#6b7280" />
                <Text style={styles.actionText}>12</Text>
              </Pressable>
              <Pressable style={styles.actionButton}>
                <Ionicons name="chatbubble-outline" size={20} color="#6b7280" />
                <Text style={styles.actionText}>3</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.postCard}>
            <View style={styles.postHeader}>
              <Text style={styles.avatar}>👨</Text>
              <View style={styles.postInfo}>
                <Text style={styles.author}>Carlos_Fit</Text>
                <Text style={styles.time}>hace 15m</Text>
              </View>
            </View>
            <Text style={styles.postContent}>
              Pregunta: ¿alguien más siente que las gomitas les ayudan más por la noche?
            </Text>
            <View style={styles.postActions}>
              <Pressable style={styles.actionButton}>
                <Ionicons name="heart-outline" size={20} color="#6b7280" />
                <Text style={styles.actionText}>8</Text>
              </Pressable>
              <Pressable style={styles.actionButton}>
                <Ionicons name="chatbubble-outline" size={20} color="#6b7280" />
                <Text style={styles.actionText}>5</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  scrollView: { flex: 1 },
  header: { padding: 16, paddingTop: 16 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#111827' },
  content: { paddingHorizontal: 16 },
  liveCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  liveBadge: { flexDirection: 'row', alignItems: 'center' },
  liveDot: { width: 8, height: 8, backgroundColor: '#ef4444', borderRadius: 4 },
  liveText: { color: '#ef4444', fontSize: 12, fontWeight: 'bold', marginLeft: 8 },
  liveTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginTop: 12 },
  liveSubtitle: { fontSize: 14, color: '#6b7280', marginTop: 4 },
  liveButton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  liveButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginTop: 24,
    marginBottom: 12,
  },
  postCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  postHeader: { flexDirection: 'row', alignItems: 'center' },
  avatar: { fontSize: 32, marginRight: 12 },
  postInfo: { flex: 1 },
  author: { fontSize: 16, fontWeight: '600', color: '#111827' },
  time: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  postContent: { fontSize: 14, color: '#374151', marginTop: 12, lineHeight: 20 },
  postActions: { flexDirection: 'row', marginTop: 12, gap: 16 },
  actionButton: { flexDirection: 'row', alignItems: 'center' },
  actionText: { fontSize: 14, color: '#6b7280', marginLeft: 6 },
});
