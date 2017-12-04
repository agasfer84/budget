var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
 
module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'

  },
    output: {
        path: path.resolve('dist'),
        publicPath: '/',
        filename: '[name].js'//.[hash]
      },
  resolve: {

    alias: {
      AppComponent: '/src/app/components/app.component'
    },

    extensions: ['.ts', '.js']
  },
 
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [{
          loader: 'awesome-typescript-loader',
          options: { configFileName: path.resolve('tsconfig.json') }
        } , 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
      test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
      loader: 'file-loader?name=assets/[name].[ext]'//.[hash]
    },
    {
      test: /\.css$/,
      exclude: path.resolve('src', 'app'),
      loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?sourceMap' })
    },
    {
      test: /\.css$/,
      include: path.resolve('src', 'app'),
      loader: 'raw-loader'
    }]
  },
 
  plugins: [

    new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve('./src'), // каталог с исходными файлами
      {} // карта маршрутов
    ),
 
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),
 
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new ExtractTextPlugin('[name].css'),//.[hash]
    new webpack.NoEmitOnErrorsPlugin(),
     
    new webpack.optimize.UglifyJsPlugin({
    beautify: false, 
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
    compress: {
    screw_ie8: true,
    warnings: false,
    drop_console: true,
    unsafe: true
    },
    comments: false,
    }),
     
    new webpack.LoaderOptionsPlugin({
      htmlLoader: {
        minimize: true
      }
    })
  ]
};