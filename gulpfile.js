'use strict';
var gulp = require('gulp');
var args = require('yargs').argv;
var bump = require('gulp-bump');
var mocha = require('gulp-mocha');
/**
* Execute all tests.
*/
gulp.task('run-tests', function () {
    return gulp.src('test/**/*.js', { read: false })
        .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('default', function () {
    gulp.watch('**/*.js', ['run-tests'])
});


gulp.task('bump-webapiproxy', function () {
    
    var type = args.type;
    var version = args.version;
    var options = {};
    var msg = '';
    if (version) {
        options.version = version;
        msg += ' to ' + version;
    } else {
        options.type = type;
        msg += ' for a ' + type;
    }


    return gulp
        .src('./src/tasks/gulp-webapiproxy/package.json')
        .pipe(bump(options))
        .pipe(gulp.dest('./src/tasks/gulp-webapiproxy'));
});