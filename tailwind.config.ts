import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        muted: colors.slate,
        primary: colors.purple,
        secondary: colors.cyan,
      },
      fontFamily: {
        sans: ['Fira Mono', 'monospace'],
        serif: ['Fira Mono', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
