import config from '../../config';
import shell from 'shelljs';
import chalk from 'chalk';
import runMinikubeVersion from './minikube';
import runDockerLocalVersion from './docker';

console.log(chalk.bgCyan(`================== LOCAL ========================`));
console.log(chalk.gray(`===================================================`));

if(config.environment.minikube){
    //TODO
    //runMinikubeVersion(config);

} else if(config.environment.local){

    runDockerLocalVersion(config);

}
