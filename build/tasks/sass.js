var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    changed         = require('gulp-changed'),
    autoprefixer    = require('gulp-autoprefixer'),
    //sourcemaps      = require('gulp-sourcemaps'),
    paths = require('../paths');

gulp.task('sass', function() {
  gulp.src(paths.sassSrc)
    .pipe(changed(paths.sassDist, {extension:'.css'}))
    /*
    .pipe(sourcemaps.init({
      loadMaps:true
    }))
    */
    .pipe(sass({
      //includePaths: require('node-neat').includePaths,
      errLogToConsole:true,
    }))
    .pipe(autoprefixer())
    //.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.sassDist));
});
