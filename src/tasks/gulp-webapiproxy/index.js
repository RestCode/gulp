
function gulpWebApiProxy(config) {


    var
        cwd = process.cwd(),
        gulp = require('gulp'),
        gutil = require('gulp-util'),
        fs = require('fs'),
        edge = require('edge'),
        ns = 'WebApiProxy.Clients',
        invokerType = ns + '.GeneratorInterop';

    if (config === undefined) {
        gutil.log('not found');
        config = cwd + "\\webapiproxy.json";
    }

    var options = require(config);

    for (var item in options) {
        registerTask(item, options[item]);
    }

    function generate(type, baseDir, fileName, options) {
        var generatorAssembly = ns + '.' + type,
            generatorType = generatorAssembly + '.' + type + 'Generator';

        options.generatorAssembly = generatorAssembly;
        options.generatorType = generatorType;

        proxy(baseDir, options, function (error, result) {
            if (error) {

                console.log(error);
            }

            writeFile(fileName, result);

        });
    }

    function proxy(baseDir, options, delegate) {

        var invokerAssembly = baseDir + '\\' + ns + '.dll';

        var proxyLib = edge.func({
            assemblyFile: invokerAssembly,
            typeName: invokerType
        });

        return proxyLib(options, delegate);
    }

    function registerTask(name, options) {
        var lname = name.toLowerCase();

        gulp.task('webapiproxy-' + lname, function () {
            options.services.forEach(function (service) {
                var fileName = options.fileTemplate.replace('*', service.name);
                gutil.log('Generating ' + service.name + ' from ' + service.metadataEndpoint);

                var dir = __dirname + '\\..\\gulp-webapiproxy-' + lname;
                generate(name, dir, fileName, service);
            });

        });
    }

    function writeFile(name, contents) {
        var baseDir = cwd;
        var fileName = baseDir + '\\' + name;
        fs.writeFile(fileName, contents);
    }
}

module.exports = gulpWebApiProxy;