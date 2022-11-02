module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb",
        "airbnb-typescript",
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "tsx": true,
        },
        "ecmaVersion": 12,
        "sourceType": "module",
        "project": "./tsconfig.json",
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        eqeqeq: 1,
        'object-shorthand': [1, 'always'],
        'no-console': 0, // Console is disabled in production
        'no-mixed-spaces-and-tabs': [2, 'smart-tabs'], // Prettier output generates these
        'no-param-reassign': 2,
        'no-return-await': 2,
        'no-unused-expressions': 2,
        'import/default': 0,
        'import/namespace': 0,
        'prefer-const': 2,
        'import/no-named-as-default': 0,
        'import/no-named-as-default-member': 0,
        'import/named': 0, // Causes false positives with ts
        'import/no-unresolved': 0,
        'react/display-name': 0,
        curly: 2,
        indent: ['error', 4, {
            SwitchCase: 1,
        }],
        'import/prefer-default-export': 0,
        quotes: ['error', 'single'],
        'jsx-quotes': ['error', 'prefer-double'],
        'comma-dangle': ['error', 'always-multiline'],
        'react/jsx-filename-extension': [0, {
            extensions: ['.js', '.jsx', '.tsx', '.ts'],
        }],
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/ban-types': 2,
        '@typescript-eslint/array-type': [2, { default: 'array-simple' }],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-props-no-spreading': [1, {
            html: 'enforce',
            custom: 'enforce',
            explicitSpread: 'enforce',
        }],
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'no-undef': 0, // Causes false positives with ts
        'react/prop-types': 0, // Use ts types intead of prop-types
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                ignoreRestSiblings: true,
                argsIgnorePattern: '^_',
            },
        ],
        'no-underscore-dangle': ['error', { allow: ['__typename'] }],
        'no-unused-vars': 'off',
        'react/jsx-max-props-per-line': [1, { maximum: 1, when: 'always' }],
        'react/jsx-curly-newline': [1, { multiline: 'consistent', singleline: 'consistent' }],
        'max-len': ['warn', {
            code: 120,
            ignoreComments: true,
            ignoreTrailingComments: true,
            ignoreUrls: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true,
        }],
        "react/function-component-definition": [
            2,
            {
              namedComponents: "arrow-function",
              unnamedComponents: "arrow-function",
            },
        ],
    }
};
