module.exports = api => {
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
  const isTest = api.env("test");
  if (isTest) {
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
