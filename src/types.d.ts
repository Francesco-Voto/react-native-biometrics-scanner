export type BiometricType = 'TouchID' | 'FaceID' | 'BiometricID';

export type SimplePromptOptions = {
  promptMessage: string;
  fallbackPromptMessage?: string;
  allowDeviceCredentials?: boolean;
  cancelButtonText?: string;
  descriptionText?: string;
  subtitleText?: string;
};
