var gulp = require('gulp');
var runSequence = require('run-sequence');
var paths = require('../paths');
var changelog = require('conventional-changelog');
var fs = require('fs');
var bump = require('gulp-bump');
var args = require('../args');

// utilizes the bump plugin to bump the
// semver for the repo
gulp.task('bump-version', function(){
  return gulp.src(['./package.json','./bower.json'])
    .pipe(bump({type:args.bump })) //major|minor|patch|prerelease
    .pipe(gulp.dest('./'));
});

// generates the CHANGELOG.md file based on commit
// from git commit messages
gulp.task('changelog', function(callback) {
  return changelog({
    preset: 'angular'
  })
  .pipe(fs.createWriteStream('./CHANGELOG.md'));
});

// calls the listed sequence of tasks in order
gulp.task('prepare-release', function(callback){
  return runSequence(
    'build',
    'lint',
    'e2e',
    'bump-version',
    'doc',
    'changelog',
    callback
  );
});
