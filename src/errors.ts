export class BiometricUnknownError extends Error {}

export class BiometricUnsupportedError extends Error {}

export class BiometricNoEnrollError extends Error {}

export class BiometricAuthenitcationError extends Error {}

export class BiometricUserCancelError extends Error {}

export class BiometricSystemCancelError extends Error {}

export class BiometricFallbackError extends Error {}

export class BiometricPasscodeNotSetError extends Error {}

export class BiometricLockOutError extends Error {}

export const ErrorMap: Record<string, () => Error> = {
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
