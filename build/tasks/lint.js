var gulp = require('gulp');
var gutil = require('gulp-util');
var beep = require('beepbeep');
var plumber = require('gulp-plumber');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var paths = require('../paths');

var onError = function (err) {  
	beep();
	this.emit('end');
};

gulp.task('lint', function() {
	return gulp.src(paths.source)
		.pipe(plumber({
			errorHandler: onError
		}))
	    .pipe(jshint())
	    .pipe(jshint.reporter(stylish))
	    .pipe(jshint.reporter('fail'));
});
