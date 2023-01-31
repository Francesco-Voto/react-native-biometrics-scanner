package com.reactnativebiometricsscanner;
import androidx.annotation.IntDef;
import java.lang.annotation.Retention;

import static java.lang.annotation.RetentionPolicy.SOURCE;

@Retention(SOURCE)
@IntDef({
  BiometricError.ERROR_BIOMETRIC_UNKNOWN,
  BiometricError.ERROR_BIOMETRIC_UNSUPPORTED,
  BiometricError.ERROR_BIOMETRIC_NO_ENROLL,
})

public @interface BiometricError {
  int ERROR_BIOMETRIC_UNKNOWN = 97;
  int ERROR_BIOMETRIC_UNSUPPORTED = 98;
  int ERROR_BIOMETRIC_NO_ENROLL = 99;
  int ERROR_BIOMETRIC_AUTHENTICATION_ERROR = 101;
  int ERROR_BIOMETRIC_USER_CANCEL = 102;
  int ERROR_BIOMETRIC_FALLBACK = 103;
  int ERROR_BIOMETRIC_SYSTEM_CANCEL = 104;
  int ERROR_BIOMETRIC_PASSCODE_NOT_SET = 105;
  int ERROR_BIOMETRIC_LOCK_OUT = 106;
}

