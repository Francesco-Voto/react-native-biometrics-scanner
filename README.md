React Native Library to handle the biometric autentication.
The library is developed with Turbomodules, for this reason to make it work is necessary use RN 0.68 or higher

## Installation
```sh
npm install react-native-biometrics-scanner
```
or
```sh
yarn add react-native-biometrics-scanner
```

### iOS
In your Info.plist:
```
<key>NSFaceIDUsageDescription</key>
<string>{Add here a message}</string>
```

### Android
In order to make it work you need to add the necessary Permissions in your AndroidManifest.xml:

[API level 28+](https://developer.android.com/reference/android/Manifest.permission#USE_BIOMETRIC)
```
<uses-permission android:name="android.permission.USE_BIOMETRIC" />
```

[API level 23-28](https://developer.android.com/reference/android/Manifest.permission#USE_FINGERPRINT)
```
<uses-permission android:name="android.permission.USE_FINGERPRINT" />
```

## Usage

### • getAvailableBiometric

```ts
import { getAvailableBiometric } from "react-native-biometrics-scanner";

// ...

const result = await getAvailableBiometric();
```

This method return the type of biometric present on the device:

- iOS: `TouchID` or `FaceID`
- Android: `TouchID` or `FaceID` or `IrisID` or if it is not possible to retrieve any info`BiometricID`

and throws:

- `UnknownBiometricError` when the status of biometric is unknown
- `UnsupportedBiometricError` when the biometric is not supported by the device
- `NoEnrollError` when user needs to enroll in order to use biometric

### • authenticate

```ts
import { authenticate } from "react-native-biometrics-scanner";

// ...

await authenticate(prompt);
```
It requires an object to configure the prompt message:
- `promptMessage`: the message to show
- `allowDeviceCredentials`: if allow device credentials (Android only)
- `cancelButtonText`: the text for cancel button (Android only)(optional)
- `descriptionText`: the text for description (Android only)(optional)
- `subtitleText`: the text for subtitle (Android only)(optional)
- `fallbackPromptMessage`: a text as fallback (iOS only)(optional)


This method resolve a promise if the authentication is succesful and throws:

- `BiometricUnknownError` when the status of biometric is unknown
- `BiometricUnsupportedError` when the biometric is not supported by the device
- `BiometricNoEnrollError` when user needs to enroll in order to use biometric
- `BiometricAuthenitcationError` when the authentication fails
- `BiometricUserCancelError` when user cancels the authentication
- `BiometricPasscodeNotSetError` when a passcode is not set
- `BiometricLockOutError` when the device is locked
- `BiometricFallbackError` when the biometric authentication fails and the fallback is used
- `BiometricPasscodeNotSetError` when passcode is not set
- `BiometricSystemCancelError` (iOS only) when the system cancels the authentication

## Contributing
See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License
MIT