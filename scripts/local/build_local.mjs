import config from '../../config';
import shell from 'shelljs';
import chalk from 'chalk';
import runMinikubeVersion from './minikube';
import runDockerLocalVersion from './docker';

console.log(chalk.bgCyan(`================== LOCAL ========================`));
console.log(chalk.gray(`===================================================`));

if(config.environment.minikube){

    runMinikubeVersion(config, buildDockerImage);

} else if(config.environment.local){

    runDockerLocalVersion(config, buildDockerImage);

}

function buildDockerImage(){
    if(process.env.TEST){
        console.log(chalk.bgBlackBright(chalk.whiteBright(`
    === Running npm install -- this is most secure way of handling this instead of putting ssh keys into docker file ==
    `)))
    }
    /**
     * NOTE .. $PWD ... This is the path of where you saved your code example :  /Users/p123456/Documents/code/RAVEN/lambda/microservices/Boilerplate/
     */
    shell.exec(`
     if npm test; then
     
           echo "
-----------------------------
BUILDING DOCKER CONTAINER : ALL TESTS PAST
-----------------------------
"
        npm i
        docker build \
        --build-arg NODE_ENV=${process.env.NODE_ENV} \
        --file ${config.docker.local_docker_file_path} \
        -t ${config.docker.image.name}:${config.docker.image.version} .
        
        export TEST=true
     
     else 
        echo "
-----------------------------
STOPPING : TESTS FAILED - fix tests and rerun script
-----------------------------
"
        export TESTS=false
     fi
     `);

    return 'done';
}