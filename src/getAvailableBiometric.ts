import BiometricsScanner from './NativeBiometricsScanner';
import {
  BiometricAuthenitcationError,
  BiometricUserCancelError,
  BiometricFallbackError,
  BiometricNoEnrollError,
  BiometricUnknownError,
  BiometricUnsupportedError,
  BiometricPasscodeNotSetError,
  BiometricSystemCancelError,
  BiometricLockOutError,
} from './errors';

const ErrorMap: Record<string, () => Error> = {
  106: () => new BiometricLockOutError(),
  105: () => new BiometricPasscodeNotSetError(),
  104: () => new BiometricSystemCancelError(),
  103: () => new BiometricFallbackError(),
  102: () => new BiometricUserCancelError(),
  101: () => new BiometricAuthenitcationError(),
  99: () => new BiometricNoEnrollError(),
  98: () => new BiometricUnsupportedError(),
  97: () => new BiometricUnknownError(),
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
  } catch (error: any) {
    const errorGenerator = ErrorMap[error.code];
    throw errorGenerator ? errorGenerator() : error;
  }
}

/**
 *
 * @return {Promise<void>}
 *
 * @throws {@link UnknownBiometricError} when biometric status is unknown
 * @throws {@link UnsupportedBiometricError} when biometric is not supported
 * @throws {@link NoEnrollError} when user must enroll to use biometric
 * @throws {@link BiometricAuthenitcationError} when an authentication error has occurred
 * @throws {@link BiometricUserCancelError} when user cancels authentication
 * @throws {@link BiometricFallbackError} when user tap fallback button
 * @throws {@link BiometricSystemCancelError} when system cancels authenitcation
 * @throws {@link BiometricPasscodeNotSetError} when passcode is not set
 * @throws {@link BiometricLockOutError} when user is locked out
 */
export async function autheticate(): Promise<void> {
  try {
    await BiometricsScanner.authenticate();
  } catch (error: any) {
    const errorGenerator = ErrorMap[error.code];
    throw errorGenerator ? errorGenerator() : error;
  }
}
