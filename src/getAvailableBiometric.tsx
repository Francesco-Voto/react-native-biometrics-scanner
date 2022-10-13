import BiometricsScanner from './NativeBiometricsScanner';
import { NoEnrollError, UnknownBiometricError, UnsupportedBiometricError } from './errors';


const ErrorMap: Record<string, () => Error> = {
  99: () => new NoEnrollError(),
  98: () => new UnsupportedBiometricError(),
  97: () => new UnknownBiometricError(),
};

/**
 * 
 * @return {Promise<BiometricType>} of the hardware
 * 
 * @throws {@link UnknownBiometricError} when biometric status is unknown
 * @throws {@link UnsupportedBiometricError} when biometric is not supported
 * @throws {@link NoEnrollError} when user must enroll to use biometric 
 */
export async function getAvailableBiometric(): Promise<BiometricType> {
  try {
      const biometricType = await BiometricsScanner.getAvailableBiometric();
      return biometricType;
  } catch(error: any) {
      const errorGenerator = ErrorMap[error.code]
      throw (errorGenerator ? errorGenerator() : error);
  }
}