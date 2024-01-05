import { startAction } from './start';
import { getMinDistance, buildChains, buildDistancesMatrix } from './minimal-distance';

jest.mock('./minimal-distance', () => ({
  buildChains: jest.fn(),
  buildDistancesMatrix: jest.fn(),
  getMinDistance: jest.fn(),
}));

describe('startAction', () => {
  let consoleErrorMock;
  let consoleLogMock;
  let consoleWarnMock;

  beforeAll(() => {
    consoleErrorMock = jest.spyOn(console, 'error');
    consoleLogMock = jest.spyOn(console, 'log');
    consoleWarnMock = jest.spyOn(console, 'warn');
  });

  afterAll(() => {
    consoleErrorMock.mockRestore();
    consoleLogMock.mockRestore();
    consoleWarnMock.mockRestore();
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should log result of startCommand to console when numbers only is not defined', () => {
    const word1 = 'word1';
    const word2 = 'word2';
    const mockDp = 'mock-dp';

    (buildDistancesMatrix as jest.Mock).mockReturnValue(mockDp);
    (getMinDistance as jest.Mock).mockReturnValue('mock-distance');
    (buildChains as jest.Mock).mockReturnValue(['mock-1', 'mock-2']);
    startAction(word1, word2, {});

    expect(buildDistancesMatrix).toHaveBeenCalledWith(word1, word2, {});
    expect(getMinDistance).toHaveBeenCalledWith(mockDp, {});
    expect(buildChains).toHaveBeenCalledWith(word1, word2, mockDp, {});

    expect(consoleLogMock).toHaveBeenCalledWith('mock-distance');
    expect(consoleLogMock).toHaveBeenCalledWith('mock-1\nmock-2');
    expect(consoleLogMock).toHaveBeenCalledTimes(2);
  });

  it('should log result of startCommand to console when numbers only is false', () => {
    const word1 = 'word1';
    const word2 = 'word2';
    const mockDp = 'mock-dp';

    (buildDistancesMatrix as jest.Mock).mockReturnValue(mockDp);
    (getMinDistance as jest.Mock).mockReturnValue('mock-distance');
    (buildChains as jest.Mock).mockReturnValue(['mock-1', 'mock-2']);
    startAction(word1, word2, { numberOnly: false });

    expect(buildDistancesMatrix).toHaveBeenCalledWith(word1, word2, {});
    expect(getMinDistance).toHaveBeenCalledWith(mockDp, {});
    expect(buildChains).toHaveBeenCalledWith(word1, word2, mockDp, {});

    expect(consoleLogMock).toHaveBeenCalledWith('mock-distance');
    expect(consoleLogMock).toHaveBeenCalledWith('mock-1\nmock-2');
    expect(consoleLogMock).toHaveBeenCalledTimes(2);
  });

  it('should log result of startCommand to console when numbers only is true', () => {
    const word1 = 'word1';
    const word2 = 'word2';
    const mockDp = 'mock-dp';

    (buildDistancesMatrix as jest.Mock).mockReturnValue(mockDp);
    (getMinDistance as jest.Mock).mockReturnValue('mock-distance');
    (buildChains as jest.Mock).mockReturnValue(['mock-1', 'mock-2']);
    startAction(word1, word2, { numberOnly: true });

    expect(buildDistancesMatrix).toHaveBeenCalledWith(word1, word2, {});
    expect(getMinDistance).toHaveBeenCalledWith(mockDp, {});
    expect(buildChains).not.toHaveBeenCalled();

    expect(consoleLogMock).toHaveBeenCalledWith('mock-distance');
    expect(consoleLogMock).toHaveBeenCalledTimes(1);
  });

});