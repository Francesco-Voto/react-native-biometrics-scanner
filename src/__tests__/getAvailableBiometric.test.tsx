import { NoEnrollError, UnknownBiometricError, UnsupportedBiometricError } from '../errors';

describe('Given a function to check if biometric is active', () => {
    describe('when the user is not enrolled', () => {
        beforeEach( () => {
            jest.doMock('../NativeBiometricsScanner', () => {
                return {
                    __esModule: true,
                    default: {
                        getAvailableBiometric: jest.fn().mockReturnValue(Promise.reject({ code: 99 })),
                    }
                }
            })
        });

        afterEach(() => {
            jest.unmock('../NativeBiometricsScanner');
            jest.resetModules();
        });

        it('should throw a NoEnrollError', async () => {
            const { getAvailableBiometric } = require('../getAvailableBiometric');

            try {
                await getAvailableBiometric();
            }catch(error){
                expect(error).toBeInstanceOf(NoEnrollError)
            }

        });
    });

    describe('when the biometric is not supported', () => {
            beforeEach( () => {
                jest.doMock('../NativeBiometricsScanner', () => {
                    return {
                        __esModule: true,
                        default: {
                            getAvailableBiometric: jest.fn().mockReturnValue(Promise.reject({ code: 98 })),
                        }
                    }
                })
            });

            afterEach(() => {
                //jest.unmock('../NativeBiometricsScanner');
                jest.resetModules();
            });

            it('should throw a UnsupportedBiometricError', async () => {
                expect.assertions(1);
                const { getAvailableBiometric } = require('../getAvailableBiometric');

                try {
                    await getAvailableBiometric();
                }catch(error){
                    expect(error).toBeInstanceOf(UnsupportedBiometricError)
                }
            });
    });

    describe('when the status of biometric is unknown', () => {
        beforeEach(() => {
                jest.doMock('../NativeBiometricsScanner', () => {
                    const error: any = Error();
                    error.code = 97;
                    return {
                        __esModule: true,
                        default: {
                            getAvailableBiometric: jest.fn().mockReturnValue(Promise.reject(error)),
                        }
                    }
                })
        });

        afterEach(() => {
                //jest.unmock('../NativeBiometricsScanner');
                jest.resetModules();
        });

        it('should throw a UnknownBiometricError', async() => {
            const { getAvailableBiometric } = require('../getAvailableBiometric');
            await expect(getAvailableBiometric()).rejects.toBeInstanceOf(UnknownBiometricError);
        });
    });

    describe('if user is able to use biometric', () => {
        beforeEach( () => {
            jest.doMock('../NativeBiometricsScanner', () => ({
                __esModule: true,
                default: {
                    getAvailableBiometric: jest.fn().mockReturnValue(Promise.resolve('BiometricID')),
                }
            }));
        });

        afterEach(() => {
            jest.unmock('../NativeBiometricsScanner');
            jest.resetModules();
        })

        it('should return the type of biometric when it is active', async () => {
            const { getAvailableBiometric } = require('../getAvailableBiometric');
            const biometricType = await getAvailableBiometric();

            expect(biometricType).toBe('BiometricID');
        });
    });
});
