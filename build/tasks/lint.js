var gulp = require('gulp');
var gutil = require('gulp-util');
var map = require('map-stream');
var paths = require('../paths');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var beepReporter = map(function (file, cb) {
	if (!file.jshint.success) {
		//console.log('JSHINT fail in '+file.path);
		var BreakException= {};
		try {
			file.jshint.results.forEach(function (err) {
				if (err) {
					//console.log(' '+file.path + ': line ' + err.line + ', col ' + err.character + ', code ' + err.code + ', ' + err.reason);
					gutil.beep();
					throw BreakException;
				}
			});
		} catch (e) {
			if (e !== BreakException) throw e;
		}
	}
	cb(null, file);
});

// runs jshint on all .js files
gulp.task('lint', function() {
  return gulp.src(paths.source)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(beepReporter)
	.on('error', function() {
		gutil.beep();
	}); 
});
