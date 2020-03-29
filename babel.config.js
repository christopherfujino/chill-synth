module.exports = api => {
  const isTest = api.env("test");

  const exports = {
    "presets": [
      "@babel/preset-typescript",
    ],
    "plugins": [
      [
        "@babel/plugin-transform-react-jsx",
        {
          "pragma": "h",
          "pragmaFrag": "Fragment",
        },
      ],
    ],
  };

  if (isTest) {
    // This is necessary for jest/node to compile ES6 modules
    exports.presets.push(
      [
        "@babel/preset-env",
        {
          "targets": {
            "chrome": "80",
          },
        },
      ]
    );
  }

  return exports;
};
