module.exports = function () {
    var fs = require('fs'),
        cwd = process.cwd();

    function write(name, contents) {
        var baseDir = cwd;
        var fileName = baseDir + '\\' + name;
        fs.writeFile(fileName, contents);
    }

    return {
        write: write
    };
}();