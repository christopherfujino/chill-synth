module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "chrome": "80",
        },
      },
    ],
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
