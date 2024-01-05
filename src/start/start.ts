import { getMinDistance, buildDistancesMatrix, buildChains } from "./minimal-distance";

export const startAction = (word1: string, word2: string, numberOnly: boolean = false): void => {
  const dp = buildDistancesMatrix(word1, word2);
  const minDistance = getMinDistance(dp);
  console.log(minDistance);

  if (!numberOnly) {
    const chains = buildChains(word1, word2, dp);
    console.log(chains.join('\n'));
  }
}

export default startAction;