import { ErrorStart } from './start';
import { stderr } from './stdout';

export type TError = Error | ErrorStart;

export const showError = (error: unknown) => {
  if (error instanceof ErrorStart) {
    return stderr(`start: ${error.message}`);
  }

  return stderr(String(error));
};