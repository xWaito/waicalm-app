import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import { Card } from '../../components/ui/Card';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';

const posts = [
  {
    id: 1,
    author: 'Sofía_23',
    avatar: '👩',
    time: 'hace 5m',
    content: '¡Completé mi primera semana! Los ejercicios de respiración realmente funcionan 🌟',
    likes: 12,
    comments: 3,
  },
  {
    id: 2,
    author: 'Carlos_Fit',
    avatar: '👨',
    time: 'hace 15m',
    content: 'Pregunta: ¿alguien más siente que las gomitas les ayudan más por la noche?',
    likes: 8,
    comments: 5,
  },
];

export default function CommunityScreen() {
  const router = useRouter();
  const { colors, spacing, borderRadius, typography } = useTheme();
  
  // Animación para el badge EN VIVO
  const pulse = useSharedValue(1);
  
  React.useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1.2, { duration: 1000 }),
      -1,
      true
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

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
            Comunidad
          </Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={{ marginRight: spacing.md }}>
              <Ionicons name="add-circle-outline" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="settings-outline" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sesión en Vivo */}
        <View style={{ paddingHorizontal: spacing.md, marginTop: spacing.md }}>
          <Card variant="elevated" padding="md" radius="lg">
            <View style={styles.liveHeader}>
              <Animated.View style={[styles.liveBadge, pulseStyle]}>
                <View
                  style={[
                    styles.liveDot,
                    {
                      backgroundColor: colors.stressHigh,
                      borderRadius: borderRadius.full,
                    },
                  ]}
                />
              </Animated.View>
              <Text
                style={[
                  styles.liveText,
                  {
                    color: colors.stressHigh,
                    fontSize: typography.fontSize.md,
                    fontWeight: typography.fontWeight.bold,
                    marginLeft: spacing.sm,
                  },
                ]}
              >
                EN VIVO
              </Text>
            </View>
            <Text
              style={[
                styles.liveTitle,
                {
                  color: colors.textPrimary,
                  fontSize: typography.fontSize.lg,
                  fontWeight: typography.fontWeight.bold,
                  marginTop: spacing.sm,
                },
              ]}
            >
              Sesión Grupal
            </Text>
            <Text
              style={[
                styles.liveSubtitle,
                {
                  color: colors.textSecondary,
                  fontSize: typography.fontSize.md,
                  marginTop: spacing.xs,
                },
              ]}
            >
              Dr. Ana García
            </Text>
            <Text
              style={[
                styles.liveSubtitle,
                {
                  color: colors.textSecondary,
                  fontSize: typography.fontSize.sm,
                  marginTop: spacing.xs,
                },
              ]}
            >
              Mindfulness
            </Text>
            <Text
              style={[
                styles.liveParticipants,
                {
                  color: colors.textSecondary,
                  fontSize: typography.fontSize.sm,
                  marginTop: spacing.md,
                },
              ]}
            >
              235 personas conectadas
            </Text>
            <TouchableOpacity
              style={[
                styles.liveButton,
                {
                  backgroundColor: colors.accentPrimary,
                  borderRadius: borderRadius.md,
                  marginTop: spacing.md,
                },
              ]}
            >
              <Text
                style={[
                  styles.liveButtonText,
                  {
                    color: colors.white,
                    fontSize: typography.fontSize.md,
                    fontWeight: typography.fontWeight.semiBold,
                  },
                ]}
              >
                Unirse →
              </Text>
            </TouchableOpacity>
          </Card>
        </View>

        {/* Feed de la Comunidad */}
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
            Feed de la Comunidad
          </Text>
          {posts.map((post) => (
            <Card key={post.id} variant="elevated" padding="md" radius="lg" style={{ marginBottom: spacing.md }}>
              <View style={styles.postHeader}>
                <View
                  style={[
                    styles.avatar,
                    {
                      backgroundColor: colors.accentPrimary,
                      borderRadius: borderRadius.full,
                      width: 40,
                      height: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}
                >
                  <Text style={styles.avatarText}>{post.avatar}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: spacing.sm }}>
                  <Text
                    style={[
                      styles.author,
                      {
                        color: colors.textPrimary,
                        fontSize: typography.fontSize.md,
                        fontWeight: typography.fontWeight.semiBold,
                      },
                    ]}
                  >
                    {post.author}
                  </Text>
                  <Text
                    style={[
                      styles.time,
                      {
                        color: colors.textSecondary,
                        fontSize: typography.fontSize.xs,
                      },
                    ]}
                  >
                    • {post.time}
                  </Text>
                </View>
              </View>
              <Text
                style={[
                  styles.postContent,
                  {
                    color: colors.textPrimary,
                    fontSize: typography.fontSize.md,
                    marginTop: spacing.md,
                    lineHeight: 22,
                  },
                ]}
              >
                {post.content}
              </Text>
              <View style={[styles.postActions, { marginTop: spacing.md }]}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="heart-outline" size={20} color={colors.textSecondary} />
                  <Text
                    style={[
                      styles.actionText,
                      {
                        color: colors.textSecondary,
                        fontSize: typography.fontSize.sm,
                        marginLeft: spacing.xs,
                      },
                    ]}
                  >
                    {post.likes}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="chatbubble-outline" size={20} color={colors.textSecondary} />
                  <Text
                    style={[
                      styles.actionText,
                      {
                        color: colors.textSecondary,
                        fontSize: typography.fontSize.sm,
                        marginLeft: spacing.xs,
                      },
                    ]}
                  >
                    {post.comments}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="share-outline" size={20} color={colors.textSecondary} />
                  <Text
                    style={[
                      styles.actionText,
                      {
                        color: colors.textSecondary,
                        fontSize: typography.fontSize.sm,
                        marginLeft: spacing.xs,
                      },
                    ]}
                  >
                    Share
                  </Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))}
        </View>

        {/* Challenges Activos */}
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
            Challenges Activos
          </Text>
          <Card variant="elevated" padding="md" radius="lg">
            <View style={styles.challengeHeader}>
              <Text style={styles.challengeIcon}>🏆</Text>
              <View style={{ flex: 1, marginLeft: spacing.md }}>
                <Text
                  style={[
                    styles.challengeTitle,
                    {
                      color: colors.textPrimary,
                      fontSize: typography.fontSize.md,
                      fontWeight: typography.fontWeight.bold,
                    },
                  ]}
                >
                  Reto 30 Días
                </Text>
                <Text
                  style={[
                    styles.challengeProgress,
                    {
                      color: colors.textSecondary,
                      fontSize: typography.fontSize.sm,
                      marginTop: spacing.xs,
                    },
                  ]}
                >
                  15/30 completados
                </Text>
                <View
                  style={[
                    styles.challengeBar,
                    {
                      backgroundColor: colors.bgAccent,
                      borderRadius: borderRadius.sm,
                      height: 8,
                      marginTop: spacing.sm,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.challengeBarFill,
                      {
                        backgroundColor: colors.accentPrimary,
                        borderRadius: borderRadius.sm,
                        width: '50%',
                        height: 8,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
          </Card>
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
  sectionTitle: {},
  liveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveBadge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveDot: {
    width: 12,
    height: 12,
  },
  liveText: {},
  liveTitle: {},
  liveSubtitle: {},
  liveParticipants: {},
  liveButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  liveButtonText: {},
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {},
  avatarText: {
    fontSize: 20,
  },
  author: {},
  time: {},
  postContent: {},
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  actionText: {},
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  challengeIcon: {
    fontSize: 32,
  },
  challengeTitle: {},
  challengeProgress: {},
  challengeBar: {
    overflow: 'hidden',
  },
  challengeBarFill: {},
});
