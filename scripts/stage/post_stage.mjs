import chalk from 'chalk';

if(process.env.TEST){

    console.log(chalk.red(`
====================
`));

    console.log(chalk.yellow(`

Uploading docker image to rave-microservices repo on charter dev

`))

    console.log(chalk.red(`
====================
`));


    console.log(chalk.green(`

IMPORTANT ***************************

Next you need to perform the steps to upload your docker container to raven-microservices storage on ECR AWS (or any new location after 05142019 that is currently unknown)

  STEPS : 
  
  1. export AWS_PROFILE=charterdev
  2. aws ecr get-login --no-include-email --region us-west-2
  3. copy the response from the above response
  4. run npm command
  
     npm run stage-push

`))




    console.log(chalk.magenta(`================== DONE STAGE ========================`));
} else {
    console.log(chalk.magenta('================== DONE : STAGE : DOCKER :  ' + chalk.red(`NEED TO FIX TESTS`) +'  ========================'));
}
