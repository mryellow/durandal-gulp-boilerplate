var gulp = require('gulp');
var durandal = require('gulp-durandal');
var paths = require('../paths');

gulp.task('durandal', function(){
    return durandal({
            baseDir: paths.root,
            main: 'main.js',
            output: 'main.js',
            almond: true,
            minify: true,
            rjsConfigAdapter: function(cfg) {
            	cfg.generateSourceMaps = false;
	            cfg.uglify2 = {
					output: {
						beautify: true
					},
					compress: {
						sequences: false,
						global_defs: {
							DEBUG: false
						},
						drop_console: true
					},
					warnings: true,
					mangle: false
				};

            	return cfg;
            }
        })
        .pipe(gulp.dest(paths.output + paths.root));
});
