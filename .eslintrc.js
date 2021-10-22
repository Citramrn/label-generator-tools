module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    "no-tabs": [
      "error",
      {
        "allowIndentationTabs": true
      }
    ],
    "no-shadow": ["error", { "builtinGlobals": false, "hoist": "functions", "allow": [] }],
    "no-use-before-define": ["error", { "functions": true, "classes": true }],
    "linebreak-style": 0,
    "new-cap": 0,
    "quotes": 0,
    "comma-dangle": 0,
    "import/no-extraneous-dependencies": 0,
    "no-restricted-globals": 0,
    "no-console": 0,
    "operator-linebreak": 0,
    "no-underscore-dangle": 0,
    "implicit-arrow-linebreak": 0,
    "no-unused-vars": 0,
    "indent": 0,
    "no-trailing-spaces": 0,
    "eol-last": 0,
    "import/prefer-default-export": 0,
    "no-plusplus": 0,
    "no-await-in-loop": 0,
    "class-methods-use-this": 0,
    "no-new": 0,
    "no-undef": 0,
    "consistent-return": 0,
    "no-prototype-builtins": 0,
    "no-return-assign": 0,
    "global-require": 0
  },
};
