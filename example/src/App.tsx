// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  getAvailableBiometric,
  NoEnrollError,
  UnknownBiometricError,
  UnsupportedBiometricError,
} from 'react-native-biometrics-scanner';

export default function App() {
  const [isBiometricAvailable, setIsBiometricAvailable] =
    useState<string>('Loading');
  const [biometricError, setBiometricError] = useState<string | null>(null);

  useEffect(() => {
    const getAvailability = async () => {
      try {
        setIsBiometricAvailable((await getAvailableBiometric()) ? 'Yes' : 'No');
      } catch (error) {
        if (error instanceof NoEnrollError) {
          setBiometricError('No enroll');
        }
        if (error instanceof UnsupportedBiometricError) {
          setBiometricError('Unsupported');
        }
        if (error instanceof UnknownBiometricError) {
          setBiometricError('Unknown error');
        }
      }
    };

    getAvailability();
  }, []);

  return (
    <View style={styles.container}>
      {biometricError ? (
        <Text>An Error occurred: {biometricError}</Text>
      ) : (
        <Text>is Available? {isBiometricAvailable}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
