import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProgressTab() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="stats-chart" size={64} color="#4f46e5" />
        </View>
        <Text style={styles.title}>Progreso</Text>
        <Text style={styles.subtitle}>Próximamente</Text>
        <Text style={styles.description}>
          Aquí podrás ver tus métricas de progreso, gráficos de evolución y estadísticas detalladas.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#eef2ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: { fontSize: 28, fontWeight: 'bold', color: '#111827', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#6b7280', marginBottom: 16 },
  description: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },
});
