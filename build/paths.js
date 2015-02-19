var path = require('path');

var appRoot = 'app/';
var srcRoot = 'src/';

module.exports = {
  root: appRoot,
  source: srcRoot + appRoot + '**/*.js',
  views: srcRoot + appRoot + 'views/*.html',
  html: srcRoot + 'index.html',
  sassWatch: srcRoot + 'assets/style/**/*.scss',
  sassSrc: srcRoot + 'assets/style/main.scss',
  sassDist: srcRoot + 'assets/style/dist/',
  style: srcRoot + 'assets/**/*.css',
  assets: 'assets/',
  allowed: '{jpg,png,gif,css}',
  vendor: 'vendor/',
  input: srcRoot,
  output: 'dist/',
  doc:'./doc',
  e2eSpecsSrc: 'test/e2e/src/*.spec.js',
  e2eSpecsDist: 'test/e2e/dist/'
};
