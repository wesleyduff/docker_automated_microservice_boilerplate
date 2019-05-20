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

console.log(chalk.bgYellowBright(chalk.blue(`
=============================================================================
1. RUN TESTS.................................................................
   - if they fail ...........................................................
     - scripts stop..........................................................
   - if they pass............................................................
     - scripts continue......................................................
1. NPM install for dependencies. Then we will bundle it up into the container
Doing this externally for best practice and security.. do not want to add....
ssh keys to docker image.....................................................
2. Building docker image for environment deployment..........................
--build-arg NODE_ENV=${process.env.NODE_ENV}...................................................
--file ${config.docker.docker_file_path}......................................
-t ${config.docker.image.name}:${config.docker.image.version} . .............................
=============================================================================
`)))

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
       --file ${config.docker.docker_file_path} \
       -t ${config.docker.image.name}:${config.docker.image.version} .
       
       export TEST=true
    else 
       echo "
-----------------------------
STOPPING : TESTS FAILED - fix tests and rerun script
-----------------------------
"
       export TEST=false;
    fi
`);