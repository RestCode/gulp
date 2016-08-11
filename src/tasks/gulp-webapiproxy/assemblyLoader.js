module.exports = function () {
    var edge = require('edge');

     function proxy(invokerAssembly, invokerType, options, delegate) {

        var proxyLib = edge.func({
            assemblyFile: invokerAssembly,
            typeName: invokerType
        });

        return proxyLib(options, delegate);
    }

    return {
        
        proxy: proxy
    };
}();