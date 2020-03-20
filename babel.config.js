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
