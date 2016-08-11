
// mock('edge', {
//     func: function (o, d) {
//         console.log('gulp called');
//         console.log(d);
//     }
// });

var assert = require('assert'),
    mock = require('mock-require'),
    baseDir = '../src/tasks/gulp-webapiproxy',
    mockOptions = require('./webapiproxy.mock.json')


    describe('gulp-webapiproxy constructor', function () {
        it('should register all tasks in options', function () {
            var webapiproxy = require(baseDir + '/index.js');

            mock('gulp', {
                task: function (item, delegate) {

                }
            });

            mock('gulp-util', {
                log: function () {
                    console.log('gulputil called');
                }
            });

            mock(baseDir + '/taskManager.js', {
                register: function (item, delegate) {

                }
            });
            var obj = webapiproxy(mockOptions);

            assert.equal(2, obj.taskCount);
            mock.stopAll();
        });
    });
