const path = require('path');
const webpack = require('webpack');


module.exports = {

  context: path.resolve(__dirname, "src"),
  target: "web",

  entry: {
    main: './app/main.ts', // main app
    // shims: './shims.js',
  },
  devtool: '#source-map',
  output: {
    devtoolLineToLine:true,
    path: path.resolve(__dirname, 'dist/js'),
    filename: '[name].js'
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', /*'.tsx',*/ '.js'] // note if using webpack 1 you'd also need a '' in the array as well
  },
  module:{
    rules: [
      {test: /\.ts$/, use: 'ts-loader'},
      { test: /\.(html)$/, loader: "file" }

    ]
  },
  plugins:[
    // new webpack.optimize.UglifyJsPlugin({comments:false, sourceMap:true})
  ]
};