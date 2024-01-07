import yargs from 'yargs';
import { ErrorMessagesEnum } from './src/enums';
import { showError } from './src/error';
import startAction, { TStartActionCommandParams } from './src/start';

yargs
  .usage('Usage: npm run <command> -- [options]')
  .command<TStartActionCommandParams>(
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
        })
        .options('number-only', {
          describe: 'Print only numbers of mutations',
          type: 'boolean'
        })
        .options('cost-delete', {
          describe: 'price for delete',
          type: 'number',
          default: 1,
        })
        .options('cost-replace', {
          describe: 'price for delete',
          type: 'number',
          default: 1,
        })
        .options('cost-insert', {
          describe: 'price for delete',
          type: 'number',
          default: 1,
        })
        .alias('n', 'number-only');
    },
    ({ word1, word2, ...params }) => {
      try {
        startAction(word1, word2, params);
      } catch (err: unknown) {
        showError(err);
      }
    }
  )
  .demandCommand(1, ErrorMessagesEnum.WRONG_COMMAND)
  .help('h')
  .alias('h', 'help')
  .alias('v', 'version')
  .parse();