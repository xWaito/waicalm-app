import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Pressable,
  ActivityIndicator,
  SafeAreaView,
  Animated,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

export default function QRScan() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const router = useRouter();

  // Animaciones
  const cornerAnim = useRef(new Animated.Value(0)).current;
  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const successScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }

    // Animación de esquinas
    Animated.loop(
      Animated.sequence([
        Animated.timing(cornerAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(cornerAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Animación de línea de escaneo
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [permission]);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;
    
    setScanned(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    startScanSequence();
  };

  const startScanSequence = async () => {
    setScanning(true);
    setScanStep(1);

    // Animación de check
    Animated.spring(successScale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();

    // Paso 1: Vinculando (0-2.5s)
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Paso 2: Calibrando (2.5-4s)
    setScanStep(2);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Celebración
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    // Finalizar
    setScanning(false);
    router.replace('/(tabs)');
    
    setTimeout(() => {
      Alert.alert(
        '¡Kit Activado! 🎉',
        'Tu monitorización ha comenzado. Ya puedes usar todas las funciones de la app.',
        [{ text: 'Empezar', style: 'default' }]
      );
    }, 500);
  };

  const handleSimulateScan = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    startScanSequence();
  };

  const cornerScale = cornerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1],
  });

  const scanLineY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 250],
  });

  // Permisos no concedidos
  if (!permission?.granted) {
    return (
      <LinearGradient
        colors={['#1f2937', '#111827']}
        style={styles.permissionContainer}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.permissionContent}>
            <View style={styles.permissionIconContainer}>
              <Ionicons name="camera-off" size={80} color="#6b7280" />
            </View>
            <Text style={styles.permissionTitle}>Cámara Requerida</Text>
            <Text style={styles.permissionText}>
              Necesitamos acceso a tu cámara para escanear el código QR de tu kit bio-inteligente.
            </Text>
            
            <Pressable onPress={requestPermission} style={styles.permissionButtonWrapper}>
              <LinearGradient
                colors={['#10B981', '#14B8A6']}
                style={styles.permissionButton}
              >
                <Ionicons name="camera" size={20} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.permissionButtonText}>Permitir Cámara</Text>
              </LinearGradient>
            </Pressable>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>o</Text>
              <View style={styles.dividerLine} />
            </View>

            <Pressable onPress={handleSimulateScan} style={styles.simulateButton}>
              <Ionicons name="flash-outline" size={20} color="#10B981" style={{ marginRight: 8 }} />
              <Text style={styles.simulateText}>Simular Escaneo</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.container}>
      {!scanning ? (
        <>
          {/* Header */}
          <SafeAreaView style={styles.header}>
            <Pressable
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </Pressable>
            <Text style={styles.headerTitle}>Escanear Kit</Text>
            <View style={{ width: 40 }} />
          </SafeAreaView>

          <CameraView
            style={styles.camera}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ['qr'],
            }}
          />
          
          {/* Overlay */}
          <View style={styles.overlay}>
            {/* Instrucciones superiores */}
            <View style={styles.instructionsTop}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepNumber}>1</Text>
              </View>
              <Text style={styles.instructionText}>
                Encuentra el código QR en tu kit
              </Text>
            </View>

            <View style={styles.instructionsTop}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepNumber}>2</Text>
              </View>
              <Text style={styles.instructionText}>
                Centra el código en el marco verde
              </Text>
            </View>

            {/* Marco de escaneo animado */}
            <View style={styles.scanAreaContainer}>
              <View style={styles.scanArea}>
                {/* Esquinas animadas */}
                <Animated.View 
                  style={[
                    styles.corner, 
                    styles.cornerTL,
                    { transform: [{ scale: cornerScale }] }
                  ]} 
                />
                <Animated.View 
                  style={[
                    styles.corner, 
                    styles.cornerTR,
                    { transform: [{ scale: cornerScale }] }
                  ]} 
                />
                <Animated.View 
                  style={[
                    styles.corner, 
                    styles.cornerBL,
                    { transform: [{ scale: cornerScale }] }
                  ]} 
                />
                <Animated.View 
                  style={[
                    styles.corner, 
                    styles.cornerBR,
                    { transform: [{ scale: cornerScale }] }
                  ]} 
                />
                
                {/* Línea de escaneo */}
                <Animated.View
                  style={[
                    styles.scanLine,
                    {
                      transform: [{ translateY: scanLineY }],
                    },
                  ]}
                />
              </View>
            </View>

            {/* Footer con botón simular */}
            <View style={styles.footer}>
              <Pressable
                onPress={handleSimulateScan}
                style={styles.simulateButtonBottom}
              >
                <Ionicons name="flash" size={20} color="#10B981" style={{ marginRight: 8 }} />
                <Text style={styles.simulateButtonText}>Simular Escaneo</Text>
              </Pressable>
            </View>
          </View>
        </>
      ) : (
        // Modal de escaneo en progreso
        <LinearGradient
          colors={['#10B981', '#14B8A6']}
          style={styles.scanningOverlay}
        >
          <Animated.View
            style={[
              styles.successCircle,
              { transform: [{ scale: successScale }] },
            ]}
          >
            <Ionicons name="checkmark" size={80} color="#ffffff" />
          </Animated.View>
          <Text style={styles.successTitle}>
            {scanStep === 1 && '¡Kit Detectado!'}
            {scanStep === 2 && '¡Vinculación Exitosa!'}
          </Text>
          <Text style={styles.scanningText}>
            {scanStep === 1 && 'Vinculando Kit Bio-Inteligente...'}
            {scanStep === 2 && 'Calibrando Sensores...'}
          </Text>
          <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 20 }} />
        </LinearGradient>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
  },
  instructionsTop: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 16,
    marginHorizontal: 20,
    marginTop: 100,
    borderRadius: 12,
  },
  stepBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumber: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  instructionText: {
    color: '#ffffff',
    fontSize: 14,
    flex: 1,
    fontWeight: '500',
  },
  scanAreaContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanArea: {
    width: 260,
    height: 260,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderColor: '#10B981',
    borderWidth: 4,
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderTopLeftRadius: 8,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopRightRadius: 8,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomLeftRadius: 8,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#10B981',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  footer: {
    paddingBottom: 60,
    alignItems: 'center',
  },
  simulateButtonBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  simulateButtonText: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scanningOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  successCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  successTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  scanningText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    textAlign: 'center',
  },
  permissionContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  permissionContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  permissionIconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(107, 114, 128, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  permissionText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  permissionButtonWrapper: {
    width: '100%',
    marginBottom: 20,
  },
  permissionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
  },
  permissionButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dividerText: {
    color: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 16,
    fontSize: 14,
  },
  simulateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 16,
    width: '100%',
  },
  simulateText: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: '600',
  },
});
