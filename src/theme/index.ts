/**
 * Tema completo de WaiCalm
 */

import { lightColors, darkColors, sharedColors } from './colors';
import { typography } from './typography';
import { spacing, borderRadius } from './spacing';

export const getTheme = (isDark: boolean) => ({
  colors: {
    ...(isDark ? darkColors : lightColors),
    ...sharedColors,
  },
  typography,
  spacing,
  borderRadius,
  isDark,
});

export { lightColors, darkColors, sharedColors };
export { typography };
export { spacing, borderRadius };
export { colors } from './colors';

export const theme = {
  colors: lightColors,
  typography,
  spacing,
  borderRadius,
};

export default theme;
