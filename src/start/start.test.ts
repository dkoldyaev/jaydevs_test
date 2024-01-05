import { startAction } from './start';
import { minimalDistance } from './minimal-distance';

jest.mock('./minimal-distance', () => ({
  minimalDistance: jest.fn(),
}));

describe('startAction', () => {
  let consoleErrorMock;
  let consoleLogMock;
  let consoleWarnMock;

  beforeEach(() => {
    consoleErrorMock = jest.spyOn(console, 'error');
    consoleLogMock = jest.spyOn(console, 'log');
    consoleWarnMock = jest.spyOn(console, 'warn');
  });

  afterEach(() => {
    consoleErrorMock.mockRestore();
    consoleLogMock.mockRestore();
    consoleWarnMock.mockRestore();
  });

  it('should log result of minimalDistance to console', () => {
    const word1 = 'word1';
    const word2 = 'word2';
    const mockReturnValue = {
      maxDistance: 'mock-distance',
      processChains: ['mock-1', 'mock-2'],
    };
    (minimalDistance as jest.Mock).mockReturnValue(mockReturnValue);
    startAction(word1, word2);

    expect(minimalDistance).toHaveBeenCalledWith(word1, word2);
    expect(consoleLogMock).toHaveBeenCalledWith('mock-distance');
    expect(consoleLogMock).toHaveBeenCalledWith('mock-1\nmock-2');
    expect(consoleLogMock).toHaveBeenCalledTimes(2);
  });

});