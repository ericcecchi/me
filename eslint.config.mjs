import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';
import react from 'eslint-plugin-react';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...react.configs.flat.recommended,
    ...react.configs.flat['jsx-runtime'],
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    rules: {
      'react/jsx-curly-brace-presence': ['error', 'never'],
    },
  },
);
