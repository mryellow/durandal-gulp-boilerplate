var gulp = require('gulp');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var paths = require('../paths');

// deletes all files in the output path
gulp.task('clean', ['clean-deps'], function() {
  return gulp.src([paths.output])
    .pipe(vinylPaths(del));
});

// deletes all files in the vendor path
gulp.task('clean-deps', function() {
  return gulp.src([paths.vendor, paths.output + paths.vendor])
    .pipe(vinylPaths(del));
});
