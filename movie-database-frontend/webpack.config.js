const HtmlWebpackPlugin = require('html-webpack-plugin')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: './src/index.tsx'
  },
  output: {
    path: __dirname + '/build',
    filename: './dist/[name].js'
  },
  devServer: {
    contentBase: 'public',
    compress: true,
    hot: true,
    port: 3999,
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(svg)$/i,
        use: 'raw-loader'
      },
      {
        test: /\.css/,
        loader: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css']
  },
  performance: {
    hints: false,
    maxEntrypointSize: 1500,
    maxAssetSize: 1500
  }
}
