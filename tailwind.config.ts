import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-theme':
          'linear-gradient(to bottom, rgb(var(--color-background-start)), rgb(var(--color-background-end)))',
      },
      colors: {
        primary: 'var(--color-primary)',
        'primary-content': 'var(--color-primary-content)',
        'primary-hover': 'var(--color-primary-hover)',
        secondary: 'var(--color-secondary)',
        opposite: 'var(--color-opposite)',
        'opposite-neutral': 'var(--color-opposite-neutral)',
        neutral: 'var(--color-neutral)',
        background: {
          start: 'rgb(var(--color-background-start) / <alpha-value>)',
          end: 'rgb(var(--color-background-end) / <alpha-value>)',
        },
        foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
      },
    },
  },
  plugins: [],
} satisfies Config;
