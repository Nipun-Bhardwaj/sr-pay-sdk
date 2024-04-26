const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "srpay.js",
    library: "SRPay",
    libraryTarget: "umd",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  externals: {
    axios: "axios",
    bootstrap: "bootstrap",
    react: "React",
    "react-dom": "ReactDOM",
    "react-hook-form": "ReactHookForm",
    "react-phone-input-2": "ReactPhoneInput2",
    "react-select": "ReactSelect",
  },
};
