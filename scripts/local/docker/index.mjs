import chalk from "chalk";
import shell from "shelljs";

export default (_config, buildDockerImage) => {

console.log(chalk.yellow(`
============= BUILDING IMAGE :  ${_config.docker.image.name}:${_config.docker.image.version}====================IMAGE NAME===============
`));


console.log(chalk.cyanBright(`
/******

NOTE: 
The docker image will be built on your local system under "docker-machine env -u"

****/
`))


/**
 * Calling the method to build out docker image
 */
buildDockerImage();



console.log(chalk.yellow(`
============= Starting Docker container and opening browser ==============
`));




/**
 * running docker container : NOTE THIS ONLY WORKS FOR MAC>.. Instead of "open" there will be another command for windows.
 * Windows users will have to open it themselves
 */
shell.exec(`
        docker run -p 3000:3000 -d --name ${_config.docker.image.name} ${_config.docker.image.name}:${_config.docker.image.version}
        open http://localhost:3000
    `)



}