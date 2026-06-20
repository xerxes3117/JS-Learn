import type {LearningSectionId} from '../../../src/sections/registry';

export type RootDrawerParamList = {
  Home: undefined;
} & Record<LearningSectionId, undefined>;
