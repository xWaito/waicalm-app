import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'wai.gummy.doses';

export default function GummyTracker() {
  const router = useRouter();
  const [dosage, setDosage] = useState(1);
  const [takenToday, setTakenToday] = useState(false);

  const handleTakeDose = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    setTakenToday(true);
    
    // Guardar en AsyncStorage
    const today = new Date().toDateString();
    const doses = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY) || '{}');
    doses[today] = { dosage, time: new Date().toISOString() };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(doses));

    Alert.alert(
      '¡Dosis Registrada! 💊',
      `Has tomado ${dosage} ${dosage === 1 ? 'gomita' : 'gomitas'} CBD.\n\nEfectos esperados en 30-45 minutos.`,
      [{ text: 'Entendido', style: 'default' }]
    );

    setTimeout(() => router.back(), 2000);
  };

  return (
    <LinearGradient
      colors={['#EC4899', '#F472B6', '#FBCFE8']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="close" size={28} color="#ffffff" />
          </Pressable>
          <Text style={styles.headerTitle}>Gomitas CBD</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Icon */}
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>💊</Text>
          </View>

          {/* Info */}
          <Text style={styles.title}>Registro de Dosis</Text>
          <Text style={styles.subtitle}>
            Tus gomitas CBD con ashwagandha para reducir el estrés
          </Text>

          {/* Dosage Selector */}
          <View style={styles.dosageContainer}>
            <Text style={styles.label}>Cantidad de gomitas</Text>
            <View style={styles.dosageSelector}>
              {[1, 2, 3].map(num => (
                <Pressable
                  key={num}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setDosage(num);
                  }}
                  style={[
                    styles.dosageButton,
                    dosage === num && styles.dosageButtonSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.dosageText,
                      dosage === num && styles.dosageTextSelected,
                    ]}
                  >
                    {num}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Benefits */}
          <View style={styles.benefitsContainer}>
            <Text style={styles.benefitsTitle}>Beneficios</Text>
            {[
              'Reduce niveles de cortisol',
              'Mejora calidad del sueño',
              'Disminuye ansiedad',
              'Promueve relajación natural',
            ].map((benefit, index) => (
              <View key={index} style={styles.benefitRow}>
                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>

          {/* Info Card */}
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={24} color="#3B82F6" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Dosis Recomendada</Text>
              <Text style={styles.infoText}>
                1-2 gomitas al día, preferiblemente en la mañana. No exceder 3 por día.
              </Text>
            </View>
          </View>

          {/* Action Button */}
          <Pressable
            onPress={handleTakeDose}
            disabled={takenToday}
            style={styles.actionButtonWrapper}
          >
            <LinearGradient
              colors={takenToday ? ['#9CA3AF', '#6B7280'] : ['#10B981', '#059669']}
              style={styles.actionButton}
            >
              <Ionicons
                name={takenToday ? 'checkmark-done' : 'checkmark'}
                size={24}
                color="#ffffff"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.actionButtonText}>
                {takenToday ? 'Ya tomadas hoy' : 'Registrar Dosis'}
              </Text>
            </LinearGradient>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 32,
  },
  icon: {
    fontSize: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  dosageContainer: {
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  dosageSelector: {
    flexDirection: 'row',
    gap: 12,
  },
  dosageButton: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  dosageButtonSelected: {
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
  },
  dosageText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  dosageTextSelected: {
    color: '#EC4899',
  },
  benefitsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    marginLeft: 12,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 18,
  },
  actionButtonWrapper: {
    marginBottom: 40,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


