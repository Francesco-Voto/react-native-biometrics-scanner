package com.reactnativebiometricsscanner;

import static androidx.biometric.BiometricManager.Authenticators.BIOMETRIC_STRONG;
import static androidx.biometric.BiometricManager.Authenticators.DEVICE_CREDENTIAL;
import androidx.annotation.NonNull;
import androidx.biometric.BiometricManager;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = BiometricsScannerModule.NAME)
public class BiometricsScannerModule extends NativeBiometricsScannerSpec {
    public static final String NAME = "BiometricsScanner";
    private final BiometricManager mBiometricManager;

    public BiometricsScannerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mBiometricManager = BiometricManager.from(reactContext);
    }

    @Override
    @NonNull
    public String getName() {
      return NAME;
    }

    @Override
    public void getAvailableBiometric(Promise promise) {
        int result = mBiometricManager.canAuthenticate(BIOMETRIC_STRONG | DEVICE_CREDENTIAL);
        switch (result) {
            case BiometricManager.BIOMETRIC_SUCCESS:
              promise.resolve("BiometricID");
              break;
            case BiometricManager.BIOMETRIC_ERROR_HW_UNAVAILABLE:
            case BiometricManager.BIOMETRIC_ERROR_NO_HARDWARE:
            case BiometricManager.BIOMETRIC_ERROR_UNSUPPORTED:
            case BiometricManager.BIOMETRIC_ERROR_SECURITY_UPDATE_REQUIRED:
                promise.reject(String.valueOf(BiometricError.ERROR_BIOMETRIC_UNSUPPORTED), "Biometric is not supported");
                break;
            case BiometricManager.BIOMETRIC_ERROR_NONE_ENROLLED:
                promise.reject(String.valueOf(BiometricError.ERROR_BIOMETRIC_NO_ENROLL), "User must enroll");
                break;
            case BiometricManager.BIOMETRIC_STATUS_UNKNOWN:
            default:
                promise.reject(String.valueOf(BiometricError.ERROR_BIOMETRIC_UNKNOWN), "Biometric status is unknown");
                break;
        }
    }

    @Override
    public void authenticate(Promise promise) {

    }

}
