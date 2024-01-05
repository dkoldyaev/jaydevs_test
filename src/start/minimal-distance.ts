import { DefaultChangePrice, ErrorMessagesEnum } from "../enums";

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


export const buildDistancesMatrix = (
    word1: string,
    word2: string,
): number[][] => {
    const dp = Array(word1.length).fill(null).map(() => Array(word2.length).fill(null));

    for (let i = 0; i < word1.length; i++) {
        for (let j = 0; j < word2.length; j++) {
            const { insert, del, replace } = getChangesPrices(i, j, dp);
            dp[i][j] = Math.min(
                insert + DefaultChangePrice.INSERT,
                del + DefaultChangePrice.DELETE,
                replace + (word1[i] === word2[j] ? 0 : DefaultChangePrice.REPLACE)
            );
        }
    }

    return dp;
};


export const getMinDistance = (dp: number[][]): number => {
    const n = dp.length;
    const m = dp[n - 1].length;
    return dp[n - 1][m - 1];
};


export const buildChains = (word1: string, word2: string, dp: number[][]): string[] => {
    const processChains: string[] = [];
    let currentDistance = getMinDistance(dp);
    let curentI = word1.length - 1;
    let curentJ = word2.length - 1;
    let curWord = Array.from(word2);

    processChains.push(curWord.join(''));
    while (currentDistance > 0) {
        const { insert, del, replace } = getChangesPrices(curentI, curentJ, dp);
        if (replace < currentDistance) {
            curWord[curentJ] = word1[curentI];
            curentI -= 1;
            curentJ -= 1;
            currentDistance = replace;
            processChains.push(curWord.join(''));
        } else if (del < currentDistance) {
            curWord[curentJ] = '';
            curentJ -= 1;
            currentDistance = del;
            processChains.push(curWord.join(''));
        } else if (insert < currentDistance) {
            curWord.splice(curentJ + 1, 0, word1[curentI]);
            curentI -= 1;
            currentDistance = insert;
            processChains.push(curWord.join(''));
        } else {
            curentI -= 1;
            curentJ -= 1;
        }
    }

    return processChains;
};