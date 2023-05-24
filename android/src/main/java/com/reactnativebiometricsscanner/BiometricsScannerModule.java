package com.reactnativebiometricsscanner;

import static androidx.biometric.BiometricManager.Authenticators.BIOMETRIC_STRONG;
import static androidx.biometric.BiometricManager.Authenticators.DEVICE_CREDENTIAL;

import android.os.Build;

import androidx.annotation.NonNull;
import androidx.biometric.BiometricManager;
import androidx.biometric.BiometricPrompt;
import androidx.fragment.app.FragmentActivity;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.module.annotations.ReactModule;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

@ReactModule(name = BiometricsScannerModule.NAME)
public class BiometricsScannerModule extends NativeBiometricsScannerSpec {
  public static final String NAME = "BiometricsScanner";
  private static final String BIOMETRIC = "BiometricID";

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
        promise.resolve(BIOMETRIC);
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

  private int getAllowedAuthenticators(boolean allowDeviceCredentials) {
    if (allowDeviceCredentials && Build.VERSION.SDK_INT > Build.VERSION_CODES.Q) {
      return BiometricManager.Authenticators.BIOMETRIC_STRONG | BiometricManager.Authenticators.DEVICE_CREDENTIAL;
    }
    return BiometricManager.Authenticators.BIOMETRIC_STRONG;
  }

  private BiometricPrompt.PromptInfo getPromptInfo(String promptMessage, String cancelButtonText, String description, String subtitle, boolean allowDeviceCredentials) {
    BiometricPrompt.PromptInfo.Builder builder = new BiometricPrompt.PromptInfo.Builder()
      .setTitle(promptMessage)
      .setDescription(description)
      .setSubtitle(subtitle);

    builder.setAllowedAuthenticators(getAllowedAuthenticators(allowDeviceCredentials));

    if (!allowDeviceCredentials || Build.VERSION.SDK_INT <= Build.VERSION_CODES.Q) {
      builder.setNegativeButtonText(cancelButtonText);
    }

    return builder.build();
  }

  @Override
  public void authenticate(ReadableMap prompt, final Promise promise) {
    UiThreadUtil.runOnUiThread(
      () -> {
        try {
          BiometricPrompt.AuthenticationCallback authCallback = new SimpleBiometricPromptCallback(promise);
          FragmentActivity fragmentActivity = (FragmentActivity) getCurrentActivity();
          Executor executor = Executors.newSingleThreadExecutor();

          if(fragmentActivity == null) {
            throw new NullPointerException();
          }
          BiometricPrompt biometricPrompt = new BiometricPrompt(fragmentActivity, executor, authCallback);
          boolean allowDeviceCredentials = prompt.getBoolean("allowDeviceCredentials");
          String promptMessage = prompt.getString("promptMessage");
          String cancelButtonText = prompt.getString("cancelButtonText");
          String descriptionText = prompt.getString("descriptionText");
          String subtitleText = prompt.getString("subtitleText");

          biometricPrompt.authenticate(getPromptInfo(promptMessage, cancelButtonText, descriptionText, subtitleText, allowDeviceCredentials));
        } catch (Exception e) {
          promise.reject(String.valueOf(BiometricError.ERROR_BIOMETRIC_UNKNOWN), "Biometric status is unknown");
        }
      });
  }
}
