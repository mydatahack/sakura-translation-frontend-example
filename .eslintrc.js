module.exports = {
    "env": {
      "browser": true,
      "commonjs": true,
      "jest": false,
      "mocha": false,
      "es6": true,
      "jquery": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2015,
        "sourceType": "module"
    },
    "rules": {
      "no-undef": "off",
      "no-redeclare": "error",
      "no-irregular-whitespace": "error",
      "no-trailing-spaces": "error",
      "no-useless-escape": "error",
      "no-class-assign": "error",
      "no-inner-declarations": "error",
      "no-unreachable": "error",
      "no-debugger": "off",
      "no-console": "off",
      // "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      // "no-unused-vars": ["error", { "vars": "local", "args": "none" }],
      "no-unused-vars":"off",
      "prefer-const": "error",
      "eol-last": "error",
      "indent": [
        "error",
        2
      ],
      "quotes": [
        "error",
        "single"
      ],
      "semi": [
        "error",
        "always"
      ]
    }
};