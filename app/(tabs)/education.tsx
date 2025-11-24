import React from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EDUCATION_TIPS } from '../../src/constants/mockData';

export default function EducationTab() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Neuro-Educación</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Tips Destacados</Text>
          
          {EDUCATION_TIPS.map((tip) => (
            <Pressable key={tip.id} style={styles.tipCard}>
              <Image source={{ uri: tip.image }} style={styles.tipImage} />
              <View style={styles.tipContent}>
                <View style={styles.tipHeader}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{tip.category}</Text>
                  </View>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color="#f59e0b" />
                    <Text style={styles.ratingText}>{tip.rating}</Text>
                  </View>
                </View>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipSummary}>{tip.summary}</Text>
                <View style={styles.tipFooter}>
                  <Ionicons name="time-outline" size={14} color="#6b7280" />
                  <Text style={styles.tipDuration}>{tip.duration}</Text>
                </View>
              </View>
            </Pressable>
          ))}
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
    marginBottom: 12,
  },
  tipCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    overflow: 'hidden',
  },
  tipImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#e5e7eb',
  },
  tipContent: { padding: 16 },
  tipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: { color: '#4f46e5', fontSize: 12, fontWeight: '600' },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { color: '#6b7280', fontSize: 14, marginLeft: 4 },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  tipSummary: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  tipFooter: { flexDirection: 'row', alignItems: 'center' },
  tipDuration: { fontSize: 14, color: '#6b7280', marginLeft: 6 },
});
