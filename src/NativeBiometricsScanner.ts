import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type { BiometricType } from './types';

export interface Spec extends TurboModule {
  getAvailableBiometric(
    allowDeviceCredentials: boolean
  ): Promise<BiometricType>;
  authenticate(prompt: {
    promptMessage: string;
    fallbackPromptMessage?: string;
    allowDeviceCredentials?: boolean;
    cancelButtonText?: string;
    descriptionText?: string;
    subtitleText?: string;
  }): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('BiometricsScanner');
