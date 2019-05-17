import chalk from 'chalk';
import shell from "shelljs";
import config from '../../config';
import fs from 'fs';

console.log(chalk.magenta(`================== DONE LOCAL - run logs ========================`));

shell.exec(`
    echo 'done sleeping -- now running docker logs for ${config.docker.image.name}'
    docker logs ${config.docker.image.name}
    echo PWD...
    echo $PWD
    export NODE_ENV=start&& node --experimental-modules $PWD/scripts/QA_documentation_scripts/qa_docks_script.mjs
`)