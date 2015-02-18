var gulp = require('gulp');
var browserSync = require('browser-sync');
var paths = require('../paths');

// outputs changes to files to the console
function reportChange(event){
	console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('bs-inject-css', function (){
	gulp.src([paths.style])
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('bs-reload', function (){
    browserSync.reload();
});

// this task wil watch for changes
// to js, html, and css files and call the
// reportChange method. Also, by depending on the
// serve task, it will instantiate a browserSync session
gulp.task('watch', ['sass', 'cs', 'lint', 'test', 'serve'], function() {
	gulp.watch(paths.source, ['cs', 'lint', 'test', 'bs-reload']).on('change', reportChange);
	gulp.watch([paths.html, paths.views], ['bs-reload']).on('change', reportChange);
	gulp.watch(paths.sassSrc, ['sass']).on('change', reportChange);
	gulp.watch(paths.style, ['bs-inject-css']).on('change', reportChange);
});
