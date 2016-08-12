
var gulp = require('gulp'),
    gulputil = require('gulp-util'),
    webapiproxy = require('gulp-webapiproxy');
  
var options = require('./webapiproxy.json');

webapiproxy(options);


gulp.task('ping', function () {
    
    gulputil.log(process.cwd());
    
});
