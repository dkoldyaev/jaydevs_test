import yargs from "yargs";
import { ErrorMessagesEnum } from "./src/enums";
import { showError } from "./src/error";
import startAction from "./src/start";

yargs
  .usage('Usage: npm run <command> -- [options]')
  .command<{ word1: string, word2: string }>(
    'start <word1> <word2>',
    'Find minimal distance between two words.',
    yargs => {
      yargs
        .positional('word1', {
          describe: 'First word',
          type: 'string',
        })
        .positional('word2', {
          describe: 'Second word',
          type: 'string',
        });
    },
    ({ word1, word2, _ }) => {
      try {
        startAction(word1, word2);
      } catch (err: unknown) {
        showError(err);
      }
    }
  )
  .demandCommand(1, ErrorMessagesEnum.WRONG_COMMAND)
  .help('h')
  .alias('h', 'help')
  .parse();