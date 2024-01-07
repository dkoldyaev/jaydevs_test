import { CamelCaseKey } from 'yargs';

type TCamelCaseOptions<T = Record<string, string | number | boolean>> = { [key in keyof T as key | CamelCaseKey<key>]: T[key] };

export type TStartActionWordsParams = {
  word1: string,
  word2: string,
};

export type TStartActionViewOptions = {
  'number-only'?: boolean,
};

export type TStartActionCostOptions = {
  'cost-delete'?: number,
  'cost-insert'?: number,
  'cost-replace'?: number,
}

export type TStartActionCommandParams =
  & TStartActionWordsParams
  & TStartActionViewOptions
  & TStartActionCostOptions;

export type TMinimalDistanceCosts = TCamelCaseOptions<TStartActionCostOptions>;
export type TStartActionParams = TCamelCaseOptions<
  & TStartActionViewOptions
  & TStartActionCostOptions
>;