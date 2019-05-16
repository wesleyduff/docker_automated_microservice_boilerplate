/* Need this so tests will pass */
const writeToFile = require('./console/writter.js');
global.RavenIngestLogger = {
    error: function(val){
        writeToFile.setLogger(writeToFile.getLoggerOptions().ingest);
        writeToFile.setLevel('error');

        writeToFile.write(`mock RavenIngestLogger -> Error : ${JSON.stringify(val)}`);
    },
    debug: function(val){
        writeToFile.setLogger(writeToFile.getLoggerOptions().ingest);
        writeToFile.setLevel('debug');

        writeToFile.write(`mock RavenIngestLogger -> debug : ${typeof val === 'string' ? val : JSON.stringify(val)}`);
    },
    info: function(val){
        writeToFile.setLogger(writeToFile.getLoggerOptions().ingest);
        writeToFile.setLevel('info');

        writeToFile.write(`mock RavenIngestLogger -> info : ${JSON.stringify(val)}`);
    }
}