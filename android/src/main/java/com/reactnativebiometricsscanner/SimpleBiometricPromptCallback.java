package com.reactnativebiometricsscanner;

import androidx.annotation.NonNull;
import androidx.biometric.BiometricPrompt;

import com.facebook.react.bridge.Promise;

public class SimpleBiometricPromptCallback extends BiometricPrompt.AuthenticationCallback{
  private final Promise promise;

  public SimpleBiometricPromptCallback(Promise promise) {
    super();
    this.promise = promise;
  }

  @Override
  public void onAuthenticationSucceeded(@NonNull BiometricPrompt.AuthenticationResult result) {
    if(result.getAuthenticationType() == BiometricPrompt.AUTHENTICATION_RESULT_TYPE_DEVICE_CREDENTIAL) {
      promise.reject(String.valueOf(BiometricError.ERROR_BIOMETRIC_FALLBACK), "Fallback");
      return;
    }
    promise.resolve(null);
  }

  @Override
  public void onAuthenticationFailed() {
    promise.reject(String.valueOf(BiometricError.ERROR_BIOMETRIC_AUTHENTICATION_ERROR), "Biometric authentication fails");
  }

  @Override
  public void onAuthenticationError(int errorCode, @NonNull CharSequence errString) {
    switch(errorCode){
      case BiometricPrompt.ERROR_NEGATIVE_BUTTON:
      case BiometricPrompt.ERROR_USER_CANCELED:
        promise.reject(String.valueOf(BiometricError.ERROR_BIOMETRIC_USER_CANCEL), "User cancels");
        break;
      case BiometricPrompt.ERROR_LOCKOUT:
        promise.reject(String.valueOf(BiometricError.ERROR_BIOMETRIC_LOCK_OUT), "User is locked out");
        break;
      case BiometricPrompt.ERROR_HW_UNAVAILABLE:
      case BiometricPrompt.ERROR_HW_NOT_PRESENT:
      case BiometricPrompt.ERROR_CANCELED:
      case BiometricPrompt.ERROR_UNABLE_TO_PROCESS:
        promise.reject(String.valueOf(BiometricError.ERROR_BIOMETRIC_UNSUPPORTED), "Biometric is not supported");
        break;
      case BiometricPrompt.ERROR_NO_DEVICE_CREDENTIAL:
        promise.reject(String.valueOf(BiometricError.ERROR_BIOMETRIC_PASSCODE_NOT_SET), "Passcode not set");
        break;
      case BiometricPrompt.ERROR_NO_BIOMETRICS:
        promise.reject(String.valueOf(BiometricError.ERROR_BIOMETRIC_NO_ENROLL), "User must enroll");
        break;
      default:
        promise.reject(String.valueOf(BiometricError.ERROR_BIOMETRIC_UNKNOWN), "Biometric status is unknown");
        break;
    }
  }
}
