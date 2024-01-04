import { showError } from './error';

describe('showError', () => {
  let consoleErrorMock;

  beforeEach(() => {
    consoleErrorMock = jest.spyOn(console, 'error');
  });

  afterEach(() => {
    consoleErrorMock.mockRestore();
  });

  it('should log the error message to the console', () => {
    showError(new Error('Test error'));
    expect(consoleErrorMock).toHaveBeenCalledWith('Test error');
  });
});
