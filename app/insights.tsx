import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const MOCK_INSIGHTS = [
  {
    id: '1',
    icon: 'trending-down',
    iconBg: '#10B981',
    title: 'Patrón identificado',
    description: 'Tu nivel de estrés baja 15% más los días que usas el roll-on de lavanda antes de dormir.',
    recommendation: 'Usa el roll-on todas las noches a las 21:00',
    type: 'success',
    confidence: 92,
  },
  {
    id: '2',
    icon: 'bulb',
    iconBg: '#F59E0B',
    title: 'Recomendación personalizada',
    description: 'Basado en tu progreso, aumentar las sesiones de respiración a 2 veces al día podría reducir tu estrés un 20% adicional.',
    recommendation: 'Agregar sesión de respiración a las 14:00',
    type: 'info',
    confidence: 87,
  },
  {
    id: '3',
    icon: 'trophy',
    iconBg: '#6366F1',
    title: 'Meta alcanzable',
    description: 'Si mantienes tu racha 2 días más, alcanzarás 7 días consecutivos y tu adherencia subirá a 92%.',
    recommendation: 'Mantén tu racha actual',
    type: 'goal',
    confidence: 95,
  },
  {
    id: '4',
    icon: 'analytics',
    iconBg: '#8B5CF6',
    title: 'Análisis de journal',
    description: 'Tus entradas de journal muestran menos preocupación sobre "Trabajo" desde que comenzaste con las gomitas CBD.',
    recommendation: 'Continúa con tu dosis actual',
    type: 'analysis',
    confidence: 89,
  },
];

export default function InsightsScreen() {
  const router = useRouter();

  const handleApplyRecommendation = (insight: typeof MOCK_INSIGHTS[0]) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    alert(`Recomendación aplicada:\n\n${insight.recommendation}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </Pressable>
        <Text style={styles.headerTitle}>Insights de IA</Text>
        <Pressable>
          <Ionicons name="information-circle-outline" size={24} color="#6B7280" />
        </Pressable>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Card */}
        <LinearGradient
          colors={['#4F46E5', '#7C3AED']}
          style={styles.heroCard}
        >
          <Ionicons name="sparkles" size={32} color="#ffffff" />
          <Text style={styles.heroTitle}>Tu análisis personalizado</Text>
          <Text style={styles.heroSubtitle}>
            Basado en {MOCK_INSIGHTS.length} patrones detectados en tus datos
          </Text>
        </LinearGradient>

        {/* Insights List */}
        <View style={styles.content}>
          {MOCK_INSIGHTS.map((insight, index) => (
            <View key={insight.id} style={styles.insightCard}>
              <View style={styles.insightHeader}>
                <View style={[styles.insightIcon, { backgroundColor: insight.iconBg }]}>
                  <Ionicons name={insight.icon as any} size={28} color="#ffffff" />
                </View>
                <View style={styles.confidenceBadge}>
                  <Ionicons name="checkmark-circle" size={14} color="#10B981" />
                  <Text style={styles.confidenceText}>{insight.confidence}% confianza</Text>
                </View>
              </View>

              <Text style={styles.insightTitle}>{insight.title}</Text>
              <Text style={styles.insightDescription}>{insight.description}</Text>

              <View style={styles.recommendationBox}>
                <Ionicons name="flash" size={16} color="#F59E0B" />
                <Text style={styles.recommendationText}>{insight.recommendation}</Text>
              </View>

              <Pressable
                onPress={() => handleApplyRecommendation(insight)}
                style={styles.applyButton}
              >
                <Text style={styles.applyButtonText}>Aplicar Recomendación</Text>
                <Ionicons name="arrow-forward" size={16} color="#4F46E5" />
              </Pressable>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Ionicons name="information-circle" size={20} color="#9CA3AF" />
          <Text style={styles.footerText}>
            Los insights se actualizan cada 24 horas basándose en tus hábitos y patrones.
          </Text>
        </View>
      </ScrollView>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  scrollView: {
    flex: 1,
  },
  heroCard: {
    margin: 20,
    padding: 28,
    borderRadius: 20,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 20,
  },
  insightCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  insightIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confidenceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
    marginLeft: 4,
  },
  insightTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
  },
  insightDescription: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 16,
  },
  recommendationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  recommendationText: {
    fontSize: 14,
    color: '#92400E',
    fontWeight: '600',
    marginLeft: 8,
    flex: 1,
  },
  applyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF2FF',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  applyButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4F46E5',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 40,
  },
  footerText: {
    fontSize: 13,
    color: '#9CA3AF',
    marginLeft: 10,
    flex: 1,
    lineHeight: 18,
  },
});


