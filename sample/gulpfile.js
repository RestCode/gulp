
var gulp = require('gulp'),
    gulputil = require('gulp-util'),
    webapiproxy = require('gulp-webapiproxy');


webapiproxy();


gulp.task('ping', function () {
    
    gulputil.log(process.cwd());
    
});
