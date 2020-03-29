/*global __dirname */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const appTitle = "ChillSynth";

module.exports = {
  devtool: "inline-source-map",
  entry: "./src/index.tsx",
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
        test: /\.tsx?$/i,
        exclude: [
          /node_modules/,
          /test/,
        ],
        use: [{
          loader: "ts-loader",
          options: {onlyCompileBundledFiles: true}, // so failing tests don't block build
        }],
      },
      {
        test: /\.jsx$/i,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  // Teach webpack how to resolve module imports
  // https://webpack.js.org/configuration/resolve/#root
  resolve: {
    extensions: [ ".js", ".jsx", ".ts", ".tsx" ],
  }
};
