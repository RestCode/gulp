var assert = require('assert'),
    mock = require('mock-require'),
    baseDir = '../src/tasks/gulp-webapiproxy',
    mockOptions = require('./webapiproxy.mock.json')


describe('Generator', function () {
    beforeEach(function () {
        
        // mock('fileWriter', {
        //     write: function (item, delegate) {

        //     }
        // });
        
    });

    afterEach(function () {
        mock.stopAll();
    })

    it('should invoke the .NET assembly correctly using the right parameters', function () {
        var called = false;

         mock('edge', {
            func: function (invokerAssembly, invokerType, options, delegate) {
                
            }
        });

        mock(baseDir + '/assemblyLoader', {
            proxy: function (invokerAssembly, invokerType, options, delegate) {
                assert.equal("c:\\fakedir\\WebApiProxy.Clients.dll", invokerAssembly);
                assert.equal("WebApiProxy.Clients.GeneratorInterop", invokerType);
                assert.equal("WebApiProxy.Clients.TestType", options.generatorAssembly);
                assert.equal("WebApiProxy.Clients.TestType.TestTypeGenerator", options.generatorType);
                called = true;
            }
        });

        var generator = mock.reRequire(baseDir + '/generator.js');
        var a = generator.generate("TestType","c:\\fakedir","fakefile.dll",{});
     
        assert.equal(true, called);

    });

    
}); 