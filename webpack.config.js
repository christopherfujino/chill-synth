/*global __dirname */
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "development", // TODO: JS fails in production mode
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
