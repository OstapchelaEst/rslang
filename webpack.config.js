const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EslingPlugin = require('eslint-webpack-plugin');

let mode = 'development'
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}
console.log(mode);
module.exports = {
  mode: mode,
  entry: path.resolve(__dirname, './src/index.ts'),
  devtool: 'source-map',
  output: {
    filename: '[name].[contenthash].js',
    assetModuleFilename: "assets/[hash][ext][query]",
    clean: true,
  },

  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new EslingPlugin({ extensions: 'ts' }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      }
      ,
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          (mode === 'development') ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                    },
                  ],
                ],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.ts$/i,
        use: 'ts-loader'
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ]
  },
}