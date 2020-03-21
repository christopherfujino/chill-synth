/*global __dirname */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const appTitle = "ChillSynth";

module.exports = {
  devtool: "inline-source-map",
  entry: "./src/index.jsx",
  mode: "development", // TODO: JS fails in production mode
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    // Generates index.html
    new HtmlWebpackPlugin({
      title: appTitle,
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      }
    ],
  }
};
