import BiometricsScanner from './NativeBiometricsScanner';
import { ErrorMap } from './errors';
import type { BiometricType } from './types';

/**
 * @param allowDeviceCredentials - check if using device credential as fallback
 * @return {Promise<BiometricType>} of the hardware
 *
 * @throws {@link UnknownBiometricError} when biometric status is unknown
 * @throws {@link UnsupportedBiometricError} when biometric is not supported
 * @throws {@link NoEnrollError} when user must enroll to use biometric
 */
export async function getAvailableBiometric(
  allowDeviceCredentials: boolean
): Promise<BiometricType> {
  try {
    const biometricType = await BiometricsScanner.getAvailableBiometric(
      allowDeviceCredentials
    );
    return biometricType;
  } catch (error: any) {
    const errorGenerator = ErrorMap[error.code];
    throw errorGenerator ? errorGenerator() : error;
  }
}
