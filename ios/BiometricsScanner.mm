#import "BiometricsScanner.h"
#import <LocalAuthentication/LocalAuthentication.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNBiometricsScannerSpec.h"
#endif

typedef NS_ENUM(NSUInteger, BiometricError) {
    ERROR_BIOMETRIC_UNKNOWN = 97,
    ERROR_BIOMETRIC_UNSUPPORTED = 98,
    ERROR_BIOMETRIC_NO_ENROLL = 99,
};

@implementation BiometricsScanner
RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(getAvailableBiometric,
                 withResolver:(RCTPromiseResolveBlock) resolve
                 withRejecter:(RCTPromiseRejectBlock) reject)
{
    LAContext *context = [[LAContext alloc] init];
    NSError *error;

    static NSString *const TOUCH_ID = @"TouchID";
    static NSString *const FACE_ID = @"FaceID";

    if([context canEvaluatePolicy: LAPolicyDeviceOwnerAuthenticationWithBiometrics error: &error]){
        
        if(context.biometryType == LABiometryTypeTouchID) {
            resolve(TOUCH_ID);
            return;
        }
        
        if(context.biometryType == LABiometryTypeTouchID) {
            resolve(FACE_ID);
            return;
        }
    }
    
    switch(error.code){
        case LAErrorBiometryNotAvailable:
        case LAErrorBiometryLockout:
        case LAErrorAuthenticationFailed:
            reject([NSString stringWithFormat:@"%li",  ERROR_BIOMETRIC_UNSUPPORTED], @"Biometric is not supported", error);
            break;
        case LAErrorPasscodeNotSet:
        case LAErrorBiometryNotEnrolled:
            reject([NSString stringWithFormat:@"%li",  ERROR_BIOMETRIC_NO_ENROLL], @"User must enroll", error);
            break;
        default:
            reject([NSString stringWithFormat:@"%li",  ERROR_BIOMETRIC_UNKNOWN], @"Biometric status is unknown", error);
            break;
    }

}


#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeBiometricsScannerSpecJSI>(params);
}
#endif

@end
