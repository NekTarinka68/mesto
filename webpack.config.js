const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    build: './src/scripts/index.js'
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'build')
  },
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, 'build'),
    open: true
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCSSExtractPlugin.loader, 
          {
          loader: "css-loader",
          options: {
            importLoaders: 1,
          },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash][ext]'
        }
      }
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new MiniCSSExtractPlugin(),
    new CleanWebpackPlugin()
  ]
}