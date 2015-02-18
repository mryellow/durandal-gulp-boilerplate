var path = require('path');

var appRoot = 'app/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.js',
  views: appRoot + 'views/*.html',
  html: 'index.html',
  //sassSrc: 'assets/style/**/*.scss',
  sassSrc: 'assets/style/main.scss',
  sassDist: 'assets/style/dist/',
  style: 'assets/**/*.css',
  assets: 'assets/',
  allowed: '{jpg,png,gif,css}',
  vendor: 'lib/',
  output: 'dist/',
  doc:'./doc',
  e2eSpecsSrc: 'test/e2e/src/*.spec.js',
  e2eSpecsDist: 'test/e2e/dist/'
};
