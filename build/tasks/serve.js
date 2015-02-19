var gulp = require('gulp');
var browserSync = require('browser-sync');
var paths = require('../paths');

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
//gulp.task('serve', ['build'], function(done) {

gulp.task('serve', function(done) {
  browserSync({
    open: true,
    port: 9000,
    server: {
      baseDir: [paths.input],
      middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);

});

gulp.task('serve-dist', function(done) {
  browserSync({
    open: false,
    port: 9001,
    server: {
      baseDir: [paths.output],
      middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
  
});
