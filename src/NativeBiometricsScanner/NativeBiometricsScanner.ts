import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getAvailableBiometric(): Promise<BiometricType>;
  authenticate(): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('BiometricsScanner');
