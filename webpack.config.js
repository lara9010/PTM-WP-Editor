//import { request } from 'https';

const path = require('path'),
    webpack = require('webpack'),    
    //mapboxgl = require('mapbox-gl'),
    //MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({ filename: './assets/css/app.css' });
/*
mapboxgl.accessToken = 'pk.eyJ1Ijoicm9lbHoiLCJhIjoiY2phczkwc25mNXJieTJxbnduYTNtaDNneiJ9.7eTxRRsp0GbqkZOJMxRw8g';
const map = new mapboxgl.Map({
    container: '<mapbox>',
    style: 'mapbox://styles/mapbox/streets-v9'
});
*/

const config = {
    // abosulte path for project root
    context: path.resolve(__dirname, 'src'),
    
    entry: {
    // removing 'src' directory from entry point, since 'context' is taking care of that
    app: './app.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './assets/js/[name].bundle.js'
  },

  module: {
    rules: [
        //babel-loader
        {
            test: /\.js$/,
            include: /src/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ['env']
                }
            }
        },
        //html-loader
        {
            test: /\.html$/,
            use: ['html-loader']
        },
        //sass-loader
        {
            test: /\.scss$/,
            include: [path.resolve(__dirname, 'src', 'assets', 'scss')],
            use: extractPlugin.extract({
                // missing postcss-loader (for Bootstrap)
                use: ['css-loader', 'sass-loader'],
                fallback: 'style-loader'
            })
        }
    ]    
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
        template: 'index.html'
    }),
    extractPlugin
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "dist/assets/media"),
    stats: 'errors-only',
    open: true,
    port: 12000,
    compress: true
  },
  devtool: 'inline-source-map'  
}

module.exports = config;