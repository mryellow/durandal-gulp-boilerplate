var gulp = require('gulp');
var fs = require('fs');
var durandal = require('gulp-durandal');
var header = require('gulp-header');
var paths = require('../paths');

gulp.task('durandal', function() {
	var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

	var banner = ['/**',
		' * Copyright (c) <%= new Date().getFullYear() %> - <%= author %>',
		' * <%= name %> - <%= description %>',
		' * @built <%= new Date().toISOString() %>',
		' * @version v<%= version %>',
		' * @link <%= homepage %>',
		' * @license <%= license %>',
		' */',
		''].join('\n');
	
    return durandal({
            baseDir: paths.root,
            main: 'main.js',
            output: 'main.js',
            almond: true,
            minify: true,
            rjsConfigAdapter: function(cfg) {
            	cfg.preserveLicenseComments = true;
            	cfg.generateSourceMaps = false;
	            cfg.uglify2 = {
					output: {
						beautify: false
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
    	.pipe(header(banner, pkg))
        .pipe(gulp.dest(paths.output + paths.root));
});
