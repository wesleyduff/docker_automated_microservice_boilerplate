import shell from "shelljs";
import chalk from "chalk";
import config from '../../config';

shell.exec(`
    docker ps -a
    docker stop ${config.docker.image.name} 
    docker rm ${config.docker.image.name} 
    docker rmi ${config.docker.image.name}:${config.docker.image.version}
`);