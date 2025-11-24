import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
  FlatList,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { JournalEntry } from '../../src/types';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

const STORAGE_KEY = 'wai.journal.entries';

const MOOD_OPTIONS: Array<{ mood: JournalEntry['mood']; label: string; color: string }> = [
  { mood: '😢', label: 'Triste', color: '#3B82F6' },
  { mood: '😟', label: 'Preocupado', color: '#F59E0B' },
  { mood: '😐', label: 'Neutro', color: '#6B7280' },
  { mood: '🙂', label: 'Bien', color: '#10B981' },
  { mood: '😄', label: 'Genial', color: '#F97316' },
];

const TAG_OPTIONS = ['Trabajo', 'Familia', 'Tráfico', 'Futuro'];

const MOCK_ENTRIES: JournalEntry[] = [
  {
    id: 'mock_1',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    mood: '🙂',
    tags: ['Familia', 'Futuro'],
    content: 'Hoy fue un día tranquilo. Pasé tiempo de calidad con mi familia y me sentí más conectada con el presente.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'mock_2',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    mood: '😐',
    tags: ['Trabajo', 'Tráfico'],
    content: 'El tráfico de hoy me dejó agotada. En el trabajo hubo muchas reuniones pero logré mantener la calma.',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export default function JournalScreen() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<JournalEntry['mood'] | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [saveAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const mockIds = MOCK_ENTRIES.map(e => e.id);
        const uniqueParsed = parsed.filter((e: JournalEntry) => !mockIds.includes(e.id));
        const combined = [...uniqueParsed, ...MOCK_ENTRIES];
        combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setEntries(combined);
      } else {
        setEntries(MOCK_ENTRIES);
      }
    } catch (error) {
      console.error('Error loading entries:', error);
      setEntries(MOCK_ENTRIES);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTag = (tag: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const selectMood = (mood: JournalEntry['mood']) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedMood(mood);
  };

  const handleSaveEntry = async () => {
    if (!selectedMood) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      Alert.alert('Selecciona tu ánimo', 'Por favor selecciona cómo te sientes');
      return;
    }
    if (content.trim() === '') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      Alert.alert('Escribe algo', 'Por favor escribe tus pensamientos');
      return;
    }

    // Animación de guardado
    Animated.sequence([
      Animated.timing(saveAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(saveAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    const newEntry: JournalEntry = {
      id: `entry_${Date.now()}`,
      date: new Date().toISOString(),
      mood: selectedMood,
      tags: selectedTags,
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    setSelectedMood(null);
    setSelectedTags([]);
    setContent('');

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    try {
      const toSave = updatedEntries.filter(e => !e.id.startsWith('mock_'));
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
      
      Alert.alert(
        '✓ Entrada Guardada',
        'Tu reflexión ha sido registrada y analizada por nuestra IA.',
        [{ text: 'Continuar', style: 'default' }]
      );
    } catch (error) {
      console.error('Error saving entry:', error);
      setEntries(entries);
      Alert.alert('Error', 'No se pudo guardar la entrada. Intenta de nuevo.');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return `Hoy, ${date.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      return 'Ayer';
    } else {
      return date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    }
  };

  const renderEntry = ({ item }: { item: JournalEntry }) => {
    const moodData = MOOD_OPTIONS.find(m => m.mood === item.mood);
    return (
      <View style={styles.entryCard}>
        <View style={styles.entryHeader}>
          <View style={[styles.moodCircle, { backgroundColor: moodData?.color + '20' }]}>
            <Text style={styles.entryMood}>{item.mood}</Text>
          </View>
          <View style={styles.entryHeaderInfo}>
            <Text style={styles.entryDate}>{formatDate(item.date)}</Text>
          </View>
        </View>
        {item.tags.length > 0 && (
          <View style={styles.entryTags}>
            {item.tags.map((tag, index) => (
              <View key={index} style={styles.entryTag}>
                <Text style={styles.entryTagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}
        <Text style={styles.entryContent} numberOfLines={3}>
          {item.content}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi Diario</Text>
        <Text style={styles.headerSubtitle}>Registra tus pensamientos y emociones</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Formulario Premium */}
        <View style={styles.formSection}>
          <View style={styles.card}>
            <Text style={styles.label}>¿Cómo te sientes?</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.moodSelector}
            >
              {MOOD_OPTIONS.map(({ mood, label, color }) => (
                <Pressable
                  key={mood}
                  onPress={() => selectMood(mood)}
                  style={[
                    styles.moodButton,
                    selectedMood === mood && { ...styles.moodButtonSelected, borderColor: color },
                  ]}
                >
                  <Text style={styles.moodEmoji}>{mood}</Text>
                  <Text style={[styles.moodLabel, selectedMood === mood && { color }]}>
                    {label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            <Text style={[styles.label, styles.labelSpaced]}>Etiquetas</Text>
            <View style={styles.tagsContainer}>
              {TAG_OPTIONS.map(tag => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <Pressable
                    key={tag}
                    onPress={() => toggleTag(tag)}
                    style={[
                      styles.tagChip,
                      isSelected && styles.tagChipSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.tagChipText,
                        isSelected && styles.tagChipTextSelected,
                      ]}
                    >
                      {tag}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={[styles.label, styles.labelSpaced]}>Tus pensamientos</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Escribe cómo te sientes hoy, qué te preocupa o qué te hace feliz..."
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={5}
              value={content}
              onChangeText={setContent}
              textAlignVertical="top"
            />

            <Pressable onPress={handleSaveEntry}>
              <LinearGradient
                colors={['#10B981', '#14B8A6']}
                style={styles.saveButton}
              >
                <Ionicons name="checkmark-circle" size={22} color="#ffffff" style={{ marginRight: 8 }} />
                <Text style={styles.saveButtonText}>Guardar Entrada</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>

        {/* Lista de Entradas */}
        <View style={styles.entriesSection}>
          <Text style={styles.sectionTitle}>Entradas Recientes</Text>
          {isLoading ? (
            <Text style={styles.loadingText}>Cargando...</Text>
          ) : entries.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>📝</Text>
              <Text style={styles.emptyText}>
                Aún no tienes entradas
              </Text>
              <Text style={styles.emptySubtext}>
                ¡Escribe tu primera reflexión arriba!
              </Text>
            </View>
          ) : (
            <FlatList
              data={entries}
              renderItem={renderEntry}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          )}
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  formSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 14,
  },
  labelSpaced: {
    marginTop: 24,
  },
  moodSelector: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  moodButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
    marginRight: 12,
    minWidth: 80,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  moodButtonSelected: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  moodEmoji: {
    fontSize: 36,
    marginBottom: 6,
  },
  moodLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tagChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  tagChipSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#4F46E5',
  },
  tagChipText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  tagChipTextSelected: {
    color: '#4F46E5',
    fontWeight: '700',
  },
  textArea: {
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: '#111827',
    minHeight: 140,
    fontWeight: '400',
    lineHeight: 24,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 20,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  entriesSection: {
    paddingHorizontal: 20,
    marginTop: 32,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    paddingVertical: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9ca3af',
  },
  entryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 20,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  moodCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  entryMood: {
    fontSize: 32,
  },
  entryHeaderInfo: {
    flex: 1,
  },
  entryDate: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '600',
  },
  entryTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  entryTag: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  entryTagText: {
    fontSize: 12,
    color: '#4F46E5',
    fontWeight: '600',
  },
  entryContent: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
});
