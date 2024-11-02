// eslint.config.js
import { defineConfig } from 'eslint-define-config'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import { ESLintUtils } from '@typescript-eslint/utils'
import { ESLintParser } from '@typescript-eslint/parser'

const typescriptParser = new ESLintParser({
  ecmaVersion: 12,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true,
  },
})

export default defineConfig({
  languageOptions: {
    globals: {
      window: 'readonly',
      document: 'readonly',
    },
    parser: typescriptParser,
  },
  plugins: {
    react: eslintPluginReact,
    'react-hooks': eslintPluginReactHooks,
    prettier: eslintPluginPrettier,
  },
  rules: {
    'prettier/prettier': 'error',
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-double'],
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
});
