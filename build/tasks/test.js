var gulp = require('gulp');
var gutil = require('gulp-util');
var beep = require('beepbeep');
var karma = require('karma').server;
//var Karma = require('karma').server; // 0.13

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
	//new Karma({
	karma.start({
		configFile: __dirname + '/../../karma.conf.js',
		singleRun: true
	}, function(e) {
		if (e !== 0) beep();
		done();
		process.exit(e);
	});//.start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
	//new Karma({
	karma.start({
		configFile: __dirname + '/../../karma.conf.js'
	}, function(e) {
		if (e !== 0) beep();
		done();
	});//.start();
});
