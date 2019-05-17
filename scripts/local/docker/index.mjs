import chalk from "chalk";
import shell from "shelljs";

export default (config, buildDockerImage) => {

console.log(chalk.yellow(`
============= BUILDING IMAGE :  ${config.docker.image.name}:${config.docker.image.version}====================IMAGE NAME===============
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



if(config.docker.bindmount){
    /**
     * running docker container : NOTE THIS ONLY WORKS FOR MAC>.. Instead of "open" there will be another command for windows.
     * Windows users will have to open it themselves
     */
    shell.exec(`
        docker run -p 3000:3000 -d --name ${config.docker.image.name} -v $PWD:/data/apps/raven-web ${config.docker.image.name}:${config.docker.image.version}
        echo 'sleeping for 5 - waiting to open browser'
        sleep 5
        echo 'done sleeping'
        open http://localhost:3000
        
    `)
} else {
    /**
     * running docker container : NOTE THIS ONLY WORKS FOR MAC>.. Instead of "open" there will be another command for windows.
     * Windows users will have to open it themselves
     */
    shell.exec(`
        docker run -p 3000:3000 -d --name ${config.docker.image.name} ${config.docker.image.name}:${config.docker.image.version}
        echo 'sleeping for 5 -waiting to open browser'
        sleep 5
        echo 'done sleeping'
        open http://localhost:3000
    `)
}



}