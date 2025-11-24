import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Loading from '../components/ui/Loading';
import { ThemeToggleButton } from '../components/ui/ThemeToggleButton';

// Screens
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import AuthScreen from '../screens/auth/AuthScreen';
import QRScanScreen from '../screens/onboarding/QRScanScreen';
import DashboardScreen from '../screens/main/DashboardScreen';
import ProgressScreen from '../screens/main/ProgressScreen';
import EducationScreen from '../screens/main/EducationScreen';
import CommunityScreen from '../screens/main/CommunityScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator para las pantallas principales
function MainTabs() {
  const { colors, typography } = useTheme();

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            switch (route.name) {
              case 'Dashboard':
                iconName = 'home';
                break;
              case 'Progress':
                iconName = 'stats-chart';
                break;
              case 'Education':
                iconName = 'school';
                break;
              case 'Community':
                iconName = 'people';
                break;
              case 'Profile':
                iconName = 'person';
                break;
              default:
                iconName = 'help-circle';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.accentPrimary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: {
            backgroundColor: colors.bgCard,
            borderTopColor: colors.textTertiary,
            borderTopWidth: 1,
            paddingBottom: 8,
            paddingTop: 8,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: typography.fontSize.xs,
            fontWeight: typography.fontWeight.regular,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ tabBarLabel: 'Inicio' }}
        />
        <Tab.Screen
          name="Progress"
          component={ProgressScreen}
          options={{ tabBarLabel: 'Progreso' }}
        />
        <Tab.Screen
          name="Education"
          component={EducationScreen}
          options={{ tabBarLabel: 'Aprender' }}
        />
        <Tab.Screen
          name="Community"
          component={CommunityScreen}
          options={{ tabBarLabel: 'Comunidad' }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ tabBarLabel: 'Perfil' }}
        />
      </Tab.Navigator>
      <ThemeToggleButton />
    </>
  );
}

export default function AppNavigator() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading message="Cargando..." />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#F5F3F0' },
        }}
      >
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Auth" component={AuthScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="QRScan" component={QRScanScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
