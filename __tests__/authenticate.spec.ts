import {
  BiometricAuthenticationError,
  BiometricFallbackError,
  BiometricLockOutError,
  BiometricNoEnrollError,
  BiometricPasscodeNotSetError,
  BiometricSystemCancelError,
  BiometricUnknownError,
  BiometricUnsupportedError,
  BiometricUserCancelError,
} from '../src/errors';

describe('Given a function to authenticate using biometric', () => {
  beforeAll(() => {
    jest.doMock('../src/NativeBiometricsScanner', () => {
      return {
        __esModule: true,
        default: {
          authenticate: jest.fn(),
        },
      };
    });
  });

  afterAll(() => {
    jest.unmock('../src/NativeBiometricsScanner');
    jest.resetModules();
  });

  describe('if user is able to authenticate', () => {
    let spyFn: jest.SpyInstance;

    beforeEach(() => {
      const NativeBiometricsScanner =
        require('../src/NativeBiometricsScanner').default;
      spyFn = jest
        .spyOn(NativeBiometricsScanner, 'authenticate')
        .mockReturnValue(null);
    });

    afterEach(() => {
      spyFn.mockClear();
    });

    it('should return whithout errors', async () => {
      const { authenticate } = require('../src/authenticate');

      try {
        expect(await authenticate()).toBeNull();
      } catch {}
    });
  });

  describe('when the user is not enrolled', () => {
    let spyFn: jest.SpyInstance;

    beforeEach(() => {
      const NativeBiometricsScanner =
        require('../src/NativeBiometricsScanner').default;
      spyFn = jest
        .spyOn(NativeBiometricsScanner, 'authenticate')
        .mockRejectedValue({ code: 99 });
    });

    afterEach(() => {
      spyFn.mockClear();
    });

    it('should throw a BiometricNoEnrollError', async () => {
      const { authenticate } = require('../src/authenticate');

      expect.assertions(1);
      try {
        await authenticate();
      } catch (error) {
        expect(error).toBeInstanceOf(BiometricNoEnrollError);
      }
    });
  });

  describe('when the biometric is not supported', () => {
    let spyFn: jest.SpyInstance;

    beforeEach(() => {
      const NativeBiometricsScanner =
        require('../src/NativeBiometricsScanner').default;
      spyFn = jest
        .spyOn(NativeBiometricsScanner, 'authenticate')
        .mockRejectedValue({ code: 98 });
    });

    afterEach(() => {
      spyFn.mockClear();
    });

    it('should throw a BiometricUnsupportedError', async () => {
      const { authenticate } = require('../src/authenticate');

      expect.assertions(1);
      try {
        await authenticate();
      } catch (error) {
        expect(error).toBeInstanceOf(BiometricUnsupportedError);
      }
    });
  });

  describe('when the status of biometric is unknown', () => {
    let spyFn: jest.SpyInstance;

    beforeEach(() => {
      const NativeBiometricsScanner =
        require('../src/NativeBiometricsScanner').default;
      spyFn = jest
        .spyOn(NativeBiometricsScanner, 'authenticate')
        .mockRejectedValue({ code: 97 });
    });

    afterEach(() => {
      spyFn.mockClear();
    });

    it('should throw a BiometricUnknownError', async () => {
      const { authenticate } = require('../src/authenticate');

      expect.assertions(1);
      try {
        await authenticate();
      } catch (error) {
        expect(error).toBeInstanceOf(BiometricUnknownError);
      }
    });
  });

  describe('when the authentication fails', () => {
    let spyFn: jest.SpyInstance;

    beforeEach(() => {
      const NativeBiometricsScanner =
        require('../src/NativeBiometricsScanner').default;
      spyFn = jest
        .spyOn(NativeBiometricsScanner, 'authenticate')
        .mockRejectedValue({ code: 101 });
    });

    afterEach(() => {
      spyFn.mockClear();
    });

    it('should throw a BiometricAuthenticationError', async () => {
      const { authenticate } = require('../src/authenticate');

      expect.assertions(1);
      try {
        await authenticate();
      } catch (error) {
        expect(error).toBeInstanceOf(BiometricAuthenticationError);
      }
    });
  });

  describe('when the user cancels the authentication', () => {
    let spyFn: jest.SpyInstance;

    beforeEach(() => {
      const NativeBiometricsScanner =
        require('../src/NativeBiometricsScanner').default;
      spyFn = jest
        .spyOn(NativeBiometricsScanner, 'authenticate')
        .mockRejectedValue({ code: 102 });
    });

    afterEach(() => {
      spyFn.mockClear();
    });

    it('should throw a BiometricUserCancelError', async () => {
      const { authenticate } = require('../src/authenticate');

      expect.assertions(1);
      try {
        await authenticate();
      } catch (error) {
        expect(error).toBeInstanceOf(BiometricUserCancelError);
      }
    });
  });

  describe('when the fallback is used', () => {
    let spyFn: jest.SpyInstance;

    beforeEach(() => {
      const NativeBiometricsScanner =
        require('../src/NativeBiometricsScanner').default;
      spyFn = jest
        .spyOn(NativeBiometricsScanner, 'authenticate')
        .mockRejectedValue({ code: 103 });
    });

    afterEach(() => {
      spyFn.mockClear();
    });

    it('should throw a BiometricFallbackError', async () => {
      const { authenticate } = require('../src/authenticate');

      expect.assertions(1);
      try {
        await authenticate();
      } catch (error) {
        expect(error).toBeInstanceOf(BiometricFallbackError);
      }
    });
  });

  describe('when the system cncels the authentication', () => {
    let spyFn: jest.SpyInstance;

    beforeEach(() => {
      const NativeBiometricsScanner =
        require('../src/NativeBiometricsScanner').default;
      spyFn = jest
        .spyOn(NativeBiometricsScanner, 'authenticate')
        .mockRejectedValue({ code: 104 });
    });

    afterEach(() => {
      spyFn.mockClear();
    });

    it('should throw a BiometricSystemCancelError', async () => {
      const { authenticate } = require('../src/authenticate');

      expect.assertions(1);
      try {
        await authenticate();
      } catch (error) {
        expect(error).toBeInstanceOf(BiometricSystemCancelError);
      }
    });
  });

  describe('when the passcode is not set', () => {
    let spyFn: jest.SpyInstance;

    beforeEach(() => {
      const NativeBiometricsScanner =
        require('../src/NativeBiometricsScanner').default;
      spyFn = jest
        .spyOn(NativeBiometricsScanner, 'authenticate')
        .mockRejectedValue({ code: 105 });
    });

    afterEach(() => {
      spyFn.mockClear();
    });

    it('should throw a BiometricPasscodeNotSetError', async () => {
      const { authenticate } = require('../src/authenticate');

      expect.assertions(1);
      try {
        await authenticate();
      } catch (error) {
        expect(error).toBeInstanceOf(BiometricPasscodeNotSetError);
      }
    });
  });

  describe('when device is locked', () => {
    let spyFn: jest.SpyInstance;

    beforeEach(() => {
      const NativeBiometricsScanner =
        require('../src/NativeBiometricsScanner').default;
      spyFn = jest
        .spyOn(NativeBiometricsScanner, 'authenticate')
        .mockRejectedValue({ code: 106 });
    });

    afterEach(() => {
      spyFn.mockClear();
    });

    it('should throw a BiometricLockOutError', async () => {
      const { authenticate } = require('../src/authenticate');

      expect.assertions(1);
      try {
        await authenticate();
      } catch (error) {
        expect(error).toBeInstanceOf(BiometricLockOutError);
      }
    });
  });
});
