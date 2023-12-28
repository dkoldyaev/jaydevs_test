import { execSync } from 'child_process';
import { minimalDistance } from './index';


describe('Command line execution', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should correctly execute from command line', () => {
    const word1 = 'kitten';
    const word2 = 'sitting';
    const expectedOutput = '3\nsitting\nsittin\nsitten\nkitten\n';

    const output = execSync(`ts-node index.ts ${word1} ${word2}`, { encoding: 'utf8' });

    expect(output).toBe(expectedOutput);
  });

  it('should correctly execute from command line if words are the same', () => {
    const word1 = 'sitting';
    const word2 = 'sitting';
    const expectedOutput = '0\nsitting\n';

    const output = execSync(`ts-node index.ts ${word1} ${word2}`, { encoding: 'utf8' });

    expect(output).toBe(expectedOutput);
  });

  it('should alert error if there is the only one word in parameters', () => {
    const word = 'sitting';
    const expectedError = 'Wrong arguments. Use mpm run start --help to check syntax\n';

    const output = execSync(`ts-node index.ts ${word}`, { encoding: 'utf8' });

    expect(output).toBe(expectedError);
  });

  it('should alert error if there is no one word in parameters', () => {
    const expectedError = 'Wrong arguments. Use mpm run start --help to check syntax\n';

    const output = execSync(`ts-node index.ts`, { encoding: 'utf8' });

    expect(output).toBe(expectedError);
  });

  it('should alert error if there are more than two words in parameters', () => {
    const word1 = 'word1';
    const word2 = 'word2';
    const word3 = 'word3';
    const expectedError = 'Wrong arguments. Use mpm run start --help to check syntax\n';

    const output = execSync(`ts-node index.ts ${word1} ${word2} ${word3}`, { encoding: 'utf8' });

    expect(output).toBe(expectedError);
  });
});


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

    expect(result).not.toBeDefined();
    expect(console.error).not.toHaveBeenCalled();
    expect(console.warn).not.toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledTimes(5);
    expect(console.log).toHaveBeenCalledWith(3);
    expect(console.log).toHaveBeenCalledWith('port2');
    expect(console.log).toHaveBeenCalledWith('port1');
    expect(console.log).toHaveBeenCalledWith('pord1')
    expect(console.log).toHaveBeenCalledWith('word1');
  });

  it('works correct with delete', () => {
    const word1 = 'aaa';
    const word2 = 'abaa';

    const result = minimalDistance(word1, word2);

    expect(result).not.toBeDefined();
    expect(console.error).not.toHaveBeenCalled();
    expect(console.warn).not.toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledTimes(3);
    expect(console.log).toHaveBeenCalledWith(1);
    expect(console.log).toHaveBeenCalledWith('abaa');
    expect(console.log).toHaveBeenCalledWith('aaa');
  });

  it('works correct with insert', () => {
    const word1 = 'abaa';
    const word2 = 'aaa';

    const result = minimalDistance(word1, word2);

    expect(result).not.toBeDefined();
    expect(console.error).not.toHaveBeenCalled();
    expect(console.warn).not.toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledTimes(3);
    expect(console.log).toHaveBeenCalledWith(1);
    expect(console.log).toHaveBeenCalledWith('aaa');
    expect(console.log).toHaveBeenCalledWith('abaa');
  });
});