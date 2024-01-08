import { startAction } from './start';
import { getMinDistance, buildChains, buildDistancesMatrix } from './minimal-distance';
import { stderr, stdout } from '../stdout';

jest.mock('./minimal-distance', () => ({
  buildChains: jest.fn(),
  buildDistancesMatrix: jest.fn(),
  getMinDistance: jest.fn(),
}));

jest.mock('../stdout', () => ({
  stderr: jest.fn(),
  stdout: jest.fn(),
}));

describe('startAction', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should log result of startCommand to console when numbers only is not defined', () => {
    const word1 = 'word1';
    const word2 = 'word2';
    const mockDp = 'mock-dp';
    const costs = { costDelete: 2, costReplace: 3, costInsert: 4 };

    (buildDistancesMatrix as jest.Mock).mockReturnValue(mockDp);
    (getMinDistance as jest.Mock).mockReturnValue('mock-distance');
    (buildChains as jest.Mock).mockReturnValue(['mock-1', 'mock-2']);
    startAction(word1, word2, costs);

    expect(buildDistancesMatrix).toHaveBeenCalledWith(word1, word2, costs);
    expect(getMinDistance).toHaveBeenCalledWith(mockDp);
    expect(buildChains).toHaveBeenCalledWith(word1, word2, mockDp);

    expect(stdout).toHaveBeenCalledWith('mock-distance');
    expect(stdout).toHaveBeenCalledWith('mock-1\nmock-2');
    expect(stdout).toHaveBeenCalledTimes(2);
  });

  it('should log result of startCommand to console when numbers only is false', () => {
    const word1 = 'word1';
    const word2 = 'word2';
    const mockDp = 'mock-dp';
    const costs = { costDelete: 2, costReplace: 3, costInsert: 4 };

    (buildDistancesMatrix as jest.Mock).mockReturnValue(mockDp);
    (getMinDistance as jest.Mock).mockReturnValue('mock-distance');
    (buildChains as jest.Mock).mockReturnValue(['mock-1', 'mock-2']);
    startAction(word1, word2, { numberOnly: false, ...costs });

    expect(buildDistancesMatrix).toHaveBeenCalledWith(word1, word2, costs);
    expect(getMinDistance).toHaveBeenCalledWith(mockDp);
    expect(buildChains).toHaveBeenCalledWith(word1, word2, mockDp);

    expect(stdout).toHaveBeenCalledWith('mock-distance');
    expect(stdout).toHaveBeenCalledWith('mock-1\nmock-2');
    expect(stdout).toHaveBeenCalledTimes(2);
    expect(stderr).not.toHaveBeenCalled();
  });

  it('should log result of startCommand to console when numbers only is true', () => {
    const word1 = 'word1';
    const word2 = 'word2';
    const mockDp = 'mock-dp';
    const costs = { costDelete: 2, costReplace: 3, costInsert: 4 };

    (buildDistancesMatrix as jest.Mock).mockReturnValue(mockDp);
    (getMinDistance as jest.Mock).mockReturnValue('mock-distance');
    (buildChains as jest.Mock).mockReturnValue(['mock-1', 'mock-2']);
    startAction(word1, word2, { numberOnly: true, ...costs });

    expect(buildDistancesMatrix).toHaveBeenCalledWith(word1, word2, costs);
    expect(getMinDistance).toHaveBeenCalledWith(mockDp);
    expect(buildChains).not.toHaveBeenCalled();

    expect(stdout).toHaveBeenCalledWith('mock-distance');
    expect(stdout).toHaveBeenCalledTimes(1);
    expect(stderr).not.toHaveBeenCalled();
  });

});