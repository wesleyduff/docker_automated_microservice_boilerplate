import chalk from "chalk";
import shell from "shelljs";

export default (_config) => {

console.log(chalk.bgMagenta(chalk.cyan(`
================== MINIKUBE ========================
`)));
console.log(chalk.yellow(`
============= BUILDING DOCKER IMAGE ================
`));
console.log(chalk.magenta(`
==============  localstocks:V1  ====================
`));



if(_config.docker.save_to_machine){




                console.log(chalk.yellow(`
                ========== SETTING DOCKER ENVIRONMENT ==============
                `));

                /**
                 * making sure we are on our local docker environment
                 */
                shell.exec(`
                    eval "$(docker-machine env -u)"
                `)





} else {



                /**
                 * making sure we are on our minikube docker environment
                 */
                shell.exec(`
                    eval $(minikube docker-env)
                `)



}





                console.log(chalk.yellow(`
                ============= BUILDING IMAGE =======================
                `));



                /**
                * Calling the method to build out docker image
                */
                buildDockerImage();

}
