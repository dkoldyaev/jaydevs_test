import yargs from 'yargs';

import { showError, minimalDistance } from "./minimal-distance";
import { ErrorMessagesEnum } from './enums';

(() => {
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
        const [word1, word2] = args._;
        const { maxDistance, processChais } = minimalDistance(String(word1), String(word2));

        console.log(maxDistance);
        console.log(processChais.join('\n'));
    } catch {
        showError();
        return;
    }
})();