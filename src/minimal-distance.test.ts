
import { minimalDistance } from './minimal-distance';

describe('minimalDistance', () => {
  it('works correct with only replace', () => {
    const word1 = 'word1';
    const word2 = 'port2';

    const result = minimalDistance(word1, word2);

    expect(result).toEqual({ maxDistance: 3, processChais: ['port2', 'port1', 'pord1', 'word1'] });
  });

  it('works correct with delete', () => {
    const word1 = 'aaa';
    const word2 = 'abaa';

    const result = minimalDistance(word1, word2);

    expect(result).toEqual({ maxDistance: 1, processChais: ['abaa', 'aaa'] });
  });

  it('works correct with insert', () => {
    const word1 = 'abaa';
    const word2 = 'aaa';

    const result = minimalDistance(word1, word2);

    expect(result).toEqual({ maxDistance: 1, processChais: ['aaa', 'abaa'] });
  });
});