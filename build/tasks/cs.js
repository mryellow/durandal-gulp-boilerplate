var gulp = require('gulp');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var jscs = require('gulp-jscs');
var paths = require('../paths');

var onError = function (err) {  
	gutil.beep();
	this.emit('end');
};

gulp.task('cs', function () {
    return gulp.src(paths.source)
    	.pipe(plumber({
			errorHandler: onError
		}))
    	.pipe(jscs());
});
