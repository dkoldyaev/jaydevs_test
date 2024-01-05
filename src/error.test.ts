import { showError } from './error';
import { ErrorStart } from './start';

describe('showError', () => {
  let consoleErrorMock;

  beforeEach(() => {
    consoleErrorMock = jest.spyOn(console, 'error');
  });

  afterEach(() => {
    consoleErrorMock.mockRestore();
  });

  it('should log the error message if minimal-distance-error', () => {
    const error = new ErrorStart('Test error');
    showError(error);
    expect(consoleErrorMock).toHaveBeenCalledWith('start: Test error');
  });

  it('should log the error message if default-error', () => {
    const error = new Error('Test error');
    showError(error);
    expect(consoleErrorMock).toHaveBeenCalledWith(error);
  });
});
