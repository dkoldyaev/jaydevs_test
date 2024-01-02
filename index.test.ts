import { execSync } from 'child_process';


describe('Command line execution', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should correctly execute from command line', () => {
    const word1 = 'kitten';
    const word2 = 'sitting';
    const expectedOutput = '3\nsitting\nsittin\nsitten\nkitten\n';

    const output = execSync(`ts-node index.ts ${word1} ${word2}`, { encoding: 'utf8', stdio: 'pipe' });

    expect(output.replace(/\x1B\[[0-9;]*[mG]/g, '')).toBe(expectedOutput);
  });

  it('should correctly execute from command line if words are the same', () => {
    const word1 = 'sitting';
    const word2 = 'sitting';
    const expectedOutput = '0\nsitting\n';

    const output = execSync(`ts-node index.ts ${word1} ${word2}`, { encoding: 'utf8' });

    expect(output.replace(/\x1B\[[0-9;]*[mG]/g, '')).toBe(expectedOutput);
  });

  it('should alert error if there is the only one word in parameters', () => {
    const word = 'sitting';
    const expectedError = 'Usage: npm run start -- <word1> <word2> [--options]\n' +
      '\n' +
      'Options:\n' +
      '      --version  Show version number                                   [boolean]\n' +
      '  -h, --help     Show help                                             [boolean]\n' +
      '\n' +
      'Examples:\n' +
      '  npm run start -- apple orange  Find minimal distance between two words.\n' +
      '\n' +
      'Wrong arguments. Use mpm run start --help to check syntax\n';

    try {
      execSync(`ts-node index.ts ${word}`, { encoding: 'utf8' });
      fail('Has to throw error');
    } catch (error) {
      expect((error as { stderr: string }).stderr).toBe(expectedError);
    }
  });

  it('should alert error if there is no one word in parameters', () => {
    const expectedError = 'Usage: npm run start -- <word1> <word2> [--options]\n' +
      '\n' +
      'Options:\n' +
      '      --version  Show version number                                   [boolean]\n' +
      '  -h, --help     Show help                                             [boolean]\n' +
      '\n' +
      'Examples:\n' +
      '  npm run start -- apple orange  Find minimal distance between two words.\n' +
      '\n' +
      'Wrong arguments. Use mpm run start --help to check syntax\n';

    try {
      execSync(`ts-node index.ts`, { encoding: 'utf8' });
      fail('Has to throw error');
    } catch (error) {
      expect((error as { stderr: string }).stderr).toBe(expectedError);
    }
  });

  it('should alert error if there are more than two words in parameters', () => {
    const word1 = 'word1';
    const word2 = 'word2';
    const word3 = 'word3';
    const expectedError = 'Usage: npm run start -- <word1> <word2> [--options]\n' +
      '\n' +
      'Options:\n' +
      '      --version  Show version number                                   [boolean]\n' +
      '  -h, --help     Show help                                             [boolean]\n' +
      '\n' +
      'Examples:\n' +
      '  npm run start -- apple orange  Find minimal distance between two words.\n' +
      '\n' +
      'Wrong arguments. Use mpm run start --help to check syntax\n';

    try {
      execSync(`ts-node index.ts ${word1} ${word2} ${word3}`, { encoding: 'utf8', stdio: 'pipe' });
      fail('Has to throw error');
    } catch (error) {
      expect((error as { stderr: string }).stderr).toBe(expectedError);
    }
  });
});