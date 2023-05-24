#import "BiometricsScanner.h"
#import <LocalAuthentication/LocalAuthentication.h>
#import <React/RCTConvert.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNBiometricsScannerSpec.h"
#endif

typedef NS_ENUM(NSUInteger, BiometricError) {
    ERROR_BIOMETRIC_UNKNOWN = 97,
    ERROR_BIOMETRIC_UNSUPPORTED = 98,
    ERROR_BIOMETRIC_NO_ENROLL = 99,
    ERROR_BIOMETRIC_AUTHENTICATION_ERROR = 101,
    ERROR_BIOMETRIC_USER_CANCEL = 102,
    ERROR_BIOMETRIC_FALLBACK = 103,
    ERROR_BIOMETRIC_SYSTEM_CANCEL = 104,
    ERROR_BIOMETRIC_PASSCODE_NOT_SET = 105,
    ERROR_BIOMETRIC_LOCK_OUT = 106,
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
        
        if(context.biometryType == LABiometryTypeFaceID) {
            resolve(FACE_ID);
            return;
        }
        
        if(context.biometryType == LABiometryTypeNone){
            reject([NSString stringWithFormat:@"%li",  ERROR_BIOMETRIC_UNSUPPORTED], @"Biometric is not supported", error);
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

RCT_REMAP_METHOD(authenticate, withParams: (NSDictionary*) params
                 withAuthenticateResolver:(RCTPromiseResolveBlock) resolve
                 withAuthenticateRejecter:(RCTPromiseRejectBlock) reject)
{
    LAContext *context = [[LAContext alloc] init];
    NSError *error;
    
    NSString *promptMessage = [RCTConvert NSString:params[@"promptMessage"]];
    NSString *fallbackPromptMessage = [RCTConvert NSString:params[@"fallbackPromptMessage"]];
    BOOL allowDeviceCredentials = [RCTConvert BOOL:params[@"allowDeviceCredentials"]];
    
    context.localizedFallbackTitle = fallbackPromptMessage;
    
    if([context canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:&error]){
        [context evaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics localizedReason:promptMessage reply:^(BOOL success, NSError *authError){

            if (success) {
                resolve([NSNull null]);
                return;
            }
            if(authError) {
                switch(authError.code){
                    case LAErrorAuthenticationFailed:
                        reject([NSString stringWithFormat:@"%li",  ERROR_BIOMETRIC_AUTHENTICATION_ERROR], @"Biometric authentication fails", error);
                        break;
                    case LAErrorUserCancel:
                        reject([NSString stringWithFormat:@"%li",  ERROR_BIOMETRIC_USER_CANCEL], @"User cancels", error);
                        break;
                    case LAErrorUserFallback:
                        reject([NSString stringWithFormat:@"%li",  ERROR_BIOMETRIC_FALLBACK], @"Fallback", error);
                        break;
                        
                    case LAErrorSystemCancel:
                        reject([NSString stringWithFormat:@"%li",  ERROR_BIOMETRIC_SYSTEM_CANCEL], @"System cancels", error);
                        break;
                        
                    case LAErrorPasscodeNotSet:
                        reject([NSString stringWithFormat:@"%li",  ERROR_BIOMETRIC_PASSCODE_NOT_SET], @"Passcode not set", error);
                        break;
                        
                    case LAErrorBiometryNotAvailable:
                        reject([NSString stringWithFormat:@"%li",  ERROR_BIOMETRIC_UNSUPPORTED], @"Biometric is not supported", error);
                        break;
                        
                    case LAErrorBiometryNotEnrolled:
                        reject([NSString stringWithFormat:@"%li",  ERROR_BIOMETRIC_NO_ENROLL], @"User must enroll", error);
                        break;
                        
                    case LAErrorBiometryLockout:
                        reject([NSString stringWithFormat:@"%li",  ERROR_BIOMETRIC_LOCK_OUT], @"User is locked out", error);
                        break;
                        
                    default:
                        reject([NSString stringWithFormat:@"%li",  ERROR_BIOMETRIC_UNKNOWN], @"Biometric status is unknown", error);
                        break;
                }
            }
        }];
        
    } else {
        reject([NSString stringWithFormat:@"%li",  ERROR_BIOMETRIC_UNKNOWN], @"Biometric status is unknown", error);
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
