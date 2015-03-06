var gulp = require('gulp');
var runSequence = require('run-sequence');
require('require-dir')('build/tasks');

gulp.task('default', function(callback) {
  return runSequence(
    'clean-deps',
    'build-deps',
    'watch',
    callback
  );
});
