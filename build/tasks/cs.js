var gulp = require('gulp');
var gutil = require('gulp-util');
//var plumber = require('gulp-plumber');
var jscs = require('gulp-jscs');
var paths = require('../paths');

var onError = function (err) {  
    gutil.beep();
    gutil.log(err.toString());

    this.emit('end');
};

gulp.task('cs', function () {
    return gulp.src(paths.source)
        .pipe(jscs())
        .on('error', onError);
});
