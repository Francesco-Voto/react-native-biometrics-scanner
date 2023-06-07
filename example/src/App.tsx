// @ts-nocheck
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {
  authenticate,
  getAvailableBiometric,
  BiometricNoEnrollError,
  BiometricUnsupportedError,
  BiometricUnknownError,
} from 'react-native-biometrics-scanner';

export default function App() {
  const [isBiometricAvailable, setIsBiometricAvailable] =
    useState<string>('Loading');
  const [biometricError, setBiometricError] = useState<string | null>(null);

  useEffect(() => {
    const getAvailability = async () => {
      try {
        const biometric = await getAvailableBiometric(false);

        if (biometric) {
          setIsBiometricAvailable(biometric);
          await authenticate({
            promptMessage: 'Authenticate',
            cancelButtonText: 'Cancel',
            allowDeviceCredentials: true,
          });
        } else {
          setIsBiometricAvailable('No');
        }
      } catch (error) {
        if (error instanceof BiometricNoEnrollError) {
          setBiometricError('No enroll');
        }
        if (error instanceof BiometricUnsupportedError) {
          setBiometricError('Unsupported');
        }
        if (error instanceof BiometricUnknownError) {
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
