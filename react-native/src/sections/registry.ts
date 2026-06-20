import type {ComponentType} from 'react';
import {KeyboardBehavioursScreen} from './keyboard-behaviours/KeyboardBehavioursScreen';

export type LearningSectionId = 'keyboard-behaviours';

export type LearningSectionDefinition = {
  id: LearningSectionId;
  title: string;
  component: ComponentType<object>;
};

export const learningSections: LearningSectionDefinition[] = [
  {
    id: 'keyboard-behaviours',
    title: 'Keyboard behaviours',
    component: KeyboardBehavioursScreen,
  },
];
