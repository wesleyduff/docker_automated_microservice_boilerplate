const writeToFile = require('./console/writter');

global.RavenLogger = {
  error: function(val, obj={}){
    writeToFile.setLogger(writeToFile.getLoggerOptions().log);
    writeToFile.setLevel('error');

    writeToFile.write(`mock RavenLogger -> \n Error : ${JSON.stringify(val)} \n obj : ${JSON.stringify(obj)}`);
  },
  debug: function(val, obj={}){
    writeToFile.setLogger(writeToFile.getLoggerOptions().log);
    writeToFile.setLevel('debug');

    writeToFile.write(`mock RavenLogger -> debug : ${JSON.stringify(val)} \n obj : ${JSON.stringify(obj)}`);
  },
  info: function(val, obj={}){
    writeToFile.setLogger(writeToFile.getLoggerOptions().log);
    writeToFile.setLevel('info');

    writeToFile.write(`mock RavenLogger -> \n info : ${JSON.stringify(val)} \n obj : ${JSON.stringify(obj)}`);
  }
}