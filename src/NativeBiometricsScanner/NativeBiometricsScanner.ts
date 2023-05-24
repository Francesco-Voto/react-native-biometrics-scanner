import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type {BiometricType} from '../types'

export interface Spec extends TurboModule {
  getAvailableBiometric(): Promise<BiometricType>;
  authenticate(reason: string): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('BiometricsScanner');
