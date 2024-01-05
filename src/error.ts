import { ErrorStart } from "./start";

export type TError = Error | ErrorStart;

export const showError = (error: unknown) => {
  if (error instanceof ErrorStart) {
    return console.error(`start: ${error.message}`);
  }

  return console.error(error);
};