import yargs from "yargs";
import { runAction } from "./action"; // Replace 'yourFileName' with the actual file name
import startAction from './start';
import { showError } from './error';

jest.mock('yargs', () => ({
  usage: jest.fn().mockReturnThis(),
  example: jest.fn().mockReturnThis(),
  demandCommand: jest.fn().mockReturnThis(),
  help: jest.fn().mockReturnThis(),
  alias: jest.fn().mockReturnThis(),
  parseSync: jest.fn().mockReturnThis(),
}));
jest.mock('./start', () => jest.fn());
jest.mock('./error', () => ({ showError: jest.fn() }));

describe('runAction', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call minimalDistance with correct arguments', () => {
    (yargs.parseSync as jest.Mock).mockReturnValue('mocked-args');
    runAction();
    expect(startAction).toHaveBeenCalledWith('mocked-args');
  });

  it('should call showError if minimalDistance throws an error', () => {
    const error = new Error('mock-error');
    (yargs.parseSync as jest.Mock).mockReturnValue('mocked-args');
    (startAction as jest.Mock).mockImplementation(() => { throw error; });
    runAction();
    expect(showError).toHaveBeenCalledWith(error);
  });

  it('shouldn\'t run minimalDistance if help argument is', () => {
    (yargs.parseSync as jest.Mock).mockReturnValue({ help: true });
    runAction();
    expect(startAction).not.toHaveBeenCalled();
  });

  it('shouldn\'t run minimalDistance if version argument is', () => {
    (yargs.parseSync as jest.Mock).mockReturnValue({ version: true });
    runAction();
    expect(startAction).not.toHaveBeenCalled();
  });
});
