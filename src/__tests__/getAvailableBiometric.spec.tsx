import {
  NoEnrollError,
  UnknownBiometricError,
  UnsupportedBiometricError,
} from '../errors';

describe('Given a function to check if biometric is active', () => {
  beforeAll(() => {
    jest.doMock('../NativeBiometricsScanner', () => {
      return {
        __esModule: true,
        default: {
          getAvailableBiometric: jest.fn(),
        },
      };
    });
  });

  afterAll(() => {
    jest.unmock('../NativeBiometricsScanner');
    jest.resetModules();
  });

  describe('if user is able to use biometric', () => {
    let spyFn: jest.SpyInstance;

    beforeEach(() => {
      const NativeBiometricsScanner =
        require('../NativeBiometricsScanner').default;
      spyFn = jest
        .spyOn(NativeBiometricsScanner, 'getAvailableBiometric')
        .mockReturnValue('BiometricID');
    });

    afterEach(() => {
      spyFn.mockClear();
    });

    it('should return the type of biometric when it is active', async () => {
      const { getAvailableBiometric } = require('../getAvailableBiometric');
      const biometricType = await getAvailableBiometric();

      expect(biometricType).toBe('BiometricID');
    });
  });

  describe('when the user is not enrolled', () => {
    let spyFn: jest.SpyInstance;

    beforeEach(() => {
      const NativeBiometricsScanner =
        require('../NativeBiometricsScanner').default;
      spyFn = jest
        .spyOn(NativeBiometricsScanner, 'getAvailableBiometric')
        .mockRejectedValue({ code: 99 });
    });

    afterEach(() => {
      spyFn.mockClear();
    });

    it('should throw a NoEnrollError', async () => {
      const { getAvailableBiometric } = require('../getAvailableBiometric');

      expect.assertions(1);
      try {
        await getAvailableBiometric();
      } catch (error) {
        expect(error).toBeInstanceOf(NoEnrollError);
      }
    });
  });

  describe('when the biometric is not supported', () => {
    let spyFn: jest.SpyInstance;

    beforeEach(() => {
      const NativeBiometricsScanner =
        require('../NativeBiometricsScanner').default;
      spyFn = jest
        .spyOn(NativeBiometricsScanner, 'getAvailableBiometric')
        .mockRejectedValue({ code: 98 });
    });

    afterEach(() => {
      spyFn.mockClear();
    });

    it('should throw a UnsupportedBiometricError', async () => {
      const { getAvailableBiometric } = require('../getAvailableBiometric');

      expect.assertions(1);
      try {
        await getAvailableBiometric();
      } catch (error) {
        expect(error).toBeInstanceOf(UnsupportedBiometricError);
      }
    });
  });

  describe('when the status of biometric is unknown', () => {
    let spyFn: jest.SpyInstance;

    beforeEach(() => {
      const NativeBiometricsScanner =
        require('../NativeBiometricsScanner').default;
      spyFn = jest
        .spyOn(NativeBiometricsScanner, 'getAvailableBiometric')
        .mockRejectedValue({ code: 97 });
    });

    afterEach(() => {
      spyFn.mockClear();
    });

    it('should throw a UnknownBiometricError', async () => {
      const { getAvailableBiometric } = require('../getAvailableBiometric');

      expect.assertions(1);
      try {
        await getAvailableBiometric();
      } catch (error) {
        expect(error).toBeInstanceOf(UnknownBiometricError);
      }
    });
  });
});
