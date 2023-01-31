import BiometricsScanner from './NativeBiometricsScanner';
import { ErrorMap } from './errors';

/**
 *
 * @return {Promise<void>}
 *
 * @throws {@link BiometricUnknownError} when biometric status is unknown
 * @throws {@link BiometricUnsupportedError} when biometric is not supported
 * @throws {@link BiometricNoEnrollError} when user must enroll to use biometric
 * @throws {@link BiometricAuthenitcationError} when an authentication error has occurred
 * @throws {@link BiometricUserCancelError} when user cancels authentication
 * @throws {@link BiometricFallbackError} when user tap fallback button
 * @throws {@link BiometricSystemCancelError} when system cancels authenitcation
 * @throws {@link BiometricPasscodeNotSetError} when passcode is not set
 * @throws {@link BiometricLockOutError} when user is locked out
 */
export async function authenticate(): Promise<void> {
  try {
    await BiometricsScanner.authenticate();
  } catch (error: any) {
    const errorGenerator = ErrorMap[error.code];
    throw errorGenerator ? errorGenerator() : error;
  }
}
