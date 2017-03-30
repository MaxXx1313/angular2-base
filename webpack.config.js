const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: {
    main: './src/app/main.ts', // main app
    shims: './src/shims.js',
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
      {test: /\.ts$/, use: 'ts-loader'}

    ]
  },
  plugins:[
    new webpack.optimize.UglifyJsPlugin({comments:false, sourceMap:true})
  ]
};