const nodeExternals = require("webpack-node-externals");
const path = require("path");
module.exports = {
  entry: {
    app: "./src/server.ts"
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  target: "node",
  externals: [nodeExternals()],
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    loaders: [
      {
        test: /\.ts/,
        loader: "ts-loader"
      },
      {
        test: /\.js/,
        loader: "babel-loader"
      }
    ]
  }
};
