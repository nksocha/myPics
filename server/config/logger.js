var winston = require('winston');
var fs = require('fs');

var env = process.env.NODE_ENV || 'development';
var logDir = 'log';


   var tsFormat = () => (new Date()).toLocaleTimeString();
    // Create the log directory if it does not exist
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }
  
var logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
    }),
      new (winston.transports.File)({
        filename: `${logDir}/results.log`,
        timestamp: tsFormat,
        level: env === 'development' ? 'debug' : 'info'
      }), 
      new (require('winston-daily-rotate-file'))({
        name: 'logFile',
        filename: `${logDir}/-results.log`,
        prepend: true,
        level: env === 'development' ? 'verbose' : 'info'
      })
    ]
    });
    
    log = function(message, level){
      level = level || 'info';
      logger.log(level, message);
    };
    
    exports.log = log;