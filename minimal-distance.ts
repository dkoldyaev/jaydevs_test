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


export const minimalDistance = (
    word1: string,
    word2: string
): {
    maxDistance: number,
    processChais: string[],
} => {
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

    const maxDistance = dp[n - 1][m - 1];
    const processChais: string[] = [];
    let currentDistance = maxDistance;
    let curentI = n - 1;
    let curentJ = m - 1;
    let curWord = Array.from(word2);

    processChais.push(curWord.join(''));
    while (currentDistance > 0) {
        const { insert, del, replace } = getChangesPrices(curentI, curentJ, dp);
        if (replace < currentDistance) {
            curWord[curentJ] = word1[curentI];
            curentI -= 1;
            curentJ -= 1;
            currentDistance = replace;
            processChais.push(curWord.join(''));
        } else if (del < currentDistance) {
            curWord[curentJ] = '';
            curentJ -= 1;
            currentDistance = del;
            processChais.push(curWord.join(''));
        } else if (insert < currentDistance) {
            curWord.splice(curentJ + 1, 0, word1[curentI]);
            curentI -= 1;
            currentDistance = insert;
            processChais.push(curWord.join(''));
        } else {
            curentI -= 1;
            curentJ -= 1;
        }
    }

    return { maxDistance, processChais };
};

export const showError = () => {
    console.log(ErrorMessagesEnum.WRONG_PARAMS_COUNT);
};