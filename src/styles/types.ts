import * as i from 'types';
import { ThemedCssFunction } from '../../node_modules/@types/styled-components';
import { theme } from './theme';
import { sizes } from './utils';

export type BaseStyled = {
  theme?: typeof theme;
  className?: string;
}

// Get color strings from theme
export type ThemeColors = keyof typeof theme.color;

// Get subcolors from colors if they exist
export type SubThemeColors = {
  [color in i.ThemeColors]: Exclude<keyof typeof theme.color[color], keyof string>
}

// Ensures colors exist in theme
export type ColorsFromTheme<Colors extends i.ThemeColors> = Colors;

// Ensures subcolor exists in color object
export type SubcolorsFromColor<Color extends i.ThemeColors> = i.SubThemeColors[Color];

// Ensures subcolor exists in theme
export type SubcolorFromTheme<Color extends i.ThemeColors, Subcolor extends i.SubThemeColors[Color]> = [Color, Subcolor];

type MediaQueryType = ThemedCssFunction<typeof theme>;

export type MediaSizes = keyof typeof sizes;

export type MediaUtils = {
  [size in i.MediaSizes]: MediaQueryType;
}
