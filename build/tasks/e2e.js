var gulp = require('gulp');
var gutil = require('gulp-util');
//var to5 = require('gulp-6to5');
//var plumber = require('gulp-plumber');
var webdriver_update = require('gulp-protractor').webdriver_update;
var protractor = require("gulp-protractor").protractor;
var paths = require('../paths');

// for full documentation of gulp-protractor,
// please check https://github.com/mllrsohn/gulp-protractor
gulp.task('webdriver_update', webdriver_update);

// transpiles files in
// /test/e2e/src/ from es6 to es5
// then copies them to test/e2e/dist/
// TODO: clear dist directory first
gulp.task('build-e2e', ['clean-e2e'], function () {
  return gulp.src(paths.e2eSpecsSrc)
    //.pipe(plumber())
    //.pipe(to5())
    .pipe(gulp.dest(paths.e2eSpecsDist));
});

// runs build-e2e task
// then runs end to end tasks
// using Protractor: http://angular.github.io/protractor/
gulp.task('e2e', ['webdriver_update', 'build-e2e', 'serve-dist'], function(cb) {
  return gulp.src(paths.e2eSpecsDist + "/*.js")
    .pipe(protractor({
        configFile: "protractor.conf.js",
        args: ['--baseUrl', 'http://localhost:9001']
    }))
    .on('error', function(e) {
        gutil.beep();
        throw e;
    });
});
