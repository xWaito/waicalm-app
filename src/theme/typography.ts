/**
 * Sistema de Tipografía WaiCalm
 */

export const typography = {
  // Font Families
  fontRegular: 'System',
  fontMedium: 'System',
  fontBold: 'System',
  fontSemiBold: 'System',

  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    display: 40,
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
  },

  // Font Weights
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
  },
};

export default typography;
