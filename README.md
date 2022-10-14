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
In order to make it run on iOS:
Go to `Build Phase` ➜ `Link Binary With Libraries` ➜ add `LocalAuthentication.framework`

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
- Android: `BiometricID`

and throws:

- `UnknownBiometricError` when the status of biometric is unknown
- `UnsupportedBiometricError` when the biometric is not supported by the device
- `NoEnrollError` when user needs to enroll in order to use biometric

## Contributing
See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License
MIT