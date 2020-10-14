const path = require("path");

const argv = process.argv;
console.log(argv);

var config = {
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "./views/js"),
    filename: "[name].bundle.js",
  },

  mode: "development",

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.gif|png$/,
        use: ["file-loader"],
      },
    ],
  },

  devtool: "source-map", //source-map   none

  plugins: [],
};

module.exports = config;
