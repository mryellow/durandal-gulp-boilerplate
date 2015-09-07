var gulp = require('gulp');
var gutil = require('gulp-util');
var beep = require('beepbeep');
var Karma = require('karma').Server;

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
	new Karma({
		configFile: __dirname + '/../../karma.conf.js',
		singleRun: true
	}, function(e) {
		if (e !== 0) beep();
		done();
		process.exit(e);
	}).start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
	new Karma({
		configFile: __dirname + '/../../karma.conf.js'
	}, function(e) {
		if (e !== 0) beep();
		done();
	}).start();
});
