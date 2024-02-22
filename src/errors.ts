export class BiometricUnknownError extends Error {
  constructor() {
    super('Biometric status is unknown');
    this.name = 'BiometricUnknownError';
  }
}

export class BiometricUnsupportedError extends Error {
  constructor() {
    super('Biometric type is not supported');
    this.name = 'BiometricUnsupportedError';
  }
}

export class BiometricNoEnrollError extends Error {
  constructor() {
    super('User is not enrolled to use biometrics');
    this.name = 'BiometricNoEnrollError';
  }
}

export class BiometricAuthenticationError extends Error {
  constructor() {
    super('User failed to authenticate with biometrics');
    this.name = 'BiometricAuthenticationError';
  }
}

export class BiometricUserCancelError extends Error {
  constructor() {
    super('User cancelled biometric authentication');
    this.name = 'BiometricUserCancelError';
  }
}

export class BiometricSystemCancelError extends Error {
  constructor() {
    super('System cancelled biometric authentication');
    this.name = 'BiometricSystemCancelError';
  }
}

export class BiometricFallbackError extends Error {
  constructor() {
    super('Fallback authentication method failed');
    this.name = 'BiometricFallbackError';
  }
}

export class BiometricPasscodeNotSetError extends Error {
  constructor() {
    super('Passcode not set');
    this.name = 'BiometricPasscodeNotSetError';
  }
}

export class BiometricLockOutError extends Error {}

export const ErrorMap: Record<string, () => Error> = {
  106: () => new BiometricLockOutError(),
  105: () => new BiometricPasscodeNotSetError(),
  104: () => new BiometricSystemCancelError(),
  103: () => new BiometricFallbackError(),
  102: () => new BiometricUserCancelError(),
  101: () => new BiometricAuthenticationError(),
  99: () => new BiometricNoEnrollError(),
  98: () => new BiometricUnsupportedError(),
  97: () => new BiometricUnknownError(),
};
