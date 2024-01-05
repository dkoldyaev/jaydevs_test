import { minimalDistance } from "./minimal-distance";

export const startAction = (word1: string, word2: string): void => {
  const { maxDistance, processChains } = minimalDistance(word1, word2);

  console.log(maxDistance);
  console.log(processChains.join('\n'));
}

export default startAction;