import { jest } from '@jest/globals';
import getRandomNumber from './randomNumber.js';

describe('getRandomNumber', () => {
  it('should return a random number', () => {
    const random = getRandomNumber();
    // expect(random).toBe(8);
    expect(typeof random).toBe('number');
    expect(random < 10).toBeTruthy();
    expect(random >= 0).toBeTruthy();
  });

  describe('with mock', () => {
    beforeEach(() => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.684225430640192);
    });
    afterEach(() => {
      jest.spyOn(global.Math, 'random').mockRestore();
    });

    it('should return 6', () => {
      const random = getRandomNumber();
      expect(random).toBe(6);
    });
  });
});
