var gulp = require('gulp');
var bower = require('gulp-bower');
var concat = require('gulp-concat');
var mainBowerFiles = require('main-bower-files');
var runSequence = require('run-sequence');
var durandal = require('./durandal');
var changed = require('gulp-changed');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var replace = require('gulp-replace');
//var plumber = require('gulp-plumber');
//var to5 = require('gulp-6to5');
//var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
//var compilerOptions = require('../6to5-options');
//var assign = Object.assign || require('object.assign');

// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
gulp.task('build-system', function (callback) {
  return runSequence(
    'durandal',
    callback
  );
});

/*
gulp.task('build-system', function () {
  return gulp.src(paths.source)
    .pipe(plumber())
    .pipe(changed(paths.output, {extension: '.js'}))
    .pipe(sourcemaps.init())
    .pipe(to5(assign({}, compilerOptions, {modules:'system'})))
    .pipe(sourcemaps.write({includeContent: false, sourceRoot: '/' + paths.root }))
    .pipe(gulp.dest(paths.output));
});
*/


// copies changed html files to the output directory
gulp.task('build-html', function () {
  return gulp.src(paths.html)
    .pipe(changed(paths.output, {extension: '.html'}))
    // Use optimised build including Almond
    .pipe(replace('vendor/requirejs/require.js', 'app/main.js'))
    .pipe(gulp.dest(paths.output));
});

// copies changed asset files to the output directory
gulp.task('build-assets', function () {
  return gulp.src(paths.input + paths.assets + '**/*.' + paths.allowed)
    .pipe(changed(paths.output + paths.assets))
    .pipe(gulp.dest(paths.output + paths.assets));
});

// Run `bower install`.
gulp.task('build-bower-install', function() {
  return bower();
});

// Place both in the `vendor` directory for debug along with `dist`.
gulp.task('build-bower', ['build-bower-install'], function() {
  return gulp.src(mainBowerFiles(), { base: 'bower_components' })
    .pipe(gulp.dest(paths.input + paths.vendor));
    //.pipe(gulp.dest(paths.output + paths.vendor));
});

// Concat only required bootstrap components.
gulp.task('build-bootstrap-js', function() {
  return gulp.src('bower_components/bootstrap-sass/assets/javascripts/bootstrap/' + paths.bootstrapjs + '.js')
    .pipe(concat('bootstrap.js'))
    .pipe(gulp.dest(paths.input + paths.vendor + 'bootstrap-sass/assets/javascripts/'));
    //.pipe(gulp.dest(paths.output + paths.vendor + 'bootstrap-sass/assets/javascripts/'));
});

gulp.task('build-bootstrap-fonts', function() {
  return gulp.src('bower_components/bootstrap-sass/assets/fonts/bootstrap/*.{eot,svg,ttf,woff,woff2}')
    .pipe(gulp.dest(paths.input + paths.vendor + 'bootstrap-sass/assets/fonts/bootstrap/'))
    .pipe(gulp.dest(paths.output + paths.vendor + 'bootstrap-sass/assets/fonts/bootstrap/'));
});

gulp.task('build-deps', function(callback) {
  return runSequence(
    'clean-deps', 
    ['build-bower'], 
    ['build-bootstrap-js', 'build-bootstrap-fonts', 'sass'],
    callback
  );
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    'build-deps',
    ['build-system', 'build-html', 'build-assets'],
    callback
  );
});
