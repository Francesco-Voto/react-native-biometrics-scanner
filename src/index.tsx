const BiometricsScanner = require('./NativeBiometricsScanner').default

export function multiply(a: number, b: number): number {
  return BiometricsScanner.multiply(a, b);
}
