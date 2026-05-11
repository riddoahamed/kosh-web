import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // These React Compiler-oriented rules are useful later, but currently
      // too noisy for this Vite MVP because state is intentionally hydrated
      // from localStorage and app stores after mount.
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/purity': 'off',
      // Shared UI files export component variants/constants alongside
      // components. Keep fast refresh guidance out of the beta lint gate.
      'react-refresh/only-export-components': 'off',
    },
  },
])
