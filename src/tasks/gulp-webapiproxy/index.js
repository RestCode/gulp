
module.exports = function (options) {


    var
        taskManager = require('./taskManager'),
        taskCount = 0;


    for (var item in options) {
        if (!item.startsWith("$")) {
            taskManager.register(item, function () {
                taskManager.execute(item, options[item]);
            });
            taskCount++;
        }

    }

    return {
        taskCount: taskCount
    }


}

