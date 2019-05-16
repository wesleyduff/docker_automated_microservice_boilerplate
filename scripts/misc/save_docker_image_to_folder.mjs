import chalk from 'chalk';
import shell from 'shelljs';
import config from '../../config';

shell.exec(`
echo "---- moving docker image from local to minikube"
docker save -o ./tempdocker.tar ${config.docker.image.name}
`)