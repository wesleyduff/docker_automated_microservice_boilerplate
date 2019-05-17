import chalk from 'chalk';
import shell from "shelljs";
import config from '../../config'

console.log(chalk.magenta(`================== DONE LOCAL - run logs ========================`));

shell.exec(`
    echo 'done sleeping -- now running docker logs for ${config.docker.image.name}'
    docker logs ${config.docker.image.name}
    
`)
