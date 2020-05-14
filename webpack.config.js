const path = require('path');

module.exports = {
  entry: './frontend/app.js',
  output: {
    filename: 'main.js',
	path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
          test: /\.css$/,
          use: [
              'style-loader',
              'css-loader'
          ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
          test: /\.(png|svg|jpg|gif)$/,
          loader: 'file-loader',
          options: {
              name: 'dist/[contenthash].[ext]'
          }
      },
      {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          loader: 'file-loader',
          options: {
            name: 'dist/[contenthash].[ext]'
          }
      }
    ]
  }
};
