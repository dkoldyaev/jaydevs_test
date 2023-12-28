import { parseArgs } from 'node:util';

import { ErrorMessagesEnum } from "./enums";

const getDp = (i: number, j: number, dp: number[][]): number => {
    if (i < 0 && j < 0) return 0;
    if (i < 0) return j + 1;
    if (j < 0) return i + 1;
    return dp[i][j];
};

export const minimalDistance = (word1: string, word2: string): void => {
    const n = word1.length;
    const m = word2.length;
    const dp = Array(n).fill(null).map(() => Array(m).fill(null));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            dp[i][j] = Math.min(
                getDp(i - 1, j, dp) + 1,
                getDp(i, j - 1, dp) + 1,
                getDp(i - 1, j - 1, dp) + (word1[i] === word2[j] ? 0 : 1)
            );
        }
    }

    let distance = getDp(n - 1, m - 1, dp);
    console.log(distance);
    let curI = n - 1;
    let curJ = m - 1;
    let curWord = Array.from(word2);


    console.log(curWord.join(''));
    while (distance > 0) {
        const del = getDp(curI, curJ - 1, dp);
        const insert = getDp(curI - 1, curJ, dp);
        const replace = getDp(curI - 1, curJ - 1, dp);
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


