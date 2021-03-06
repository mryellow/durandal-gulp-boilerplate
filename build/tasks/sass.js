var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    changed         = require('gulp-changed'),
    autoprefixer    = require('gulp-autoprefixer'),
    //sourcemaps      = require('gulp-sourcemaps'),
    neat            = require('node-neat').includePaths,
    paths = require('../paths');

gulp.task('sass', function(done) {
  gulp.src(paths.sassSrc)
    //.pipe(changed(paths.sassDist, {extension:'.css'}))
    /*
    .pipe(sourcemaps.init({
      loadMaps:true
    }))
    */
    .pipe(sass({
        includePaths: neat,
        errLogToConsole: true,
    }))
    .pipe(autoprefixer())
    //.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.sassDist))
    .on('end', function() {
        done();
    });

});
