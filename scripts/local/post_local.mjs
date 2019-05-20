import chalk from 'chalk';
import shell from "shelljs";
import config from '../../config';
if(process.env.TEST){
    console.log(chalk.magenta(`================== DONE LOCAL - run logs ========================`));

    shell.exec(`
      echo 'done sleeping -- now running docker logs for ${config.docker.image.name}'
      docker logs ${config.docker.image.name}
      export NODE_ENV=local&& node --experimental-modules $PWD/scripts/QA_documentation_scripts/qa_docks_script.mjs

`)
} else {
    console.log(chalk.magenta('================== DONE LOCAL : DOCKER :  ' + chalk.red(`NEED TO FIX TESTS`) +'  ========================'));
}