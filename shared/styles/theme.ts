/**
 * Kvennaskólinn brand colors and theme configuration
 */

export const colors = {
  // Primary brand colors
  primary: '#f36b22',
  primaryDark: '#d95a1a',
  primaryLight: '#ff8c4d',

  // Semantic colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  // Neutral colors
  white: '#ffffff',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  black: '#000000',

  // High contrast mode
  highContrast: {
    bg: '#000000',
    text: '#ffffff',
    border: '#ffff00',
    focus: '#ffff00',
  },
};

export const spacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '1rem', // 16px
  lg: '1.5rem', // 24px
  xl: '2rem', // 32px
  '2xl': '3rem', // 48px
  '3xl': '4rem', // 64px
};

export const borderRadius = {
  none: '0',
  sm: '0.125rem', // 2px
  md: '0.375rem', // 6px
  lg: '0.5rem', // 8px
  xl: '0.75rem', // 12px
  full: '9999px',
};

export const fontSize = {
  small: {
    xs: '0.625rem', // 10px
    sm: '0.75rem', // 12px
    base: '0.875rem', // 14px
    lg: '1rem', // 16px
    xl: '1.125rem', // 18px
    '2xl': '1.25rem', // 20px
  },
  medium: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
  },
  large: {
    xs: '0.875rem', // 14px
    sm: '1rem', // 16px
    base: '1.125rem', // 18px
    lg: '1.25rem', // 20px
    xl: '1.5rem', // 24px
    '2xl': '1.875rem', // 30px
  },
};

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
};

export const transitions = {
  fast: '150ms ease-in-out',
  normal: '300ms ease-in-out',
  slow: '500ms ease-in-out',
};

/**
 * Generate CSS variables for theme
 */
export const generateCSSVariables = (): string => {
  return `
    :root {
      --color-primary: ${colors.primary};
      --color-primary-dark: ${colors.primaryDark};
      --color-primary-light: ${colors.primaryLight};

      --color-success: ${colors.success};
      --color-warning: ${colors.warning};
      --color-error: ${colors.error};
      --color-info: ${colors.info};

      --spacing-xs: ${spacing.xs};
      --spacing-sm: ${spacing.sm};
      --spacing-md: ${spacing.md};
      --spacing-lg: ${spacing.lg};
      --spacing-xl: ${spacing.xl};

      --radius-sm: ${borderRadius.sm};
      --radius-md: ${borderRadius.md};
      --radius-lg: ${borderRadius.lg};

      --transition-fast: ${transitions.fast};
      --transition-normal: ${transitions.normal};
      --transition-slow: ${transitions.slow};
    }

    .high-contrast {
      --bg-primary: ${colors.highContrast.bg};
      --bg-secondary: ${colors.white};
      --text-primary: ${colors.highContrast.text};
      --text-secondary: ${colors.black};
      --border-color: ${colors.highContrast.border};
      --focus-color: ${colors.highContrast.focus};
    }

    .reduced-motion * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  `;
};

export const theme = {
  colors,
  spacing,
  borderRadius,
  fontSize,
  shadows,
  transitions,
};

export default theme;
