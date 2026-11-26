import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default [
	{ ignores: ['dist/**', 'node_modules/**'] },
	js.configs.recommended,
	{
		// App code: ES modules running in the browser
		files: ['src/**/*.js'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: globals.browser,
		},
		rules: {
			'no-unused-vars': ['warn', { args: 'after-used' }],
			'prefer-const': 'warn',
			eqeqeq: ['warn', 'smart'],
		},
	},
	{
		// Build config: CommonJS running in Node
		files: ['webpack.config.js'],
		languageOptions: {
			sourceType: 'commonjs',
			globals: globals.node,
		},
	},
	prettier, // keep last: turns off rules that clash with Prettier formatting
];
