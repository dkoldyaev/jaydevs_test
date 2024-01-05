import { buildChains, buildDistancesMatrix, getMinDistance } from './minimal-distance';

describe('buildDistancesMatrix', () => {
  it('two different words for default costs', () => {
    const word1 = 'aaa';
    const word2 = 'bbb';
    const costs = {};

    const result = buildDistancesMatrix(word1, word2, costs);
    expect(result).toEqual([[1, 2, 3], [2, 2, 3], [3, 3, 3]]);
  });

  it('two different words with one same symbol', () => {
    const word1 = 'aaa';
    const word2 = 'bca';

    const result = buildDistancesMatrix(word1, word2, {});
    expect(result).toEqual([[1, 2, 2], [2, 2, 2], [3, 3, 2]]);
  });

  it('two different words with custom delete price', () => {
    const word1 = 'aaa';
    const word2 = 'aaab';

    const result = buildDistancesMatrix(word1, word2, { costDelete: 3 });
    expect(result).toEqual([[0, 1, 2, 4], [1, 0, 1, 3], [2, 1, 0, 2]]);
  });

  it('two different words with custom replace price', () => {
    const word1 = 'aaa';
    const word2 = 'aba';

    const result = buildDistancesMatrix(word1, word2, { costReplace: 3 });
    expect(result).toEqual([[0, 1, 2], [1, 2, 1], [2, 3, 2]]);
  });

  it('two different words with custom insert price', () => {
    const word1 = 'aaa';
    const word2 = 'aa';

    const result = buildDistancesMatrix(word1, word2, { costReplace: 3 });
    expect(result).toEqual([[0, 1], [1, 0], [2, 1]]);
  });

  it('two equal words', () => {
    const word1 = 'aaa';
    const word2 = 'aaa';

    const result = buildDistancesMatrix(word1, word2, {});
    expect(result).toEqual([[0, 1, 2], [1, 0, 1], [2, 1, 0]]);
  });
});

describe('getMinDistance', () => {
  it('should return right bottom value', () => {
    const dp = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    expect(getMinDistance(dp)).toBe(9);
  });
});

describe('buildChains', () => {
  it('should return correct list for two dirrence words with replace', () => {
    const word1 = 'aaa';
    const word2 = 'bca';
    const dp = [
      [1, 2, 2],
      [2, 2, 2],
      [3, 3, 2],
    ];
    expect(buildChains(word1, word2, dp)).toEqual([word2, 'baa', 'aaa']);
  });

  it('should return correct list for two dirrence words with delete', () => {
    const word1 = 'mck';
    const word2 = 'mock';
    const dp = [
      [0, 1, 2, 3],
      [1, 1, 1, 2],
      [2, 2, 2, 1],
    ];
    expect(buildChains(word1, word2, dp)).toEqual([word2, word1]);
  });

  it('should return correct list for two dirrence words with insert', () => {
    const word1 = 'mock';
    const word2 = 'mck';
    const dp = [
      [0, 1, 2],
      [1, 1, 2],
      [2, 1, 2],
      [3, 2, 1],
    ];
    expect(buildChains(word1, word2, dp)).toEqual([word2, word1]);
  });
});