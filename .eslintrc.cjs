module.exports = {
	root: true,
	env: { browser: true, es2021: true, jest: true },
	parser: '@typescript-eslint/parser',
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module', project: './tsconfig.json' },
	settings: { react: { version: 'detect' } },
	plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y', 'prettier'],
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:prettier/recommended',
	],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'prettier/prettier': ['error'],
	},
	ignorePatterns: ['build', 'node_modules']
};
