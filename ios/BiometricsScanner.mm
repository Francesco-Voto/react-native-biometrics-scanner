
#import "BiometricsScanner.h"



@implementation BiometricsScanner
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(getAvailableBiometric:(BOOL)allowDeviceCredentials resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    LAContext *context = [[LAContext alloc] init];
    NSError *error;
    
    static NSString *const TOUCH_ID = @"TouchID";
    static NSString *const FACE_ID = @"FaceID";
    
    
    if([context canEvaluatePolicy: allowDeviceCredentials ? LAPolicyDeviceOwnerAuthentication : LAPolicyDeviceOwnerAuthenticationWithBiometrics error: &error]){
        
        if(context.biometryType == LABiometryTypeTouchID) {
            resolve(TOUCH_ID);
            return;
        }
        
        if(context.biometryType == LABiometryTypeFaceID) {
            resolve(FACE_ID);
            return;
        }
        
        if(context.biometryType == LABiometryTypeNone){
            reject([NSString stringWithFormat:@"%i",  99], @"Biometric is not supported", error);
            return;
        }
    }
    
    switch(error.code){
        case LAErrorBiometryNotAvailable:
        case LAErrorBiometryLockout:
        case LAErrorAuthenticationFailed:
            reject([NSString stringWithFormat:@"%i",  98], @"Biometric is not supported", error);
            break;
        case LAErrorPasscodeNotSet:
        case LAErrorBiometryNotEnrolled:
            reject([NSString stringWithFormat:@"%i",  99], @"User must enroll", error);
            break;
        default:
            reject([NSString stringWithFormat:@"%i",  97], @"Biometric status is unknown", error);
            break;
    }
}


RCT_EXPORT_METHOD(
 authenticate:
    #ifdef RCT_NEW_ARCH_ENABLED
   (JS::NativeBiometricsScanner::SpecAuthenticatePrompt &)
    #else
   (NSDictionary*)
    #endif
    prompt
    resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {


    LAContext *context = [[LAContext alloc] init];
    NSError *error;
    NSString* promptMessage = nil;
    NSString* fallbackPromptMessage = nil;
    BOOL allowDeviceCredentials = false;
    #ifdef RCT_NEW_ARCH_ENABLED
    promptMessage = prompt.promptMessage();
    fallbackPromptMessage= prompt.fallbackPromptMessage();
    allowDeviceCredentials = prompt.allowDeviceCredentials();
    #else
    promptMessage= [prompt objectForKey:@"promptMessage"];
    fallbackPromptMessage= [prompt objectForKey:@"fallbackPromptMessage"];
    allowDeviceCredentials= [prompt objectForKey:@"allowDeviceCredentials"];
    #endif
    
    LAPolicy policy = LAPolicyDeviceOwnerAuthenticationWithBiometrics;
  
    if(allowDeviceCredentials) {
       policy = LAPolicyDeviceOwnerAuthentication;
    }

    context.localizedFallbackTitle = fallbackPromptMessage;
    
    if([context canEvaluatePolicy: policy error:&error]){
        [context evaluatePolicy: policy localizedReason: promptMessage reply:^(BOOL success, NSError *authError){

            if (success) {
                resolve([NSNull null]);
                return;
            }
            if(authError) {
                switch(authError.code){
                    case LAErrorAuthenticationFailed:
                        reject([NSString stringWithFormat:@"%i",  101], @"Biometric authentication fails", error);
                        break;
                    case LAErrorUserCancel:
                        reject([NSString stringWithFormat:@"%i",  102], @"User cancels", error);
                        break;
                    case LAErrorUserFallback:
                        reject([NSString stringWithFormat:@"%i",  103], @"Fallback", error);
                        break;
                        
                    case LAErrorSystemCancel:
                        reject([NSString stringWithFormat:@"%i",  104], @"System cancels", error);
                        break;
                        
                    case LAErrorPasscodeNotSet:
                        reject([NSString stringWithFormat:@"%i",  105], @"Passcode not set", error);
                        break;
                        
                    case LAErrorBiometryNotAvailable:
                        reject([NSString stringWithFormat:@"%i",  98], @"Biometric is not supported", error);
                        break;
                        
                    case LAErrorBiometryNotEnrolled:
                        reject([NSString stringWithFormat:@"%i",  99], @"User must enroll", error);
                        break;
                        
                    case LAErrorBiometryLockout:
                        reject([NSString stringWithFormat:@"%i",  106], @"User is locked out", error);
                        break;
                        
                    default:
                        reject([NSString stringWithFormat:@"%i",  97], @"Biometric status is unknown", error);
                        break;
                }
            }
        }];
        
    } else {
        reject([NSString stringWithFormat:@"%i",  97], @"Biometric status is unknown", error);
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
