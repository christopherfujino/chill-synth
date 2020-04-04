module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      //experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: "module",
  },
  plugins: [
    "jsdoc",
    "react",
    "@typescript-eslint",
  ],
  settings: {
    react: {
      pragma: "h", // preact
    },
  },
  root: true,
  rules: {
    indent: [ "error", 2 ],
    "linebreak-style": [ "error", "unix" ],
    quotes: [ "error", "double" ],
    semi: [ "error", "always" ],
    "jsdoc/check-alignment": 1, // Recommended
    "jsdoc/check-examples": 0, // TODO: enable
    "jsdoc/check-indentation": 0, // Conflicts with vim
    "jsdoc/check-param-names": 1, // Recommended
    "jsdoc/check-syntax": 1,
    "jsdoc/check-tag-names": 1, // Recommended
    "jsdoc/check-types": 1, // Recommended
    "jsdoc/implements-on-classes": 1, // Recommended
    "jsdoc/match-description": 1,
    "jsdoc/newline-after-description": 1, // Recommended
    "jsdoc/no-types": 1, // This should only be set if using TS
    "jsdoc/no-undefined-types": 1, // Recommended
    "jsdoc/require-description": 1,
    "jsdoc/require-description-complete-sentence": 1,
    "jsdoc/require-example": 0,
    "jsdoc/require-hyphen-before-param-description": 0,
    "jsdoc/require-jsdoc": [ // Recommended
      "error",
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: false, // this becomes a pain for preact
          ClassDeclaration: false, // this becomes a pain for preact
          ArrowFunctionExpression: false, // Let's not get crazy
          FunctionExpression: false,
        },
      },
    ],
    "jsdoc/require-param": 1, // Recommended
    "jsdoc/require-param-description": 1, // Recommended
    "jsdoc/require-param-name": 1, // Recommended
    "jsdoc/require-param-type": 0, // Excluded because we're using typescript
    "jsdoc/require-returns": 1, // Recommended
    "jsdoc/require-returns-check": 1, // Recommended
    "jsdoc/require-returns-description": 1, // Recommended
    "jsdoc/require-returns-type": 0, // Excluded because TS
    "jsdoc/valid-types": 1, // Recommended

    "react/prop-types": 0, // not included in core preact
  },
};
