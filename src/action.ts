import yargs from "yargs";
import { ErrorMessagesEnum } from "./enums";
import startAction from './start';
import { showError } from "./error";

export const runAction = (): void => {
  const args = yargs
    .usage('Usage: npm run start -- <word1> <word2> [--options]')
    .example('npm run start -- apple orange', 'Find minimal distance between two words.')
    .demandCommand(2, 2, ErrorMessagesEnum.WRONG_PARAMS_COUNT, ErrorMessagesEnum.WRONG_PARAMS_COUNT)
    .help('h')
    .alias('h', 'help')
    .parseSync();

  if (args['help'] || args['version']) {
    return;
  }

  try {
    return startAction(args);
  } catch (err) {
    showError(err);
  }
}