// eslint.config.js
import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        rules: {
            'prettier/prettier': 'error',
        },
        plugins: {
            prettier,
        },
    },
    prettierConfig,
];
