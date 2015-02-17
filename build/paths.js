var path = require('path');

var appRoot = 'app/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.js',
  html: 'index.html',
  style: 'assets/**/*.css',
  vendor: 'lib/',
  output: 'dist/',
  doc:'./doc',
  e2eSpecsSrc: 'test/e2e/src/*.js',
  e2eSpecsDist: 'test/e2e/dist/'
};
