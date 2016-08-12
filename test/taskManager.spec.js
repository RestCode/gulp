var assert = require('assert'),
    mock = require('mock-require'),
    baseDir = '../src/tasks/gulp-webapiproxy',
    mockOptions = require('./webapiproxy.mock.json')


describe('Task Manager', function () {
    beforeEach(function () {
        mock('gulp', {
            task: function (item, delegate) {

            }
        });

        

        mock(baseDir + '/generator.js', {
            generate: function (item, delegate) {

            }
        });
    });

    afterEach(function () {
        mock.stopAll();
    })

    it('should register task in lower case in format "webapiproxy-[name]"', function () {

        var taskManager = mock.reRequire(baseDir + '/taskManager.js'),
            name = taskManager.register("Task1");

        assert.equal("webapiproxy-task1", name);

    });

    

    it('should generate a client for each service specified on task execution', function () {
        mock('gulp-util', {
            log: function () {
                
            }
        });

        var options = {
            services: [
                {
                    metadataUrl: "http://example.com",
                    name: "Api1"
                },
                {
                    metadataUrl: "http://example.com",
                    name: "Api2"
                }
            ]
        }
        var taskManager = mock.reRequire(baseDir + '/taskManager.js'),
            files = taskManager.execute("TestClient", options);

        assert.equal(2, files.length);

    });

    it('should log execution of generation to output', function () {
        var count = 0;

        mock('gulp-util', {
            log: function () {
                count++;
            }
        });

        var options = {
            services: [
                {
                    metadataUrl: "http://example.com",
                    name: "Api1"
                },
                {
                    metadataUrl: "http://example.com",
                    name: "Api2"
                }
            ]
        }
        var taskManager = mock.reRequire(baseDir + '/taskManager.js'),
            files = taskManager.execute("TestClient", options);

        assert.equal(2, count);

    });
}); 