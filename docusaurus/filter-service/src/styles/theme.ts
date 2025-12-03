//TODO_VS: how to employ similar logic for web/rnw platforms

import { colors } from './tokens';

export interface SimpleTheme {
  applyButtonColor: string;
}

export const MMT_THEME: SimpleTheme = {
	applyButtonColor: colors.button.primary1,
};

export const GI_THEME: SimpleTheme = {
	applyButtonColor: colors.button.primary2,
};

const themes = {
  gi: GI_THEME,
  mmt: MMT_THEME,
} as const;

export type ThemeName = keyof typeof themes;

let currentTheme: ThemeName = 'gi';

export const setGlobalTheme = (themeName: ThemeName) => {
  currentTheme = themeName;
};

export const getCurrentTheme = (): SimpleTheme => {
  return themes[currentTheme];
};