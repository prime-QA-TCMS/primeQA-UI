import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: typescriptParser,
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				window: true,
				document: true,
				navigator: true,
				console: true,
				localStorage: true,
				URLSearchParams: true,
				AbortController: true,
				StorageEvent: true,
				HTMLElement: true,
				alert: true,
				setTimeout: true,
				process: true,
				jest: true,
				describe: true,
				it: true,
				expect: true,
			},
		},
		plugins: {
			react: reactPlugin,
			'react-hooks': reactHooks,
			'jsx-a11y': jsxA11y,
			prettier: prettier,
			'@typescript-eslint': typescript,
		},
		rules: {
			...js.configs.recommended.rules,
			...reactPlugin.configs.recommended.rules,
			...jsxA11y.configs.recommended.rules,
			'react/react-in-jsx-scope': 'off',
			'react/no-children-prop': 'off',
			'react/no-unescaped-entities': 'warn',
			'no-unused-vars': 'warn',
			'prettier/prettier': 'error',
		},
		settings: {
			react: { version: 'detect' },
		},
		ignores: ['build', 'node_modules'],
	},
];
