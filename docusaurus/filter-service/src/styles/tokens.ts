//TODO_VS: do we need categories for colors? remove them if not needed
const colors = {
  background: {
    primary: '#ffffff',
    secondary: '#f5f5f5',
    tertiary: '#f0f0f0',
		caution: '#fff6e5'
  },

  text: {
    primary: '#222222',
    secondary: '#666666',
    inverse: '#ffffff',
    disabled: '#999999',
		mediumEmphasis: '#717171',
  },

  border: {
    primary: '#e0e0e0',
    secondary: '#e8e8e8',
    disabled: '#cccccc',
		divider: '#D8D8D8'
  },

  interactive: {
    primary: '#007AFF',
  },

  button: {
		primary1: '#007AFF',
		secondary1: 'transparent',
		primary2: '#FF6D38',
  },

} as const;

const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },

  fontWeight: {
    medium: '500' as const,
    semibold: '600' as const,
    bold: 'bold' as const,
  },

  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
  },
} as const;

const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  '2xl': 24,
} as const;

const borderRadius = {
  sm: 4,
  md: 6,
  xl: 12,
} as const;

const layout = {
  height: {
    header: 60,
    footer: 60,
  },

  width: {
    radioButton: 20,
		leftSection: 140,
  },

  container: {
    minHeight: 600,
    maxHeight: 800,
  },
} as const;

//TODO_VS: what is use for this?
const semantic = {
  radioButton: {
    borderWidth: 2,
  },
} as const;

export { colors, typography, spacing, borderRadius, layout, semantic };

const tokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  layout,
  semantic,
} as const;

export type DesignTokens = typeof tokens;
