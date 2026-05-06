import eslint from '@eslint/js';
import prettier from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	prettier,
	{
		languageOptions: {
			parserOptions: {
				projectService: {
					allowDefaultProject: [
						'eslint.config.mjs',
						'test-regex.js',
						'scripts/codegen/*.ts',
						'scripts/codegen/templates/*.ts',
						'scripts/make-registry.ts',
						'scripts/make-index.ts',
						'scripts/generate.ts'
					]
				},
				tsconfigRootDir: import.meta.dirname
			}
		},
		rules: {
			'no-process-env': 'off',
			'no-inline-comments': 'off',
			'no-warning-comments': 'off',
			'comma-dangle': ['error', 'never'],
			'arrow-parens': ['error', 'always'],
			'@typescript-eslint/naming-convention': 'off',
			'@typescript-eslint/no-floating-promises': 'off',
			'@typescript-eslint/no-misused-promises': 'off',
			'@typescript-eslint/no-unsafe-argument': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/no-unsafe-declaration-merging': 'off',
			'@typescript-eslint/no-empty-object-type': 'off',
			'no-prototype-builtins': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_'
				}
			]
		}
	},
	{
		ignores: ['dist/**', 'docs/**', 'test/**', 'node_modules/**']
	}
);
