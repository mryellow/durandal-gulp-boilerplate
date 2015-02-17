var gulp = require('gulp');
require('require-dir')('build/tasks');

gulp.task('default', ['cs', 'lint', 'test', 'watch']);
