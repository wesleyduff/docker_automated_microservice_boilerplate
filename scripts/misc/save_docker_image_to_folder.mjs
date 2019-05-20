import chalk from 'chalk';
import shell from 'shelljs';
import config from '../../config';
import path from 'path';

shell.exec(`
echo "---- moving docker image into dockerImages folder with name : tempdocker_${config.docker.image.name}.tar"
docker save -o ${path.resolve(path.dirname(''))}/dockerImages/tempdocker_${config.docker.image.name}.tar ${config.docker.image.name}:${config.docker.image.version}
`)