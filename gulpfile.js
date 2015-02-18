var gulp = require('gulp');
require('require-dir')('build/tasks');

gulp.task('default', ['clean-deps', 'build-deps', 'sass', 'cs', 'lint', 'test', 'watch']);
