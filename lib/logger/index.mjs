import path from 'path';
import winston from 'winston';
import mongodb from 'mongodb';

let ObjectID = mongodb.ObjectID;
let logPath = path.join(path.dirname(''), './logs');
let environment = process.env.NODE_ENV || 'start';

// for non-local envs, log to directory
if (environment !== 'start') {
    logPath = '/data/logs';
}

let getGenericLoggerConcern = () => {
    let trans = [
        new winston.transports.Console({
            name: 'console',
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,
            humanReadableUnhandledException: true
        })

        , new winston.transports.File({
            name: 'file',
            level: 'debug',
            filename: path.join(logPath, 'logs.txt'),
            handleExceptions: false,
            exitOnError: true,
            json: true,
            maxsize: 1000000000, // 1GB
            maxFiles: 10,
            colorize: false
        })

    ];

    return trans

}

let FilterObjectID = (doc)  => {

    for (let prop in doc) {

        if (doc[prop] instanceof Object) {

            if (doc[prop] instanceof ObjectID) {

                doc[prop] = doc[prop].toHexString()
            } else {
                if ( !doc[prop] instanceof String || !doc[prop] instanceof Number) {
                    FilterObjectID(doc[prop])
                }
            }
        }
    }
    return doc
}

export default (app, callback) => {

    let genericLogger;

    genericLogger = new winston.createLogger({
        name: 'RavenLogger',
        transports: getGenericLoggerConcern(),
        exitOnError: true
    });

    global.logger = {

        debug: (msg, obj) => {
            obj = FilterObjectID(obj);
            genericLogger.debug(msg, obj)
        }
        ,
        info: (msg, obj) => {
            obj = FilterObjectID(obj);
            genericLogger.info(msg, obj)
        }
        ,
        warn: (msg, obj) => {
            obj = FilterObjectID(obj);
            genericLogger.warn(msg, obj)
        }
        ,
        error: (msg, obj) => {
            obj = FilterObjectID(obj);
            genericLogger.error(msg, obj)
        }
        ,
        remove  : (transport) => {
            genericLogger.remove(transport)
        }
        ,
        close : ()=>{
            genericLogger.close();
        }

    };
}

