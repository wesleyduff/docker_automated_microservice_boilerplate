import chalk from 'chalk';
import shell from "shelljs";
import config from '../../config'

console.log(chalk.magenta(`================== DONE LOCAL - run logs ========================`));

shell.exec(`
    docker logs ${config.docker.image.name}
    
`)
