var gulp = require('gulp');
var yuidoc = require('gulp-yuidoc');
var paths = require('../paths');

// uses yui to generate documentation
gulp.task('doc', function(){
  return gulp.src(paths.source)
    .pipe(yuidoc.parser())
    .pipe(yuidoc.reporter())
    .pipe(yuidoc.generator())
    .pipe(gulp.dest(paths.doc));
});
