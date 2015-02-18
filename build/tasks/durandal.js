var gulp = require('gulp');
var durandal = require('gulp-durandal');
var paths = require('../paths');

gulp.task('durandal', function(){
    return durandal({
            baseDir: paths.root,
            main: 'main.js',
            output: 'main.js',
            almond: true,
            minify: true
        })
        .pipe(gulp.dest(paths.output + paths.root));
});
