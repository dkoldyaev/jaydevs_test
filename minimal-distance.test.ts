
import { minimalDistance } from './minimal-distance';

describe('minimalDistance', () => {
  const {
    log: baseConsoleLog,
    error: baseConsoleErr,
    warn: baseConsoleWar,
  } = console;

  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    console.log = jest.fn();
    console.error = jest.fn();
    console.warn = jest.fn();
  });

  afterEach(() => {
    console.log = baseConsoleLog;
    console.error = baseConsoleErr;
    console.warn = baseConsoleWar;
  });

  it('works correct with only replace', () => {
    const word1 = 'word1';
    const word2 = 'port2';

    const result = minimalDistance(word1, word2);

    expect(console.error).not.toHaveBeenCalled();
    expect(console.warn).not.toHaveBeenCalled();
    // expect(console.log).toHaveBeenCalledTimes(5);
    expect(result).toEqual({ maxDistance: 3, processChais: ['port2', 'port1', 'pord1', 'word1'] });
    // expect(console.log).toHaveBeenCalledWith('port2');
    // expect(console.log).toHaveBeenCalledWith('port1');
    // expect(console.log).toHaveBeenCalledWith('pord1')
    // expect(console.log).toHaveBeenCalledWith('word1');
  });

  it('works correct with delete', () => {
    const word1 = 'aaa';
    const word2 = 'abaa';

    const result = minimalDistance(word1, word2);

    expect(console.error).not.toHaveBeenCalled();
    expect(console.warn).not.toHaveBeenCalled();
    // expect(console.log).toHaveBeenCalledTimes(3);
    expect(result).toEqual({ maxDistance: 1, processChais: ['abaa', 'aaa'] });
    // expect(console.log).toHaveBeenCalledWith('abaa');
    // expect(console.log).toHaveBeenCalledWith('aaa');
  });

  it('works correct with insert', () => {
    const word1 = 'abaa';
    const word2 = 'aaa';

    const result = minimalDistance(word1, word2);

    expect(console.error).not.toHaveBeenCalled();
    expect(console.warn).not.toHaveBeenCalled();
    // expect(console.log).toHaveBeenCalledTimes(3);
    expect(result).toEqual({ maxDistance: 1, processChais: ['aaa', 'abaa'] });
    // expect(console.log).toHaveBeenCalledWith('aaa');
    // expect(console.log).toHaveBeenCalledWith('abaa');
  });
});