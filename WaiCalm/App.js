import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import TestFirebaseScreen from './src/screens/TestFirebaseScreen';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Pantalla temporal para probar Firebase */}
      <TestFirebaseScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
