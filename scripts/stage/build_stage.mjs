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
    echo "----------------Running test"
    
    if npm test; then
       echo "
-----------------------------
BUILDING DOCKER CONTAINER : ALL TESTS PASS
-----------------------------
"
      
        npm i
        docker build \
        --build-arg NODE_ENV=${process.env.NODE_ENV} \
        --file ${config.docker.docker_file_path} \
        -t ${config.docker.image.name}:${config.docker.image.version} .
        
        ${process.env.TEST=true}
        export TEST=true
        
        echo "
        ==================== steps
        Uploading docker image to rave-microservices repo on charter dev
        ====================
        IMPORTANT ***************************
        Next you need to perform the steps to upload your docker container to raven-microservices storage on ECR AWS (or any new location after 05142019 that is currently unknown)
        STEPS :
              
        1. export AWS_PROFILE=charterdev
        2. aws ecr get-login --no-include-email --region us-west-2
        3. copy the response from the above response
        4. run npm command
        npm run stage-push
        ====================
        "
     
    else 
        echo "
-----------------------------
STOPPING : TESTS FAILED - fix tests and rerun script
-----------------------------
"
        export TEST=false
    fi
    
    
  
`);