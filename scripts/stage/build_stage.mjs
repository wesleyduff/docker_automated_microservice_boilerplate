import config from '../../config';
/**
 This file is used to build the local intance to run on your machine
 **/
const  PORT = 3000;

import shell from 'shelljs';
import chalk from 'chalk';


console.log(chalk.bgBlackBright(chalk.whiteBright(`
=== 
BUILDING DOCKER CONTAINER FOR DEPLOYMENT 
==
`)))


shell.exec(`
    npm i && \
    docker build \
    --build-arg NODE_ENV=${process.env.NODE_ENV} \
    --file ${config.docker.docker_file_path} \
    -t ${config.docker.image.name}:${config.docker.image.version} .
`);