/**
 * Tipos para navegación
 */

import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Welcome: undefined;
  Auth: undefined;
  QRScan: undefined;
  Main: NavigatorScreenParams<MainTabParamList>;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Progress: undefined;
  Education: undefined;
  Community: undefined;
};

export type AuthStackParamList = {
  Welcome: undefined;
  Auth: undefined;
  QRScan: undefined;
};

