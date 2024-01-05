import { getMinDistance, buildDistancesMatrix, buildChains } from "./minimal-distance";
import { TStartActionParams } from "./types";

export const startAction = (
  word1: string,
  word2: string,
  { numberOnly, ...costs }: TStartActionParams
): void => {
  const dp = buildDistancesMatrix(word1, word2, costs);
  const minDistance = getMinDistance(dp, costs);
  console.log(minDistance);

  if (!numberOnly) {
    const chains = buildChains(word1, word2, dp, costs);
    console.log(chains.join('\n'));
  }
}

export default startAction;