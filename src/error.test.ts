import { showError } from './error';
import { ErrorStart } from './start';
import { stderr } from './stdout';

jest.mock('./stdout', () => ({
  stderr: jest.fn(),
}));

describe('showError', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should log the error message if minimal-distance-error', () => {
    const error = new ErrorStart('Test error');
    showError(error);
    expect(stderr).toHaveBeenCalledWith('start: Test error');
  });

  it('should log the error message if default-error', () => {
    const error = new Error('Test error');
    showError(error);
    expect(stderr).toHaveBeenCalledWith('Error: Test error');
  });
});
