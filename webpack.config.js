const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.tsx',
  },
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.ts|tsx?$/, loader: 'ts-loader' },
      {
        exclude: /node_modules/,
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'manifest.json', to: '../manifest.json' },
        { from: 'icons', to: 'icons' },
        { from: 'src/popup', to: 'src/popup' },
        // { from: 'public', to: 'public' },
      ],
    }),
    ...getHtmlPlugins(['index']),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.html'],
  },
  output: {
    path: path.join(__dirname, 'dist/js'),
    filename: '[name].js',
  },
};

function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) => new HTMLPlugin({
      title: 'React extension',
      filename: `${chunk}.html`,
      chunks: [chunk],
    }),
  );
}
