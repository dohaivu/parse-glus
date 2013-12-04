var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

var configuration = {
    development: {
        db: 'mongodb://localhost/mean-dev',
        root: rootPath,
        app: {
            name: 'dev'
        },        
        parse: {
            appID: "tQTMRPO9AM0fYUBWiGOmMfa8UBGPYFfjHu8V7C8v",
            javascriptKey: "pL0XXctZObuur32fKzhs4P6mxIEgXY99TbMjFBa6"
        }
    },
    test: {
        db: 'mongodb://localhost/mean-test',
        root: rootPath,
        app: {
            name: ''
        },
        
    },
    production: {
        db: 'mongodb://localhost/mean',
        root: rootPath,
        app: {
            name: 'production'
        },
        parse: {
            appID: "tQTMRPO9AM0fYUBWiGOmMfa8UBGPYFfjHu8V7C8v",
            javascriptKey: "pL0XXctZObuur32fKzhs4P6mxIEgXY99TbMjFBa6"
        }                
    }
};

module.exports = (function(env){    
    return configuration.development;
})();