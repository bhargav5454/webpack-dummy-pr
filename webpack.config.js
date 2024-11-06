const path = require("path");
const HtmlwebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/index.js",  
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true, 
  },
  plugins: [
    new HtmlwebpackPlugin({
      template: "./public/index.html", 
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",  
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,  
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", 
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,  // Handle CSS files
        use: [MiniCssExtractPlugin.loader, "css-loader"],  // Extract CSS and process it
      },
      {
        test: /\.svg$/,  // Handle SVG files
        use: ["@svgr/webpack"],
      },
    ],
  },
  optimization: {
    minimize: true,  
    minimizer: [
      new TerserPlugin({  
        terserOptions: {
          compress: {
            drop_console: true, 
          },
        },
      }),
      new CssMinimizerPlugin(),  
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,  // Enable Gzip compression for faster serving
    port: 3000,
    open: true,  // Automatically open the browser
  },
};
