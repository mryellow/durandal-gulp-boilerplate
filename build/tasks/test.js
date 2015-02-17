var gulp = require('gulp');
var gutil = require('gulp-util');
var karma = require('karma').server;

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
	karma.start({
		configFile: __dirname + '/../../karma.conf.js',
		singleRun: true
	}, function(e) {
		if (e !== 0) gutil.beep();
		done();
	});
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
	karma.start({
		configFile: __dirname + '/../../karma.conf.js'
	}, function(e) {
		if (e !== 0) gutil.beep();
		done();
	});
});
