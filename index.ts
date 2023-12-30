import { parseArgs } from 'node:util';

import { DefaultChangePrice, ErrorMessagesEnum } from "./enums";

const getMinimumDistanceAtCell = (i: number, j: number, dp: number[][]): number => {
    if (i < 0 && j < 0) return 0;
    if (i < 0) return j + 1;
    if (j < 0) return i + 1;
    return dp[i][j];
};


const getChangesPrices = (i: number, j: number, dp: number[][]): { del: number, insert: number, replace: number } => {
    const insert = getMinimumDistanceAtCell(i - 1, j, dp);
    const del = getMinimumDistanceAtCell(i, j - 1, dp);
    const replace = getMinimumDistanceAtCell(i - 1, j - 1, dp);

    return { insert, del, replace };
};


export const minimalDistance = (word1: string, word2: string): number => {
    const n = word1.length;
    const m = word2.length;
    const dp = Array(n).fill(null).map(() => Array(m).fill(null));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            const { insert, del, replace } = getChangesPrices(i, j, dp);
            dp[i][j] = Math.min(
                insert + DefaultChangePrice.INSERT,
                del + DefaultChangePrice.DELETE,
                replace + (word1[i] === word2[j] ? 0 : DefaultChangePrice.REPlACE)
            );
        }
    }

    let distance = dp[n - 1][m - 1];
    const result = distance;

    console.log(distance);
    let curI = n - 1;
    let curJ = m - 1;
    let curWord = Array.from(word2);

    console.log(curWord.join(''));
    while (distance > 0) {
        const { insert, del, replace } = getChangesPrices(curI, curJ, dp);
        if (replace < distance) {
            curWord[curJ] = word1[curI];
            curI -= 1;
            curJ -= 1;
            distance = replace;
            console.log(curWord.join(''));
        } else if (del < distance) {
            curWord[curJ] = '';
            curJ -= 1;
            distance = del;
            console.log(curWord.join(''));
        } else if (insert < distance) {
            curWord.splice(curJ + 1, 0, word1[curI]);
            curI -= 1;
            distance = insert;
            console.log(curWord.join(''));
        } else {
            curI -= 1;
            curJ -= 1;
        }
    }

    return result;
};

export const showError = () => {
    console.log(ErrorMessagesEnum.WRONG_PARAMS_COUNT);
};

(() => {
    let values: ReturnType<typeof parseArgs>['values'];
    let words: ReturnType<typeof parseArgs>['positionals'];

    try {
        const args = parseArgs({
            args: process.argv,
            options: {},
            allowPositionals: true
        });
        values = args.values;
        words = args.positionals.slice(2);

        if (words.length !== 2) {
            throw TypeError();
        }
    } catch {
        showError();
        return;
    }

    minimalDistance(words[0], words[1]);
})();


