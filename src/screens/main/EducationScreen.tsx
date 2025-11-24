import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import { Card } from '../../components/ui/Card';

const { width } = Dimensions.get('window');

const categories = ['Todo', 'Ciencia', 'Técnicas', 'Mind'];
const videos = [
  {
    id: 1,
    title: 'Ciencia del Cortisol',
    description: 'Descubre cómo funciona la hormona del estrés',
    duration: '8 min',
    rating: 4.8,
    views: '1.2k',
    thumbnail: '🎥',
  },
  {
    id: 2,
    title: 'Respiración 4-7-8',
    description: 'Técnica científicamente comprobada',
    duration: '6 min',
    rating: 4.9,
    views: '890',
    thumbnail: '🎥',
  },
];

const articles = [
  {
    id: 1,
    title: 'HRV y su relación con el estrés',
    readingTime: '5 min de lectura',
    icon: '📄',
  },
  {
    id: 2,
    title: 'Ashwagandha: Beneficios científicos',
    readingTime: '8 min de lectura',
    icon: '📄',
  },
];

export default function EducationScreen() {
  const router = useRouter();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('Todo');

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
            Neuro-Educación
          </Text>
          <TouchableOpacity>
            <Ionicons name="search-outline" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Categorías */}
        <View style={[styles.categories, { paddingHorizontal: spacing.md, marginTop: spacing.md }]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor:
                      selectedCategory === category ? colors.accentPrimary : colors.bgCard,
                    borderRadius: borderRadius.md,
                    paddingHorizontal: spacing.md,
                    paddingVertical: spacing.sm,
                    marginRight: spacing.sm,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    {
                      color:
                        selectedCategory === category ? colors.white : colors.textSecondary,
                      fontSize: typography.fontSize.sm,
                      fontWeight:
                        selectedCategory === category
                          ? typography.fontWeight.semiBold
                          : typography.fontWeight.regular,
                    },
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Video Destacado */}
        <View style={{ paddingHorizontal: spacing.md, marginTop: spacing.lg }}>
          <Card variant="elevated" padding="lg" radius="lg">
            <LinearGradient
              colors={[colors.accentPrimary, colors.accentSecondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[
                styles.videoThumbnail,
                {
                  borderRadius: borderRadius.md,
                  height: 200,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: spacing.md,
                },
              ]}
            >
              <Ionicons name="play-circle" size={64} color={colors.white} />
            </LinearGradient>
            <Text
              style={[
                styles.videoTitle,
                {
                  color: colors.textPrimary,
                  fontSize: typography.fontSize.lg,
                  fontWeight: typography.fontWeight.bold,
                  marginBottom: spacing.xs,
                },
              ]}
            >
              {videos[0].title}
            </Text>
            <Text
              style={[
                styles.videoDescription,
                {
                  color: colors.textSecondary,
                  fontSize: typography.fontSize.sm,
                  marginBottom: spacing.sm,
                },
              ]}
            >
              {videos[0].description}
            </Text>
            <View style={styles.videoMeta}>
              <Text
                style={[
                  styles.metaText,
                  {
                    color: colors.textSecondary,
                    fontSize: typography.fontSize.xs,
                  },
                ]}
              >
                {videos[0].duration}
              </Text>
              <Text
                style={[
                  styles.metaText,
                  {
                    color: colors.accentTertiary,
                    fontSize: typography.fontSize.xs,
                    marginLeft: spacing.md,
                  },
                ]}
              >
                ★ {videos[0].rating}
              </Text>
              <Text
                style={[
                  styles.metaText,
                  {
                    color: colors.textSecondary,
                    fontSize: typography.fontSize.xs,
                    marginLeft: spacing.md,
                  },
                ]}
              >
                👁 {videos[0].views}
              </Text>
            </View>
          </Card>
        </View>

        {/* Más Videos */}
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
            Más Videos
          </Text>
          {videos.slice(1).map((video) => (
            <Card key={video.id} variant="elevated" padding="md" radius="lg" style={{ marginBottom: spacing.md }}>
              <View style={styles.videoRow}>
                <LinearGradient
                  colors={[colors.accentSecondary, colors.botanicalGreen]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[
                    styles.smallThumbnail,
                    {
                      borderRadius: borderRadius.md,
                      width: 120,
                      height: 80,
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}
                >
                  <Ionicons name="play-circle" size={32} color={colors.white} />
                </LinearGradient>
                <View style={{ flex: 1, marginLeft: spacing.md }}>
                  <Text
                    style={[
                      styles.videoTitle,
                      {
                        color: colors.textPrimary,
                        fontSize: typography.fontSize.md,
                        fontWeight: typography.fontWeight.semiBold,
                        marginBottom: spacing.xs,
                      },
                    ]}
                  >
                    {video.title}
                  </Text>
                  <Text
                    style={[
                      styles.videoDescription,
                      {
                        color: colors.textSecondary,
                        fontSize: typography.fontSize.sm,
                        marginBottom: spacing.xs,
                      },
                    ]}
                  >
                    {video.description}
                  </Text>
                  <View style={styles.videoMeta}>
                    <Text
                      style={[
                        styles.metaText,
                        {
                          color: colors.textSecondary,
                          fontSize: typography.fontSize.xs,
                        },
                      ]}
                    >
                      {video.duration}
                    </Text>
                    <Text
                      style={[
                        styles.metaText,
                        {
                          color: colors.accentTertiary,
                          fontSize: typography.fontSize.xs,
                          marginLeft: spacing.sm,
                        },
                      ]}
                    >
                      ★ {video.rating}
                    </Text>
                    <Text
                      style={[
                        styles.metaText,
                        {
                          color: colors.textSecondary,
                          fontSize: typography.fontSize.xs,
                          marginLeft: spacing.sm,
                        },
                      ]}
                    >
                      👁 {video.views}
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
          ))}
        </View>

        {/* Artículos Recientes */}
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
            Artículos Recientes
          </Text>
          {articles.map((article) => (
            <Card key={article.id} variant="elevated" padding="md" radius="lg" style={{ marginBottom: spacing.md }}>
              <View style={styles.articleRow}>
                <Text style={styles.articleIcon}>{article.icon}</Text>
                <View style={{ flex: 1, marginLeft: spacing.md }}>
                  <Text
                    style={[
                      styles.articleTitle,
                      {
                        color: colors.textPrimary,
                        fontSize: typography.fontSize.md,
                        fontWeight: typography.fontWeight.semiBold,
                        marginBottom: spacing.xs,
                      },
                    ]}
                  >
                    {article.title}
                  </Text>
                  <Text
                    style={[
                      styles.articleReadingTime,
                      {
                        color: colors.textSecondary,
                        fontSize: typography.fontSize.sm,
                      },
                    ]}
                  >
                    {article.readingTime}
                  </Text>
                </View>
              </View>
            </Card>
          ))}
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
  categories: {
    marginBottom: 8,
  },
  categoryButton: {},
  categoryText: {},
  sectionTitle: {},
  videoThumbnail: {},
  videoTitle: {},
  videoDescription: {},
  videoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {},
  videoRow: {
    flexDirection: 'row',
  },
  smallThumbnail: {},
  articleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  articleIcon: {
    fontSize: 32,
  },
  articleTitle: {},
  articleReadingTime: {},
});
