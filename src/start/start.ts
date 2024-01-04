import { minimalDistance } from "./minimal-distance";
import { TProcessArgs } from "../types";

export const startAction = (args: TProcessArgs): void => {
  const [word1, word2] = args._;
  const { maxDistance, processChains } = minimalDistance(String(word1), String(word2));

  console.log(maxDistance);
  console.log(processChains.join('\n'));
}

export default startAction;