import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        muted: colors.slate[500],
        primary: colors.purple,
      },
      fontFamily: {
        sans: ['Fira Mono', 'monospace'],
        serif: ['Fira Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
