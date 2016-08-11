module.exports = function () {
    var assemblyLoader = require('./assemblyLoader'),
        fileWriter = require('./fileWriter'),
        ns = 'WebApiProxy.Clients';

    function generate(type, baseDir, fileName, options) {
        var generatorAssembly = ns + '.' + type,
            generatorType = generatorAssembly + '.' + type + 'Generator',
            invokerAssembly = baseDir + '\\' + ns + '.dll',
            invokerType = ns + '.GeneratorInterop';

        options.generatorAssembly = generatorAssembly;
        options.generatorType = generatorType;



        assemblyLoader.proxy(invokerAssembly, invokerType, options, function (error, result) {
            if (error) {

                console.log(error);
            }

            fileWriter.write(fileName, result);

        });
    }

    return {
        generate: generate
    };
}();