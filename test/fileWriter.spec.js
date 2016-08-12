var assert = require('assert'),
    mock = require('mock-require'),
    baseDir = '../src/tasks/gulp-webapiproxy';


describe('File Writer', function () {

    afterEach(function () {
        mock.stopAll();
    })

    it('should write output to a file', function () {
        var called = false;

         mock('fs', {
            writeFile: function (name, content) {
                assert.equal(process.cwd() + "\\TestFile.txt", name);
                assert.equal("Test Content", content);
                called = true;
            }
        });

        var fileWriter = mock.reRequire(baseDir + '/fileWriter.js');
        fileWriter.write("TestFile.txt","Test Content");
        
        assert.equal(true, called);

    });

    
}); 