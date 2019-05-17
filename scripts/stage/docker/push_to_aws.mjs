import chalk from 'chalk';
import shell from 'shelljs';
import config from '../../../config';


console.log(chalk.red(`
====================
`));

console.log(chalk.yellow(`

Uploading docker image to rave-microservices repo on charter dev

`))


shell.exec(`
    docker tag ${config.docker.image.name}:${config.docker.image.version} ${config.AWS.ecr}/${config.docker.image.name}:${config.docker.image.version}
    sleep 2
    docker push ${config.AWS.ecr}/${config.docker.image.name}:${config.docker.image.version}
    sleep 2
    echo -- DONE pushing to AWS
`);


console.log(chalk.red(`
====================
`));


console.log(chalk.green(`
Image : 
${config.AWS.ecr}/${config.docker.image.name}:${config.docker.image.version}

pushed to AWS ECR on CHARTER DEV
raven-microservices 

`))




console.log(chalk.magenta(`================== DONE STAGE ========================`));
