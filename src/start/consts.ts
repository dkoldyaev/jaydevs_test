import { ChangesTypes } from './enums';

export const DefaultChangesCosts: Record<ChangesTypes, number> = {
  [ChangesTypes.DELETE]: 1,
  [ChangesTypes.INSERT]: 1,
  [ChangesTypes.REPLACE]: 1
};