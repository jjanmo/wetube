module.exports = {
    extends: 'airbnb-base',
    env: {
        browser: true,
        es6: true,
        amd: true,
        node: true
    },
    extends: 'eslint:recommended',
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    rules: {}
};
