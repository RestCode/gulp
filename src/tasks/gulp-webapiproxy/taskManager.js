module.exports = function () {
    var gulp = require('gulp'),
        gutil = require('gulp-util'),
        generator = require('./generator');

    function register(name, delegate) {
        var lname = 'webapiproxy-' + name.toLowerCase();
        gulp.task(lname, delegate);

        return lname;
    }

    function execute(name, options) {
        if(options.fileTemplate === undefined){
            options.fileTemplate = "*." + name.toLowerCase();
        }

        var files = [];

        options.services.forEach(function (service) {
            var fileName = options.fileTemplate.replace('*', service.name);
            gutil.log('Generating ' + service.name + ' from ' + service.metadataEndpoint);

            var dir = __dirname + '\\..\\gulp-webapiproxy-' + name;
            generator.generate(name, dir, fileName, service);

            files.push(fileName);
        });

        return files;
    }

    return {
        register: register,
        execute: execute
    };
}();