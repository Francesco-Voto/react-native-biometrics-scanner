
#import <React/RCTBridgeModule.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <BiometricsScannerSpec/BiometricsScannerSpec.h>
#endif

#import <LocalAuthentication/LocalAuthentication.h>

NS_ASSUME_NONNULL_BEGIN

@interface BiometricsScanner : NSObject <
#ifdef RCT_NEW_ARCH_ENABLED
NativeBiometricsScannerSpec
#else
RCTBridgeModule
#endif

>

@end

NS_ASSUME_NONNULL_END
