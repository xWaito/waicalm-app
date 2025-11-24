import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { isValidKitCode } from '../../utils/validation.util';

export default function QRScanScreen() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    } catch (error) {
      console.error('Error solicitando permiso de cámara:', error);
      setHasPermission(false);
    }
  };

  const handleBarCodeScanned = ({ type, data }: any) => {
    if (scanned) return;

    setScanned(true);
    validateKitCode(data);
  };

  const validateKitCode = async (code: string) => {
    setScanning(true);

    try {
      if (!isValidKitCode(code)) {
        Alert.alert(
          'Código Inválido',
          'Este no es un código WaiCalm válido. Verifica que el código comience con WC-',
          [{ text: 'Reintentar', onPress: () => setScanned(false) }]
        );
        setScanning(false);
        return;
      }

      // Aquí llamarías a tu API para validar el código
      // const response = await apiClient.post('/kit/validate', { code });

      Alert.alert(
        '✅ Kit Validado',
        'Tu WaiCalm Kit ha sido activado exitosamente',
        [
          {
            text: 'Continuar',
            onPress: () => {
              // @ts-ignore
              navigation.navigate('Dashboard', { kitCode: code });
            },
          },
        ]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo validar el código');
      setScanned(false);
    } finally {
      setScanning(false);
    }
  };

  const simulateScan = () => {
    validateKitCode('WC-2024-12345');
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.turquoisePrimary} />
        <Text style={styles.loadingText}>Solicitando permiso de cámara...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.title}>Sin Acceso a la Cámara</Text>
        <Text style={styles.subtitle}>
          Necesitamos acceso a la cámara para escanear tu kit
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={requestCameraPermission}>
          <Text style={styles.retryButtonText}>Solicitar Permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Escanea tu Kit</Text>
          <Text style={styles.subtitle}>
            Apunta la cámara al código QR dentro de tu WAI CALM Kit
          </Text>
        </View>

        <View style={styles.cameraContainer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.camera}
          />

          <View style={styles.overlay}>
            <View style={styles.scanFrame}>
              <View style={[styles.corner, styles.cornerTopLeft]} />
              <View style={[styles.corner, styles.cornerTopRight]} />
              <View style={[styles.corner, styles.cornerBottomLeft]} />
              <View style={[styles.corner, styles.cornerBottomRight]} />
            </View>
          </View>

          {scanning && (
            <View style={styles.scanningOverlay}>
              <ActivityIndicator size="large" color={colors.white} />
              <Text style={styles.scanningText}>Validando código...</Text>
            </View>
          )}
        </View>

        {__DEV__ && (
          <TouchableOpacity style={styles.simulateButton} onPress={simulateScan}>
            <Text style={styles.simulateButtonText}>🔧 Simular Escaneo (Dev)</Text>
          </TouchableOpacity>
        )}

        <View style={styles.kitInfo}>
          <Text style={styles.infoTitle}>WAI CALM Kit Incluye:</Text>
          <View style={styles.kitItems}>
            <View style={styles.kitItem}>
              <Text style={styles.kitIcon}>🍬</Text>
              <Text style={styles.kitText}>Gomitas de Ashwagandha</Text>
            </View>
            <View style={styles.kitItem}>
              <Text style={styles.kitIcon}>🌿</Text>
              <Text style={styles.kitText}>Roll-on de Lavanda</Text>
            </View>
            <View style={styles.kitItem}>
              <Text style={styles.kitIcon}>📖</Text>
              <Text style={styles.kitText}>Guía Neurocientífica</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgWhite,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgWhite,
    paddingHorizontal: spacing.xl,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h2,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  cameraContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scanFrame: {
    width: 250,
    height: 250,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: colors.turquoisePrimary,
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  scanningOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanningText: {
    ...typography.body,
    color: colors.white,
    marginTop: spacing.md,
  },
  simulateButton: {
    backgroundColor: colors.turquoisePrimary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  simulateButtonText: {
    ...typography.body,
    color: colors.white,
    fontWeight: typography.weights.semibold,
  },
  kitInfo: {
    backgroundColor: colors.bgCream,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  infoTitle: {
    ...typography.h3,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  kitItems: {
    gap: spacing.sm,
  },
  kitItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  kitIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  kitText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  retryButton: {
    backgroundColor: colors.turquoisePrimary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.md,
    marginTop: spacing.lg,
  },
  retryButtonText: {
    ...typography.body,
    color: colors.white,
    fontWeight: typography.weights.semibold,
  },
});





