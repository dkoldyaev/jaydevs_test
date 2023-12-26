import { execSync } from 'child_process';

describe('Command line execution', () => {
  it('should correctly execute from command line', () => {
    const word1 = 'kitten';
    const word2 = 'sitting';
    const expectedOutput = '3\nsitting\nsittin\nsitten\nkitten\n';

    const output = execSync(`ts-node index.ts ${word1} ${word2}`, { encoding: 'utf8' });

    expect(output).toBe(expectedOutput);
  });
});
